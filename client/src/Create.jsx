import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Create = () => {
    const nav = useNavigate()
    const [form, setForm] = useState({username: '', email: '', password: ''})
    async function handleSubmit(e) {
        e.preventDefault()
    }
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-8 h-screen justify-center w-[40vw] m-auto items-center flex-col'>
            <label className="text-white text-xl font-semibold">Email</label>
        <input type='text' className='bg-gray-200 text-gray-700 w-full' name='email' value={form.email} onChange={handleChange} />
        <label className="text-white text-xl font-semibold">Username</label>
        <input type='text' className='bg-gray-200 text-gray-700 w-full' name='username' value={form.username} onChange={handleChange} />
        <label className="text-white text-xl font-semibold">Password</label>
        <input type='password' className='bg-gray-200 text-gray-700 w-full' name='password' value={form.password} onChange={handleChange} />
        <i className='flex gap-4'>
            <button type='submit' className='text-white text-xl border px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all ease duration-200 hover:rounded-3xl'>Create Account</button>
            <button className='text-white text-xl border px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all ease duration-200 hover:rounded-3xl'
                onClick={() => nav('/')}>Go Back</button>
        </i>
        </form>
    )
}

export default Create