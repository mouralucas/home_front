import PieChart from "../../../../Components/Chart/PieChart";
import React, {useEffect, useState} from "react";
import {URL_FINANCE_EXPENSE_CATEGORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast, ToastOptions} from "react-toastify";


const App = () => {
    const [expenses, setExpenses] = useState<any[]>([])

    const getExpenses = () => {
        getData(URL_FINANCE_EXPENSE_CATEGORY, {
                // 'period': getCurrentPeriod(),
                'period': 202302,
            }
        ).then(response => {
                let options = response == null ? {} : response.expenses.map((i: { category: string; total: number; }) => ({
                    category: i.category,
                    total: i.total
                }))
                setExpenses(options)
            }
        ).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar as despesas variáveis' + err)
            }
        );
    }

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <>
            <PieChart data={expenses}
                      axis={{argumentField: 'category', valueField: 'total'}}
                      title={'Categoria'}
            />
        </>
    );
}

export default App;