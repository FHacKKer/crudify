import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:3005",
    headers:{
        "Content-Type":"application/json"
    }
})

export default api;