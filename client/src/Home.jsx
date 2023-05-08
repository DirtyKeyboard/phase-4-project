import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Home = () => {
    const [logged, setLogged] = useState(false)
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('api/check_session');
            if (response.status === 200)
                setLogged(true)
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
        <button className='text-white text-2xl border px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all ease duration-200 hover:rounded-3xl'
        onClick={handleLogout}>Logout</button>
        :
        <div className='flex justify-center h-screen items-center flex-col gap-6'>
            <h1 className='text-white text-6xl'>Welcome to the Song Picker</h1>
            <h1 className='text-white text-5xl'>Please login or create an account</h1>
            <div className="flex gap-4">
                <button className='text-white text-2xl border px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all ease duration-200 hover:rounded-3xl' onClick={() => nav('login')}>Login</button>
                <button className='text-white text-2xl border px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all ease duration-200 hover:rounded-3xl' onClick={() => nav('create_account')}>Create Account</button>
            </div>
        </div>
        }
        </>
        
    )
}

export default Home