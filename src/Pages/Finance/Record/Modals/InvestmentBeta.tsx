import React, {useState} from "react";
import {InvestmentType} from "../../Interfaces";
import {getData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_INVESTMENT_TYPE} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";

interface InvestmentProps {

}

interface InvestmentTypeResponse {
    status: boolean
    message?: string
    statusCode: number,
    quantity: number,
    investmentTypes: InvestmentType[]
}

const App: React.FC<InvestmentProps> = () => {
    const [investmentType, setInvestmentType] = useState<InvestmentType[]>()


    const getInvestmentType = () => {
        getData(URL_FINANCE_INVESTMENT_TYPE).then((response: InvestmentTypeResponse) => {
            setInvestmentType(response.investmentTypes);
        }).catch((err: string | ToastOptions) => {
            toast.error('Erro ao buscar tipos de investimento')
        })
    }

    return (
        <></>
    )
}

export default App