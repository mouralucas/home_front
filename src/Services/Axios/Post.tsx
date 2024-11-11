import axios from "./Axios";
import financeAxios from './FinanceServiceAxios'
import {toast} from "react-toastify";


const handleSubmit = async (e: any, url: string, values: any, hideModal: any, toastMessage: string) => {
    e.preventDefault();

    await axios({
        method: 'post',
        url: url,
        data: values,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (toastMessage) {
            toast(toastMessage)
        }
        return response.data
    }).catch(response => {
        return {'error': response.data}
    })

    if (hideModal) {
        hideModal()
    }
}

const postFinanceData = async (e: any, url: string, values: any, hideModal: any, toastMessage: string) => {
    e.preventDefault();

    await financeAxios({
        method: 'post',
        url: url,
        data: values,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (toastMessage) {
            toast(toastMessage)
        }
        return response.data
    }).catch(response => {
        return {'error': response.data}
    })

    if (hideModal) {
        hideModal()
    }
}

export {handleSubmit, postFinanceData};