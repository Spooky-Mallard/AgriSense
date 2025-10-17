import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://your_api_base_url.com/api',
    headers: {
        "Content-Type": "application/json",
    },
})

export default api;