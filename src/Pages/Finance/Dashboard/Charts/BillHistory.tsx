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

    const customizePoint = (arg: { value: number; }) => {
        // TODO: existe problema quando a média é menor que a meta!!!
        if (arg.value < expenseGoal) {
            return {color: '#77dd77', hoverStyle: {color: '#77dd77'}};
        } else if (arg.value >= expenseGoal && arg.value <= expenseAvg) {
            return {color: '#fdfd96', hoverStyle: {color: '#fdfd96'}}
        } else if (arg.value > expenseAvg) {
            return {color: '#ff6961', hoverStyle: {color: '#ff6961'}};
        }
        return null;
    }

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
            title={"Histórico de faturas"}
            data={billHistory}
            argumentField={'period'}
            valueField={'balance'}
            name={'Faturas'}
            customizePoint={customizePoint}
            argumentAxis={{
                argumentType: "string"
            }}
        ></BarChart>
    )
}

export default App;