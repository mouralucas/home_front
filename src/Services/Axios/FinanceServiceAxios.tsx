import {URL_FINANCE_BASE} from "./ApiUrls";
import axios from "axios";
import {getToken} from "../Auth/Auth";

const finance_connections_instance = axios.create(
    {
        baseURL: URL_FINANCE_BASE
    }
);

finance_connections_instance.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

finance_connections_instance.interceptors.response.use(
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

export default finance_connections_instance