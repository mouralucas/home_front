import React, {useEffect, useState} from "react";
import CreditCardBillHistory from "../../../../Components/Charts/Bar";
import {toast, ToastOptions} from "react-toastify";
import {URL_CREDIT_CARD_BILL_HISTORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";


const App = () => {
    const [billHistory, setBillHistory] = useState([])
    const [expenseAvg, setExpenseAvg] = useState(0)

    useEffect(() => {
        getBillHistory();
    }, []);

    const getBillHistory = () => {
        getData(URL_CREDIT_CARD_BILL_HISTORY, {
                // 'period': getCurrentPeriod(),
                'period': 202302,
                'expense_type': 'fixed'
            }
        ).then(response => {
            let options = response == null ? {} : response.history.map(i => ({
                period: i.period,
                total_amount: i.total_amount * -1
            }))
            setExpenseAvg(response.average*-1);
            setBillHistory(options);
        }).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar o histórico de faturas' + err)
            }
        );
    }

    const constantLine = [
        {
            width: 2,
            value: 2300,
            color: "#8c8cff",
            dashStyle: "dash",
            label: {
                text: "Meta"
            }
        },
        {
            width: 2,
            value: expenseAvg,
            color: "#8c8cff",
            dashStyle: "dash",
            label: {
                text: "Média"
            }
        },

    ]

    return (
        <CreditCardBillHistory
            dataSource={billHistory}
            argumentField={"period"}
            valueField={"total_amount"}
            constantLine={constantLine}
        />
    );
}

export default App;