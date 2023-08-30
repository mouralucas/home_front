import React, {useEffect, useState} from "react";
import Doughnut from "../../../../Components/Chart/Doughnut";
import {getData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_INVESTMENT_PROPORTION} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";


const App = () => {

    const [investmentType, setInvestmentType] = useState([])

    useEffect(() => {
        getData(URL_FINANCE_INVESTMENT_PROPORTION).then(response => {
            setInvestmentType(response.investment_proportion)
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar os tipos de investimento ${err}`)
        })
    }, [])


    return (
        // @ts-ignore
        <Doughnut
            title={'Investimentos'}
            data={investmentType}
            argumentField={'type__name'}
            valueField={'total'}
            chartId={'1'}>
        </Doughnut>
    )
}

export default App;