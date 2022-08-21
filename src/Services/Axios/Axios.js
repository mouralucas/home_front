import axios from 'axios';
import {getToken} from "../Auth/Auth";

// Change the value of baseURL to change the API server
const instance = axios.create(
    {
        baseURL: 'http://127.0.0.1:8010'
    }
);

instance.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance
