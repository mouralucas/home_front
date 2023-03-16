import PieChart from "../../../../Components/Charts/PieChart";
import {useEffect, useState} from "react";
import {URL_EXPENSE} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {toast} from "react-toastify";


const App = (props) => {
    const [expenses, setExpenses] = useState()

    const getExpenses = () => {
        getData(URL_EXPENSE, {
                // 'period': getCurrentPeriod(),
                'period': 202302,
                'expense_type': 'variable'
            }
        ).then(response => {
                let options = response == null ? {} : response.expenses.map(i => ({
                    category: i.category,
                    total_amount: i.total_amount
                }))
                setExpenses(options)
            }
        ).catch(err => {
                toast.error('Houve um erro ao buscar as despesas variáveis', err)
            }
        )

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
                      axis={{argumentField: 'category', valueField: 'total_amount'}}
                      title={'Despesas variáveis'}
            />
        </>
    );
}

export default App;