import PieChart from "../../../../Components/Chart/Pie";
import React, {useEffect, useState} from "react";
import {URL_FINANCE_EXPENSE_CATEGORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast, ToastOptions} from "react-toastify";
import {getCurrentPeriod} from "../../../../Utils/DateTime";
import {ExpensesByCategory} from "../../Interfaces";
import ModalCategoryExpensesDetails from "../Modals/CategoryExpensesDetails"

const App = () => {
    const [expenses, setExpenses] = useState<ExpensesByCategory[]>([])
    const [modalState, setModalState] = useState<boolean>(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
        } else {
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = () => {
        getData(URL_FINANCE_EXPENSE_CATEGORY, {
                'period': getCurrentPeriod(),
                // 'period': 202302,
            }
        ).then(response => {
                let options = response == null ? {} : response.expenses.map((i: ExpensesByCategory) => ({
                    category: i.category,
                    total: i.total,
                    category_id: i.category_id
                }))
                setExpenses(options)
            }
        ).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar as despesas variáveis' + err)
            }
        );
    }

    const handlePointClick = (e: any) => {
        console.log(e.target.data);
        showModal(e);
    };

    return (
        <>
            <PieChart data={expenses}
                      axis={{argumentField: 'category', valueField: 'total'}}
                      title={'Categoria'}
                      onPointClick={handlePointClick}
            />
            <ModalCategoryExpensesDetails modalState={modalState} hideModal={hideModal} />
        </>
    );
}

export default App;