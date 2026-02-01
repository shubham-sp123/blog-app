import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { PostCard, Container } from '../components'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className="bg-gray-50 py-8">
            <Container>
                <div className="
                    grid grid-cols-1 gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                ">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost
