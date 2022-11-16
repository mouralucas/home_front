import PieChart from "../../../../Components/Charts/PieChart";
import {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_EXPENSES} from "../../../../Services/Axios/ApiUrls";
import getCurrentPeriod from "../../../../Utils/DateTime";


const App = () => {
    const [expenses, setExpenses] = useState()

    const getExpenses = () => {
        axios.get(URL_EXPENSES, {
            params: {
                'reference': getCurrentPeriod(),
                'expense_type': 'fixed'
            }
        }).then(response => {
            setExpenses(response.data.expenses.map(expense => ({category:expense.category, total_amount: expense.total_amount})))
        });
    }

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <PieChart data={expenses}
                  axis={{argumentField: 'category', valueField: 'total_amount'}}
                  // title={''}
        />
    );
}

export default App;