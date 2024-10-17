import React, {useEffect, useState} from "react";
import AllocationChart from "../../../../../Components/Chart/Pie"
import IncomingChart from "../../../../../Components/Chart/Pie"
import {getFinanceData} from "../../../../../Services/Axios/Get";
import {URL_FINANCE_INVESTMENT_ALLOCATION} from "../../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {InvestmentAllocation} from "../../../Interfaces";

interface InvestmentAllocationResponse {
    success: boolean
    message?: string
    typeAllocation: InvestmentAllocation[]
    categoryAllocation: InvestmentAllocation[]
}

const App = () => {
    const [incomingAllocation, setIncomingAllocation] = useState<InvestmentAllocation[]>([])
    const [investmentAllocation, setInvestmentAllocation] = useState<InvestmentAllocation[]>([])


    const getAllocation = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_ALLOCATION, {showMode: 'father'}).then((response: InvestmentAllocationResponse) => {
            setIncomingAllocation(response.typeAllocation);
            setInvestmentAllocation(response.categoryAllocation);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar os tipos de investimento ${err}`)
        })
    }

    useEffect(() => {
        console.log(investmentAllocation)
    }, [investmentAllocation]);

    useEffect(() => {
        getAllocation();
    }, []);

    return (
        <div className="row">
            <div className="col-6">
                <AllocationChart
                    data={incomingAllocation}
                    title={"Alocação por tipo de renda"}
                    axis={{argumentField: 'name', valueField: 'total'}}
                    type={'doughnut'}
                    legendOrientation={'vertical'}
                    legendVerticalAlignment={'bottom'}
                    legendHorizontalAlignment={'left'}
                />
            </div>
            <div className="col-6">
                <IncomingChart
                    data={investmentAllocation}
                    title={"Alocação por tipo de investimento"}
                    axis={{argumentField: 'name', valueField: 'total'}}
                    type={'doughnut'}
                    legendOrientation={'vertical'}
                    legendVerticalAlignment={'bottom'}
                    legendHorizontalAlignment={'left'}
                />
            </div>
        </div>
    )
}

export default App;