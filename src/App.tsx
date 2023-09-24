import './App.css'
// import auth from './utils/authInstance'
import api from './utils/axiosInstance'


function App() {
  const handleLogin = async () => {
    window.location.href = 'http://localhost:3001/api/battlenet/login'
  }
  const handleLogout = async () => {
    api.post('/logout');
  }

  const getUser = async () => {
    await api.get('/user');
  }
  return (
    <>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={getUser}>getUser</button>
    </>
  )
}

export default App
