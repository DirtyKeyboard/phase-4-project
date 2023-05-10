import axios from 'axios';
import {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login';
import Create from './Create'
import Dashboard from './Dashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/create_account' element={<Create />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App