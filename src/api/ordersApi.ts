import axios from 'axios';

const ordersApi = axios.create({
    //baseURL: 'http://localhost:8080/api',
    baseURL: 'https://api-v2-hairroom.herokuapp.com/api',
})

export default ordersApi;