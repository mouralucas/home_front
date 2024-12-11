import React, {useEffect, useState} from "react";
import Line from "../../../../../Components/Chart/Line"
import {getFinanceData} from "../../../../../Services/Axios/Get";
import {URL_FINANCE_INVESTMENT_PERFORMANCE} from "../../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";

const App = () => {
    const [performance, setPerformance] = useState<any>([])

    useEffect(() => {
        getPerformanceData();
    }, []);

    const getPerformanceData = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            periodRange: 12,
        }).then(response => {
            setPerformance(response);
        }).catch(err => {
            toast.error(err);
        })
    }

    return (
        <Line
            id={'investment_profit_chart'}
            data={performance?.data}
            series={performance?.series}
            argumentField={'period'}
            title={"Evolução do investimento"}
            subtitle={"Evolução, em %, dos investimentos comparados ao CDI"}
            type={'spline'}
        />
    )
}

export default App;