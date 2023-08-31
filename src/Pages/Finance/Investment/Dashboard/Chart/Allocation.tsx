import React, {useEffect, useState} from "react";
import AllocationChart from "../../../../../Components/Chart/Pie"
import {getData} from "../../../../../Services/Axios/Get";
import {URL_FINANCE_INVESTMENT_ALLOCATION} from "../../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";

interface InvestmentAllocation {
    success: boolean
    message?: string
    allocationIncome: any // TODO: adjust to correct values in investmentProportion
    allocationInvestment: any // TODO: adjust to correct values in investmentProportion
}

const App = () => {
    const [allocationIncoming, setAllocationIncoming] = useState<InvestmentAllocation[]>([])
    const [allocationInvestment, setAllocationInvestment] = useState<InvestmentAllocation[]>([])


    const getAllocation = () => {
        getData(URL_FINANCE_INVESTMENT_ALLOCATION, {showMode: 'father'}).then((response: InvestmentAllocation) => {
            setAllocationIncoming(response.allocationIncome);
            setAllocationInvestment(response.allocationInvestment);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar os tipos de investimento ${err}`)
        })
    }

    useEffect(() => {
        getAllocation();
    }, []);

    return (
        <div className="row">
            <div className="col-6">
                <AllocationChart
                    data={allocationIncoming}
                    title={"Alocação por tipo de renda"}
                    axis={{argumentField: 'incomeType', valueField: 'total'}}
                    type={'doughnut'}
                    legendOrientation={'vertical'}
                    legendVerticalAlignment={'bottom'}
                    legendHorizontalAlignment={'left'}
                />
            </div>
            <div className="col-6">
                <AllocationChart
                    data={allocationInvestment}
                    title={"Alocação por tipo de investimento"}
                    axis={{argumentField: 'investmentType', valueField: 'total'}}
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