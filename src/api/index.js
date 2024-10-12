import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5500',
    headers: {
        biz: localStorage.getItem('business')
    }
})

export default API;