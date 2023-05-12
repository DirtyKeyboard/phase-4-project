import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Quiz from './Quiz'
import Dashboard from './Dashboard'

const Home = () => {
    const [logged, setLogged] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/check_session');
            if (response.status === 200)
                setLogged(response.data)
        }
        fetchData()
        setLoading(false)
    }, [])
    const nav = useNavigate()
    async function handleLogout(e) {
        await axios.get('/api/logout')
        setLogged(false)
    }
    return (
        <>
        {logged ? 
        <> 
            {
            logged.genre_id ? 
            <Dashboard />
            : 
            <Quiz />
            }
        </> 
        :
            <>
            { loading ? 
            <h1 className='text-white text-xl text-center'>Loading...</h1>
            :
            <div className='flex justify-center h-screen items-center flex-col gap-6'>
                <h1 className='text-white text-6xl'>Welcome to the Beat Buddy</h1>
                <h1 className='text-white text-5xl'>Please login or create an account</h1>
                <div className="flex gap-4">
                    <button className='btn-default' onClick={() => nav('login')}>Login</button>
                    <button className='btn-default' onClick={() => nav('create_account')}>Create Account</button>
                </div>
            </div>
            }
            </>
        }
        </>
        
    )
}

export default Home