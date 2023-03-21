import PieChart from "../../../../Components/Charts/PieChart";
import React, {useEffect, useState} from "react";
import {URL_FINANCE_EXPENSE_CATEGORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast, ToastOptions} from "react-toastify";


const App = (props) => {
    const [expenses, setExpenses] = useState()

    const getExpenses = () => {
        getData(URL_FINANCE_EXPENSE_CATEGORY, {
                // 'period': getCurrentPeriod(),
                'period': 202302,
            }
        ).then(response => {
                let options = response == null ? {} : response.expenses.map(i => ({
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
            {/*<AsyncSelect formTarget={true} loadOptions={(query, callback) => getCategory(query, callback)}*/}
            {/*             onChange={(e) => setCombo(e, 'category_id', setSelectedCategory)} defaultOptions*/}
            {/*             value={selectedCategory}/>*/}
            <PieChart data={expenses}
                      axis={{argumentField: 'category', valueField: 'total'}}
                      title={'Categoria'}
            />
        </>
    );
}

export default App;