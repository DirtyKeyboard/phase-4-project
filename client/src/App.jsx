import axios from 'axios';
import {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login';
import Create from './Create'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/create_account' element={<Create />} />
    </Routes>
  )
}

export default App