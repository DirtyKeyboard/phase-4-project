import React, {useState} from 'react'
import userIcon from './assets/user.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
    const nav = useNavigate()
    const [show, setShow] = useState(false)
    return (
        <nav className=" w-[225px] bg-gray-900 h-screen fixed flex flex-col justify-start py-4 px-8 text-white">
            <img
                src={userIcon}
                alt="User"
                className="w-12 h-12 rounded-full cursor-pointer float-left mb-8"
                onClick={() => setShow(!show)}
            />
            {show ? <button className="bg-red-700 p-2 rounded-full mb-8 hover:bg-red-600" onClick={async() => {await axios.get('/api/logout'); nav('/'); window.location.reload()}}>Log Out?</button> : null}
            <a href="/mybeats" className="text-xl font-semibold mb-4">
                My Beats
            </a>
            <a href="/beatfind" className="text-xl font-semibold mb-4">
                Beat Finder
            </a>
            <a href="/forums" className="text-xl font-semibold mb-4">
                Forums
            </a>
            <a href="/" className="text-xl font-semibold mb-4">
                Home
            </a>
        </nav>
    )
}

export default NavBar