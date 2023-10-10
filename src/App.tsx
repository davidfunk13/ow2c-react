import './App.css'
// import api from './utils/axiosInstance'
import {
  RouterProvider,
} from "react-router-dom";
import router from './utils/router';



function App() {

  // const handleLogout = async () => {
  //   api.post('/logout');
  // }

  // const getUser = async () => {
  //   await api.get('/api/user');
  // }

  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />

    // <>
    //   <button onClick={handleLogin}>Login</button>
    //   <button onClick={handleLogout}>Logout</button>
    //   <button onClick={getUser}>getUser</button>
    // </>
  // )
}

export default App
