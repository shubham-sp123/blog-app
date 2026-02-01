import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        appwriteService.getPost(slug).then((post) => {
            if (post) {
                setPost(post)
            } else {
                navigate('/')
            }
        })
    }, [slug, navigate])

    return post ? (
        <div className="bg-gray-50 py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
