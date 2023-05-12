import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import SongCard from './SongCard'

const Beats = () => {
    const [songs, setSongs] = useState([])
    const [clicked, setClicked] = useState(null)
    const [removeText, setRemoveText] = useState("Remove")
    useEffect(() => {
        async function fetchData() {
            const r = await axios.get('/api/get_users_songs')
            setSongs(r.data)
        }
        fetchData()
    }, [])
    function handleCardClick(song) {
        if (clicked === song)
        {
            setRemoveText("Remove")
            setClicked(null)
        }
        else
        {
            setRemoveText("Remove")
            setClicked(song)
        }
    }
    async function handleRemoveClick() {
        if (removeText === "Remove")
            setRemoveText("Are you sure?")
        else
            {
                try {
                    const up = await axios.get('/api/users_posts')
                    const userPosts = up.data.map(el => JSON.stringify(el))
                    if (userPosts.includes(JSON.stringify(clicked)))
                    {
                        const post = await axios.get(`/api/form_post_by_song_id/${clicked.id}`)
                        await axios.delete(`/api/delete_post/${post.data.id}`)
                    }
                    await axios.delete(`/api/delete_song/${clicked.id}`)
                    setRemoveText("Remove")
                    setClicked(null)
                    const newSongs = songs.filter(song => song.id !== clicked.id)
                    setSongs(newSongs)
                }
                catch (error) {
                    alert(error)
                }
            }

    }
    if (removeText === "Are you sure?") {
        setTimeout(() => {setRemoveText("Remove")}, 5000)
    }
    return (
        <>
            <NavBar />
            <div className="container">
                <h1 className="text-white text-6xl">My Beats</h1>
                {clicked ?
                <div className="flex flex-row gap-4 p-8 justify-center items-center">
                    <img src={clicked.album_cover} className="w-[150px] h-[150px]"/>
                    <div className="flex flex-col gap-2 items-center p-1">
                        <h1 className="text-white text-xl">{clicked.artist} - {clicked.title}</h1>
                        <h1 className="text-white text-xl">{clicked.album}</h1>
                        <iframe title="Song Widget"
                    src={`https://widget.deezer.com/widget/dark/track/${clicked.link.substring(clicked.link.lastIndexOf('/')+1)}`}
                    width="200px"
                    height="125px"
                    allowtransparency="true"
                    allow="encrypted-media; clipboard-write" />
                    <button className="btn-remove" onClick={handleRemoveClick}>{removeText}</button>
                    </div>
                </div> : null}
                {
                songs.length > 0
                ?
                <div className="flex justify-center gap-4 m-8 p-10 flex-wrap bg-[#2f267e]">
                    {songs.map(el => (<SongCard key={uuid()} click={() => handleCardClick(el)} song={el} />))}
                </div>
                :
                null
                }
            </div>
        </>
    )
}

export default Beats