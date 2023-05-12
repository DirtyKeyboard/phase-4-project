import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import ForumGenreCard from './ForumGenreCard'
import {v4 as uuid} from 'uuid'

const Forms = () => {
    const [genres, setGenres] = useState([])
    useEffect(() => {
        async function fetchData() {
        const r = await axios.get('/api/genres')
        setGenres(r.data)
        }
        fetchData()
    }, [])
return (
    <>
        <NavBar />
            <div className="container">
                <h1 className="text-white text-6xl text-center">Select A Category</h1>
                <div className="flex flex-col p-16 gap-4 justify-center mt-12">
                    {genres ? genres.map((el) => (
                        <ForumGenreCard key={uuid()} title={el.name} navTo={`/forums/${el.name.toLowerCase()}`}/>
                    )) : null}
                </div>
            </div>
    </>
)
}

export default Forms