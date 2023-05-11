import React from 'react'
import {useNavigate} from 'react-router-dom'

const ForumPostCard = ({post}) => {
    const nav = useNavigate()
    return (
    <div className="bg-gray-700 text-gray-200 hover:bg-gray-500 transition-all ease-in-out w-full rounded-2xl p-4 hover:cursor-pointer" onClick={() => alert('hi')}>
        <h1 className="text-4xl">{post.title}</h1>
    </div>
    )
}

export default ForumPostCard