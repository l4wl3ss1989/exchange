import axios from 'axios';

const instance =  axios.create({
    //baseURL: 'https://l4l3ss-api-exchange.herokuapp.com'
    baseURL: 'http://localhost:8080'
});

export default instance;
