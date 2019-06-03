import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://l4l3ss-api-exchange.herokuapp.com'
});

export default instance;
