import PieChart from "../../../../Components/Charts/PieChart";
import {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_EXPENSES_FIXES} from "../../../../Services/Axios/ApiUrls";


const App = () => {
    const [expenses, setExpenses] = useState()

    const getExpenses = () => {
        axios.get(URL_EXPENSES_FIXES, {
            params: {'reference': 202206}
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