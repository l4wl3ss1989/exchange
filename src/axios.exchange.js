import axios from 'axios';

import { SERVER_NAME } from './configurations/servername';

const instance =  axios.create({
    baseURL: SERVER_NAME
});

export default instance;
