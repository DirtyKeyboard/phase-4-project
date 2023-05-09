import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const nav = useNavigate()
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('api/check_session');
            if (response.status === 200)
                nav('/')
        }
        fetchData()
    }, [])
    const [form, setForm] = useState({ username: '', password: '' })
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const resp = await axios.post("api/login", { ...form })
        if (resp.status === 200)
            nav('/')
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-8 h-screen justify-center w-[40vw] m-auto items-center flex-col'>
        <label className="text-white text-xl font-semibold">Username</label>
        <input type='text' className='bg-gray-200 text-black font-bold w-full' name='username' value={form.username} onChange={handleChange} />
        <label className="text-white text-xl font-semibold">Password</label>
        <input type='password' className='bg-gray-200 text-black font-bold w-full' name='password' value={form.password} onChange={handleChange} />
        <i className='flex gap-4'>
            <button type='submit' className='btn-default'>Login</button>
            <button className='btn-default'
                onClick={() => nav('/')}>Go Back</button>
        </i>
        </form>
    )
}

export default Login