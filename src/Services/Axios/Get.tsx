import axios from "../../Services/Axios/Axios";

const getData = async (url, params=null) => {
    let response;

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