import axios from 'axios';
const baseURL = import.meta.env.PROD ? 'https://your-production-api-url.com' : 'http://localhost:/3001';

const auth = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default auth;