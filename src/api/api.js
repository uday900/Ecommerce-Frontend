import axios from "axios";

// const BASE_URL = process.env.BACKEND_API;
const BASE_URL = import.meta.env.VITE_BACKEND_API;
console.log(BASE_URL)

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default api;