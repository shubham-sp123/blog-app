import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="
                overflow-hidden rounded-xl
                border border-gray-200
                bg-white
                shadow-sm
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
            ">
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img
                        src={appwriteService.getFileDownload(featuredImage)}
                        alt={title}
                        className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="p-4">
                    <h2 className="
                        text-lg font-semibold text-gray-900
                        line-clamp-2
                    ">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
