import axios from 'axios';
import {useState, useEffect} from 'react'

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem('user_id');
      const response = await axios.get('http://localhost:5555/check_session', {withCredentials: true});
      setUser(response.data.username)
    }
    fetchData()
  }, []) //admin, password
  async function login() {
    const resp = await axios.post("http://localhost:5555/login", {username: "admin", password: "password"})
    sessionStorage.setItem('user_id', resp.data.userId)
    setUser(resp.data.username)
  }
  return (
    <>
      {user ? 
      <>
      <h1>Hello, {user}!</h1>
      <button onClick={async() => {
        const r = await axios.get('http://localhost:5555/check_session', {withCredentials: true})
        console.log(r.data.message)
      }}>Check User</button>
      </>
      : 
      <>
      <h1>Please Login</h1>
      <button onClick={login}>Login to Admin</button>
      </>}
    </>
  )
}

export default App