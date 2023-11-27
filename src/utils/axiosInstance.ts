import axios from "axios";
import baseURL from "./baseUrl";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default api;
