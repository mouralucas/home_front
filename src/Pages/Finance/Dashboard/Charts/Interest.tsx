import React, {useEffect, useState} from "react";
import Line from "../../../../Components/Charts/Line";
import {getData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_INTEREST, URL_FINANCE_SUMMARY} from "../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";

interface InterestChart {
    data: [{
        date: string,
        value: number,
    }]
    series: [{
        id: string
        name: string
    }]
}


const App = () => {
    const [interest, setInterest] = useState<InterestChart | null>(null)


    useEffect(() => {
        getInterestData();
    }, []);

    const getInterestData = () => {
        getData(URL_FINANCE_INTEREST).then(response => {
            setInterest(response)
        }).catch(err => {
            toast.error(err);
        })
    }


    return (
        // @ts-ignore
        <Line data={interest?.data} series={interest?.series} argumentField={'date'} type={'spline'}>
        </Line>
    )
}

export default App;