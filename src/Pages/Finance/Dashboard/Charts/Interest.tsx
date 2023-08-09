import React, {useState} from "react";
import Line from "../../../../Components/Charts/Line";
import {getData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_SUMMARY} from "../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";

interface InterestChart {
    date: string,
    value: number,
    serie: {
        id: string
        name: string
    }
}


const App = () => {
    const [interest, setInterest] = useState<InterestChart | null>()

    const getInterestData = () => {
        getData(URL_FINANCE_SUMMARY).then(response => {

        }).catch(err => {
            toast.error(err);
        })
    }

    return (
        <></>
    )
}

export default App;