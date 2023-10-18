import PieChart from "../../../../Components/Chart/Pie";
import React, {useEffect, useState} from "react";
import {URL_FINANCE_TRANSACTIONS_CATEGORY_AGGREGATED} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast, ToastOptions} from "react-toastify";
import {getCurrentPeriod} from "../../../../Utils/DateTime";
import {CategoryTransactions} from "../../Interfaces";
import ModalCategoryExpensesDetails from "../Modals/CategoryExpensesDetails"

interface ExpenseCategoryProps {
    pointClick: any
}

const App = (props: ExpenseCategoryProps) => {
    const [expenses, setExpenses] = useState<CategoryTransactions[]>([])
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
        getData(URL_FINANCE_TRANSACTIONS_CATEGORY_AGGREGATED, {
                'period': getCurrentPeriod(),
                // 'period': 202302,
            }
        ).then(response => {
            // TODO: add this response interface
                let options = response == null ? {} : response.expenses.map((i: CategoryTransactions) => ({
                    category: i.category,
                    total: i.total,
                    categoryId: i.categoryId
                }))
                setExpenses(options)
            }
        ).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar as despesas variáveis' + err)
            }
        );
    }

    // const handlePointClick = (e: any) => {
    //     console.log(e.target.data);
    // };

    return (
        <>
            <PieChart data={expenses}
                      axis={{argumentField: 'category', valueField: 'total'}}
                      title={'Categoria'}
                      onPointClick={props.pointClick}
            />
            <ModalCategoryExpensesDetails modalState={modalState} hideModal={hideModal} />
        </>
    );
}

export default App;