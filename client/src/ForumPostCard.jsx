import React, {useState} from 'react'
import axios from 'axios'

const ForumPostCard = ({post, userId}) => {
    const [expanded, setExpanded] = useState(false)
    async function handleRemoveClick(e) {
        e.stopPropagation()
        await axios.delete(`/api/delete_post/${post.id}`)
        window.location.reload()
    }
    return (
    <div className="bg-gray-700 flex flex-col items-center gap-8 text-gray-200 hover:bg-gray-500 transition-all ease-in-out w-full rounded-2xl p-4 hover:cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {post.user_id == userId ? 
        <h1 className="text-4xl">{post.title} - <em>{post.user_name} (You)</em></h1>
        :
        <h1 className="text-4xl">{post.title} - {post.user_name}</h1>
        }
        {expanded ?
        <>
            <p>{post.body}</p>
            <p>Song: {post.song.title}</p>
            <p>By: {post.song.artist}</p>
            <img src={post.song.album_cover} width="15%"/>
            <a href={post.song.link} target="_blank" onClick={(e) => e.stopPropagation()} className="text-blue-400 underline">Link</a>
            {post.user_id == userId ? 
            <button className="btn-remove text-md" onClick={handleRemoveClick}>Delete Post</button>
            : null}
        </>
        : null}
    </div>
    )
}

export default ForumPostCard