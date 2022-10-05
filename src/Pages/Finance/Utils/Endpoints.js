import axios from "../../../Services/Axios/Axios";
import {URL_CREDIT_CARDS} from "../../../Services/Axios/ApiUrls";


const getCreditCards = async () => {
    let response;

    try {
        response = await axios.get(URL_CREDIT_CARDS);
    } catch {
        response = null
    }
    return response.data.credit_cards
}

export {
    getCreditCards
}