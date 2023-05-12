import React, {useEffect, useState} from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import Select from '@mui/material/Select';
import {useNavigate, useParams} from 'react-router-dom'

const CreateFormPost = () => {
    const nav = useNavigate()
    const {category} = useParams()
    const [songs, setSongs] = useState([])
    const [form, setForm] = useState({song_id: null, title: "", body: "", user_name: ""})
    useEffect((() => {
        async function fetchData() {
            const r = await axios.get('/api/get_users_songs')
            const ru = await axios.get('/api/check_session')
            const up = await axios.get('/api/users_posts')
            const songsToShow = []
            const usersSongs = r.data.map(el => JSON.stringify(el))
            const usersPosts = up.data.map(el => JSON.stringify(el))
            usersSongs.forEach(el => {
                if (!usersPosts.includes(el)) {
                    songsToShow.push(JSON.parse(el))
                }
            })
            setSongs(songsToShow)
            setForm({...form, song_id: songsToShow[0].id, user_name: ru.data.username})
        }
        fetchData()
    }), [])
    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setForm({...form, song_id: parseInt(form.song_id)})
        if (form.title.length >= 4 && form.body.length >= 16)
        {
            try{
                await axios.post('/api/formpost', {...form})
                nav(`/forums/${category}`)
            }
            catch (err) {
                alert("ERROR Posting, please try again.")
                window.location.reload()
            }
        }
        else if (form.title < 4)
            alert("Your title must be at least 4 characters.")
        else
            alert("Your body must be at least 16 characters.")
    }
    return (
        <>
        <NavBar />
        <form className='container' onSubmit={handleSubmit}>
                <h1 className='text-white text-6xl'>Create Your Post</h1>
                {/* Have a choose song dropdown, title textbar, and body text bar */}
                <div className="flex flex-col gap-4 mt-12 items-center h-[80vh]">
                <h1 className="text-white text-xl">Choose Song</h1>
                <select name="song_id" onChange={handleChange} className="bg-gray-50 w-1/2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {songs.map(el => (<option value={el.id} key={el.id}>{el.title}</option>))}
                </select>
                <h1 className="text-white text-xl">Title</h1>
                <input name="title" onChange={handleChange} type="text" className="w-1/2 rounded-lg h-[40px] bg-gray-700 text-white"/>
                <h1 className="text-white text-xl">Body</h1>
                <textarea name="body" onChange={handleChange} type="text" className="w-1/2 h-2/3 rounded-lg bg-gray-700 text-white"/>
                <div className="flex gap-2">
                    <button className='btn-default' type="submit">Submit</button>
                    <button type="button" className='btn-default' onClick={() => nav(`/forums/${category}`)} >Go Back</button>
                </div>
                </div>
        </form>
        </>
    )
}

export default CreateFormPost