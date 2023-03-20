import { AxiosResponse } from "axios";
import axios from "../../Services/Axios/Axios";

const getData = async (url: string, params=null) => {
    let response: AxiosResponse<any, any>;

    try {
        response = await axios.get(url, {params: params});
    } catch {
        response = null
    }
    return response?.data
}

export {
    getData
}