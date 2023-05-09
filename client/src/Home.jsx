import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Quiz from './Quiz'

const Home = () => {
    const [logged, setLogged] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('api/check_session');
            if (response.status === 200)
                setLogged(response.data)
        }
        fetchData()
    }, [])
    const nav = useNavigate()
    async function handleLogout(e) {
        await axios.get('api/logout')
        setLogged(false)
    }
    return (
        <>
        {logged ? 
        <>
            {logged.genre_id ? 
            <h1 className='text-white text-xl'>Quiz taken</h1> : 
            <Quiz />}
            <button className='btn-default'
            onClick={handleLogout}>Logout</button>
        </>
        :
        <div className='flex justify-center h-screen items-center flex-col gap-6'>
            <h1 className='text-white text-6xl'>Welcome to the Song Picker</h1>
            <h1 className='text-white text-5xl'>Please login or create an account</h1>
            <div className="flex gap-4">
                <button className='btn-default' onClick={() => nav('login')}>Login</button>
                <button className='btn-default' onClick={() => nav('create_account')}>Create Account</button>
            </div>
        </div>
        }
        </>
        
    )
}

export default Home