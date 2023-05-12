import React, {useEffect} from 'react';
import NavBar from './NavBar';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const nav = useNavigate()
  useEffect(() => {
    async function fetchData() {
        try{
        const response = await axios.get('/api/check_session');
        }
        catch (err) {
          alert('You are not logged in! Returning home...')
          nav('/')
        }
    }
    fetchData()
}, [])

  return (
    <>
        <NavBar/>
        <div className="container">
          <h1 className="text-white text-6xl">Welcome to Beat Buddy!</h1>
        </div>
        
    </>
  );
};

export default Dashboard;
