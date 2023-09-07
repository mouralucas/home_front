import React, {useEffect, useState} from "react";
import Line from "../../../../../Components/Chart/Line"
import {getData} from "../../../../../Services/Axios/Get";
import {URL_FINANCE_INVESTMENT_PROFIT} from "../../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";

const App = () => {
    const [interest, setInterest] = useState<any>([])

    useEffect(() => {
        getInterestData();
    }, []);

    const getInterestData = () => {
        getData(URL_FINANCE_INVESTMENT_PROFIT, {
            startAt: 202104,
            investmentId: 'fa69c608-ab77-4e35-967d-a0277d96638b',
            // indexId: 'ef07cbb0-9b29-43c6-a060-bef73f1cc000'
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
            argumentField={'reference'}
            title={"Evolução do investimento"}
            subtitle={"Eh os guri"}
            type={'spline'}
        />
    )
}

export default App;