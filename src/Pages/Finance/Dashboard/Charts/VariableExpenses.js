import PieChart from "../../../../Components/Charts/PieChart";
import {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_EXPENSES} from "../../../../Services/Axios/ApiUrls";
import getCurrentPeriod from "../../../../Utils/DateTime";
import AsyncSelect from "react-select/async";


const App = (props) => {
    const [expenses, setExpenses] = useState()

    const getExpenses = () => {
        axios.get(URL_EXPENSES, {
            params: {
                'reference': getCurrentPeriod(),
                'expense_type': 'variable'
            }
        }).then(response => {
            setExpenses(response.data.expenses.map(publisher => ({
                category: publisher.category,
                total_amount: publisher.total_amount
            })))
        });
    }

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <>
            <AsyncSelect formTarget={true} loadOptions={(query, callback) => getCategory(query, callback)}
                         onChange={(e) => setCombo(e, 'category_id', setSelectedCategory)} defaultOptions
                         value={selectedCategory}/>
            <PieChart data={expenses}
                      axis={{argumentField: 'category', valueField: 'total_amount'}}
                      title={'Medalhas'}
            />
        </>
    );
}

export default App;