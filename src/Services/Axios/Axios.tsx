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
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    async function (response) {
        return response;
    },
    async function (error) {
        // TODO: revisar status code pra limpar o localStorage
        if (error.response.status === 401 && getToken()) {
            localStorage.clear();
        } else {
            console.error('Error', error);
        }
        return Promise.reject(error);
    }
);

export default instance
