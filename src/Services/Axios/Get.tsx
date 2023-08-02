import axios from "../../Services/Axios/Axios";

const getData = async (url: string, params: any=null) => {
    let response: any;

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