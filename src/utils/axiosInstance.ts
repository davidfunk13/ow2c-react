import axios from 'axios';
const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URI : 'http://localhost:3001';
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;