import axios from "../../Services/Axios/Axios";
import financeAxios from "../../Services/Axios/FinanceServiceAxios"

const getData = async (url: string, params: any=null) => {
    let response: any;

    try {
        response = await axios.get(url, {params: params});
    } catch {
        response = null
    }
    return response?.data
}

const getFinanceData = async (url: string, params: any=null) => {
    let response: any;

    try {
        response = await financeAxios.get(url, {params: params});
    } catch {
        response = null
    }
    return response?.data
}

export {
    getData, getFinanceData
}