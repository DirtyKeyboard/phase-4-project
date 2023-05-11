import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import NavBar from './NavBar'
import axios from 'axios'
import ForumPostCard from './ForumPostCard'
import {v4 as uuid} from 'uuid'

const FormDisplay = () => {
    let {category} = useParams()
    category = category.charAt(0).toUpperCase() + category.substring(1)
    const [posts, setPosts] = useState(null)
    const [userGenre, setUserGenre] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const r = await axios.get(`/api/formpost/${category}`)
            setPosts(r.data)
            const u = await axios.get('/api/check_session')
            setUserGenre(u.data.genre.name)
        }
        fetchData()
    },[])
    const ww = window.screen.width
    return (
        <div>
            <NavBar />
            <div className='container'>
                <h1 className="text-white text-6xl">Forum Page - {category}</h1>
                {userGenre === category ?
                <div class="fixed flex flex-row justify-end bottom-0 w-[stretch]">
                    <button className="btn-default m-2">Create a Post</button>
                </div>
                
                : null}
                <div className="flex flex-col p-16 gap-4 justify-center mt-12">
                    {posts ? 
                    posts.map(el => <ForumPostCard key={uuid()} post={el} />)
                    : null}
                </div>
            </div>
        </div>
    )
}

export default FormDisplay