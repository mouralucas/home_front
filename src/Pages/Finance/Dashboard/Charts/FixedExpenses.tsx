import PieChart from "../../../../Components/Chart/Pie";
import {useEffect, useState} from "react";
import {URL_EXPENSE} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast} from "react-toastify";
import React from "react";


const App = () => {
    const [expenses, setExpenses] = useState<any[]>([])

    const getExpenses = () => {
        getData(URL_EXPENSE, {
                // 'period': getCurrentPeriod(),
                'period': 202302,
                'expense_type': 'fixed'
            }
        ).then(response => {
            let options = response == null ? {} : response.expenses.map((i: { category: string; total_amount: number; }) => ({
                category: i.category,
                total_amount: i.total_amount
            }))
            setExpenses(options)
        }).catch(err => {
                toast.error('Houve um erro ao buscar as despesas', err)
            }
        );
    }

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <PieChart data={expenses}
                  axis={{argumentField: 'category', valueField: 'total_amount'}}
                  title={'Despesas fixas'}
        />
    );
}

export default App;