import axios from 'axios';
import {getToken} from "../Auth/Auth";
import {URL_BASE} from "./ApiUrls";

// Change the value of baseURL to change the API server
const instance = axios.create(
    {
        baseURL: URL_BASE
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
