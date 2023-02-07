import axios from "./Axios";
import {toast} from "react-toastify";


const HandleSubmit = async (e, url, values, hideModal, toastMessage) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(values).forEach(key => formData.append(key, values[key]));

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