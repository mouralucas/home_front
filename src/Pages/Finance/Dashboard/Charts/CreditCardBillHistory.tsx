import React, {useEffect, useState} from "react";
import CreditCardBillHistory from "../../../../Components/Charts/Bar";
import {toast, ToastOptions} from "react-toastify";
import {URL_CREDIT_CARD_BILL_HISTORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";


const App = () => {
    const [billHistory, setBillHistory] = useState([])
    const [expenseAvg, setExpenseAvg] = useState(0)
    const [expenseGoal, setExpenseGoal] = useState(0)

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
            setExpenseAvg(response.average * -1);
            setBillHistory(options);
            setExpenseGoal(response.goal)
        }).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar o histórico de faturas' + err)
            }
        );
    }

    /**
     *
     * @param arg
     * Get the colour of the column based in the average and goal
     */
    const customizePoint = (arg) => {
        // TODO: existe problema quando a média é menor que a meta!!!
        if (arg.value < expenseGoal) {
            return {color: '#8c8cff', hoverStyle: {color: '#8c8cff'}};
        } else if (arg.value >= expenseGoal && arg.value <= expenseAvg) {
            return {color: '#efff2f', hoverStyle: {color: '#efff2f'}}
        } else if (arg.value > expenseAvg) {
            return {color: '#ff7c7c', hoverStyle: {color: '#ff7c7c'}};
        }
        return null;
    }

    const valueAxisText = (arg) => {
        return `R$ ${arg.valueText}`;
    }

    const constantLine = [
        {
            width: 2,
            value: expenseGoal,
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

    const valueAxisConfig = {
        'customizedText': valueAxisText,
        'visualRange': 500,
        'title': {
            'value': 'Gasto em reais',
            'font': {
                'color': "#e91e63"
            }
        }
    }

    const argumentAxisConfig = {
        'argumentType': 'string' // number | date
    }

    return (
        <CreditCardBillHistory
            title={"Evolução de crédito"}
            dataSource={billHistory}
            argumentField={"period"}
            valueField={"total_amount"}
            constantLine={constantLine}
            customizePoint={customizePoint}
            valueAxisConfig={valueAxisConfig}
            argumentAxisConfig={argumentAxisConfig}
        />
    );
}

export default App;