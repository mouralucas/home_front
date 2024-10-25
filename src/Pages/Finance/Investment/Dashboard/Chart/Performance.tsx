import React, {useEffect, useState} from "react";
import Line from "../../../../../Components/Chart/Line"
import {getFinanceData} from "../../../../../Services/Axios/Get";
import {URL_FINANCE_INVESTMENT_PERFORMANCE} from "../../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";

const App = () => {
    const [interest, setInterest] = useState<any>([])

    useEffect(() => {
        getInterestData();
    }, []);

    const getInterestData = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            startAt: 202104,
        }).then(response => {
            setInterest(response);
        }).catch(err => {
            toast.error(err);
        })
    }

    return (
        <Line
            id={'investment_profit_chart'}
            data={interest?.data}
            series={interest?.series}
            argumentField={'period'}
            title={"Evolução do investimento"}
            subtitle={"Eh os guri"}
            type={'spline'}
        />
    )
}

export default App;