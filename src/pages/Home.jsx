import React, { useEffect, useState } from 'react'
import authService from '../appwrite/auth'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState('')
    

    useEffect(() => {
        const loadHome = async () => {
            try {
                const userData = await authService.getCurrentUser()
                if (!userData) return

                setUser(userData)

                const posts = await appwriteService.getPosts()
                if (posts) setPosts(posts.documents)
            } catch (err) {
                console.error(err)
            }
        }

        loadHome()
    }, [])

    if (user) {
        if (posts.length > 0) {
            return (
                <div className="bg-gray-50 py-8">
                    <Container>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </Container>
                </div>
            )
        } else {
            return (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <h2 className="text-xl font-semibold text-gray-600">
                        No Posts Available
                    </h2>
                </div>
            )
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
            <Container>
                <h1 className="text-2xl font-bold text-gray-700 text-center">
                    Login to read posts
                </h1>
            </Container>
        </div>
    )
}

export default Home
