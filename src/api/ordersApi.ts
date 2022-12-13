import axios from 'axios';

const ordersApi = axios.create({
    // baseURL: 'http://localhost:8082/api',
    // baseURL: 'https://api-v2-hairroom.herokuapp.com/api',
    baseURL: 'https://api-v2-hairroom.vercel.app/api',
})

export default ordersApi;