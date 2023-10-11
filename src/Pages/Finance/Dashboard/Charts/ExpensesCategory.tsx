import PieChart from "../../../../Components/Chart/Pie";
import React, {useEffect, useState} from "react";
import {URL_FINANCE_EXPENSE_CATEGORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast, ToastOptions} from "react-toastify";
import {getCurrentPeriod} from "../../../../Utils/DateTime";
import {ExpensesByCategory} from "../../Interfaces";


const App = () => {
    const [expenses, setExpenses] = useState<ExpensesByCategory[]>([])

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = () => {
        getData(URL_FINANCE_EXPENSE_CATEGORY, {
                'period': getCurrentPeriod(),
                // 'period': 202302,
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

    const handlePointClick = (e: any) => {
        const sliceData = e.target.originalArgument;
        // Make a backend call to get details based on sliceData
        // Assume you have the details in response.data
        const response = {}; // Your backend response here
        console.log(e);

        // setSliceDetails(response.data);
        // setModalIsOpen(true);
    };

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