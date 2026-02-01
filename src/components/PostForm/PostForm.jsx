import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import QuillEditor from "../QuillEditor";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const contentValue = watch("content");

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto max-w-3xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <Input
        label="Title"
        placeholder="Post title"
        {...register("title", { required: true })}
      />

      <Input
        label="Slug"
        placeholder="post-slug"
        {...register("slug", { required: true })}
        onInput={(e) =>
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          })
        }
      />

      {/* QUILL EDITOR */}
      
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Content
          </label>

          <QuillEditor
            value={contentValue}
            onChange={(val) =>
              setValue("content", val, { shouldValidate: true })
            }
          />

          {errors.content && (
            <p className="mt-1 text-sm text-red-600">Content is required</p>
          )}
        </div>
     

      <Input
        label="Featured Image"
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image")}
      />

      {post && (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <img
            src={appwriteService.getFileDownload(post.featuredImage)}
            alt={post.title}
            className="h-48 w-full object-cover"
          />
        </div>
      )}

      <Select
        label="Status"
        options={["active", "inactive"]}
        {...register("status", { required: true })}
      />

      <div className="pt-4">
        <Button type="submit">{post ? "Update Post" : "Publish Post"}</Button>
      </div>
    </form>
  );
}

export default PostForm;
