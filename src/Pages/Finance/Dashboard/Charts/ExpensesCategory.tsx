import PieChart from "../../../../Components/Chart/Pie";
import React, {useEffect, useState} from "react";
import {URL_FINANCE_EXPENSES_BY_CATEGORY} from "../../../../Services/Axios/ApiUrls";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {toast, ToastOptions} from "react-toastify";
import {ExpenseByCategory} from "../../Interfaces";

interface ExpenseCategoryProps {
    period: number
    pointClick?: any
}

interface ExpensesByCategoryReturn {
    expensesByCategory: ExpenseByCategory[]
}

const App = (props: ExpenseCategoryProps) => {
    const [expensesByCategory, setExpensesByCategory] = useState<ExpenseByCategory[]>([])

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = () => {
        getFinanceData(URL_FINANCE_EXPENSES_BY_CATEGORY).then((response: ExpensesByCategoryReturn) => {
            setExpensesByCategory(response.expensesByCategory);
            console.log(response.expensesByCategory);
        }).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar as despesas variáveis' + err)
            }
        );
    }

    return (
        <>
            <PieChart data={expensesByCategory}
                      axis={{argumentField: 'categoryName', valueField: 'total'}}
                      title={'Categoria'}
                      tooltip={
                          {
                              show: true
                          }
                      }
                // onPointClick={props.pointClick}
            />
        </>
    );
}

export default App;