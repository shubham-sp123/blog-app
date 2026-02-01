import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        console.log(post.content);
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div>
      <Container>
        <img
          src={appwriteService.getFileDownload(post.featuredImage)}
          alt={post.title}
        />

        {isAuthor && (
          <div>
            <Link to={`/edit-post/${slug}`}>
              <Button>Edit</Button>
            </Link>

            <Button onClick={deletePost}>Delete</Button>
          </div>
        )}
        <div>
          <h1>{post.title}</h1>
        </div>
        <div>
          <div className="mt-6 not-prose">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
