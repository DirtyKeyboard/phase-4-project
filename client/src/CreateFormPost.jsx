import React, {useEffect, useState} from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import Select from '@mui/material/Select';

const CreateFormPost = () => {
    const [songs, setSongs] = useState([])
    useEffect((() => {
        async function fetchData() {
            const r = await axios.get('/api/get_users_songs')
            setSongs(r.data)
            console.log(r.data)
        }
        fetchData()
    }), [])
    function handleChange() {

    }
    return (
        <>
        <NavBar />
        <div className='container'>
                <h1 className='text-white text-6xl'>Create Your Post</h1>
                {/* Have a choose song dropdown, title textbar, and body text bar */}
                <div className="flex flex-col gap-4 mt-12 items-center h-[80vh]">
                <h1 className="text-white text-xl">Choose Song</h1>
                <select id="countries" className="bg-gray-50 w-1/2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="one">One</option>
                </select>
                <h1 className="text-white text-xl">Title</h1>
                <input type="text" className="w-1/2 rounded-lg h-[40px] bg-gray-700 text-white"/>
                <h1 className="text-white text-xl">Body</h1>
                <textarea type="text" className="w-1/2 h-2/3 rounded-lg bg-gray-700 text-white"/>
                <button className='btn-default'>Submit</button>
                </div>
        </div>
        </>
    )
}

export default CreateFormPost