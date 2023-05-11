import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import SongCard from './SongCard'

const Beats = () => {
    const [songs, setSongs] = useState([])
    const [clicked, setClicked] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const r = await axios.get('api/get_users_songs')
            setSongs(r.data)
            console.log(r.data)
        }
        fetchData()
    }, [])
    function handleCardClick(song) {
        if (clicked === song)
            setClicked(null)
        else
            setClicked(song)
    }
    return (
        <>
            <NavBar />
            <div className="container">
                <h1 className="text-white text-6xl">My Beats</h1>
                {clicked ?
                <div>
                    <h1 className='text-6xl text-white'>{clicked.title}</h1>
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