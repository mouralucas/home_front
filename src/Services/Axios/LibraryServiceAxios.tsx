import {URL_LIBRARY_BASE} from "./ApiUrls";
import axios from "axios";
import {getToken} from "../Auth/Auth";

const library_connection_instance = axios.create(
    {
        baseURL: URL_LIBRARY_BASE
    }
);

library_connection_instance.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

library_connection_instance.interceptors.response.use(
    async function (response: any) {
        return response;
    },
    async function (error: any) {
        // TODO: revisar status code pra limpar o localStorage
        if (error.response.status === 401 && getToken()) {
            localStorage.clear();
        } else {
            console.error('Error', error);
        }
        return Promise.reject(error);
    }
);

export default library_connection_instance