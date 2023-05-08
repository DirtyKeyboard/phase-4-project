import axios from 'axios';
import {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login';
import Create from './Create'

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('api/check_session');
      setUser(response.data.username)
    }
    fetchData()
  }, [])
  async function login() {
    const resp = await axios.post("api/login", {username: "admin", password: "password"})
    sessionStorage.setItem('user_id', resp.data.userId)
    setUser(resp.data.username)
  }
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/create_account' element={<Create />} />
    </Routes>
  )
}

export default App