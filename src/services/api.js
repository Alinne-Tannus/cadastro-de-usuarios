import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api-cadastro-de-usuarios-oph1.onrender.com'
})


export default api;