
import axios from 'axios';

const authApi = axios.create({
    // baseURL: 'http://localhost:8082/api/auth',
    // baseURL: 'https://api-v2-hairroom.herokuapp.com/api/auth',
    baseURL: 'https://api-v2-hairroom.vercel.app/api/auth',
})

export default authApi;