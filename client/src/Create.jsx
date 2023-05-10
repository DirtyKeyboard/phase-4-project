import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Create = () => {
    const nav = useNavigate()
    const [form, setForm] = useState({username: '', email: '', password: ''})
    async function handleSubmit(e) {
        e.preventDefault()
        const resp = await axios.post("api/signup", { ...form })
        if (resp.status === 201)
            nav('/')
    }
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-8 h-screen justify-center w-[40vw] m-auto items-center flex-col'>
            <label className="text-white text-xl font-semibold">Email</label>
        <input type='text' className='bg-gray-200 text-black font-bold w-full' name='email' value={form.email} onChange={handleChange} />
        <label className="text-white text-xl font-semibold">Username</label>
        <input type='text' className='bg-gray-200 text-black font-bold w-full' name='username' value={form.username} onChange={handleChange} />
        <label className="text-white text-xl font-semibold">Password</label>
        <input type='password' className='bg-gray-200 text-black font-bold w-full' name='password' value={form.password} onChange={handleChange} />
        <i className='flex gap-4'>
            <button type='submit' className='btn-default'>Create Account</button>
            <button className='btn-default'
                onClick={() => nav('/')}>Go Back</button>
        </i>
        </form>
    )
}

export default Create