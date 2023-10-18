import PieChart from "../../../../Components/Chart/Pie";
import React, {useEffect, useState} from "react";
import {URL_FINANCE_TRANSACTIONS_CATEGORY_AGGREGATED} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast, ToastOptions} from "react-toastify";
import {getCurrentPeriod} from "../../../../Utils/DateTime";
import {CategoryTransactions} from "../../Interfaces";
import ModalCategoryExpensesDetails from "../Modals/CategoryExpensesDetails"

interface ExpenseCategoryProps {
    period: number
    pointClick: any
}

interface CategoryTransactionsAggregatedResponse {
    success: boolean
    message?: string
    transactions: CategoryTransactions[]
}

const App = (props: ExpenseCategoryProps) => {
    const [expenses, setExpenses] = useState<CategoryTransactions[]>([])

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = () => {
        getData(URL_FINANCE_TRANSACTIONS_CATEGORY_AGGREGATED, {
                'period': props.period,
            }
        ).then((response: CategoryTransactionsAggregatedResponse) => {
                setExpenses(response.transactions)
            }
        ).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar as despesas variáveis' + err)
            }
        );
    }

    return (
        <>
            <PieChart data={expenses}
                      axis={{argumentField: 'category', valueField: 'total'}}
                      title={'Categoria'}
                      onPointClick={props.pointClick}
            />
        </>
    );
}

export default App;