import axios from 'axios';

import { SERVER_NAME } from './configurations/servername';

const instance =  axios.create({
    baseURL: 'http://localhost:8080'
});

export default instance;
