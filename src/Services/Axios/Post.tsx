import axios from "./Axios";
import {toast} from "react-toastify";


const HandleSubmit = async (e: any, url: string, values: any, hideModal: any, toastMessage: string) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(values).forEach(key => values[key] !== null ? formData.append(key, values[key]) : null);

    await axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        if(toastMessage) {
            toast(toastMessage)
        }
        return response.data
    }).catch(response => {
        return {'error': response.data}
    })

    if (hideModal){
        hideModal()
    }
}

export default HandleSubmit;