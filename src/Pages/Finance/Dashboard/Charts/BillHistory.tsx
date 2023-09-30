import BarChart from '../../../../Components/Chart/Bar'
import {useEffect, useState} from "react";
import {getData} from "../../../../Services/Axios/Get";
import {URL_CREDIT_CARD_BILL_HISTORY} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";

const App = () => {
    const [billHistory, setBillHistory] = useState([])
    const [expenseAvg, setExpenseAvg] = useState<number>(0)
    const [expenseGoal, setExpenseGoal] = useState<number>(0)

    useEffect(() => {
        getBillHistory(202301, 202310);
    }, []);

    const getBillHistory = (startAt: number, endAt: number) => {
        getData(URL_CREDIT_CARD_BILL_HISTORY, {
                'startAt': startAt,
                'endAt': endAt,
            }
        ).then(response => {
            let options = response == null ? {} : response.history.map((i: {
                period: string;
                balance: number;
            }): { period: string, balance: number } => ({
                period: i.period,
                balance: i.balance
            }))
            setBillHistory(options);
            setExpenseGoal(response.goal);
            setExpenseAvg(response.average);
        }).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar o histórico de faturas' + err)
            }
        );
    }

    return (
        <BarChart
            data={billHistory}
            argumentField={'period'}
            valueField={'balance'}
            name={'Faturas'}
        ></BarChart>
    )
}

export default App;