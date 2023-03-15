import React, {useEffect, useState} from "react";
import {toast, ToastOptions} from "react-toastify";
import {URL_CREDIT_CARD_BILL_HISTORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {
    ArgumentAxis,
    Chart, ConstantLine,
    Export,
    Font,
    Label,
    Legend,
    Series,
    Title,
    ValueAxis,
    VisualRange
} from "devextreme-react/chart";
import getCurrentPeriod from "../../../../Utils/DateTime";


const App = () => {
    const [billHistory, setBillHistory] = useState([])
    const [expenseAvg, setExpenseAvg] = useState(0)
    const [expenseGoal, setExpenseGoal] = useState(0)

    useEffect(() => {
        getBillHistory();
    }, []);

    const getBillHistory = () => {
        getData(URL_CREDIT_CARD_BILL_HISTORY, {
                'periodStart': 202201,
                'periodEnd': getCurrentPeriod(),
            }
        ).then(response => {
            let options = response == null ? {} : response.history.map(i => ({
                period: i.period,
                total_amount: i.total_amount * -1
            }))
            setExpenseAvg(response.average * -1);
            setBillHistory(options);
            setExpenseGoal(response.goal)
        }).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar o histórico de faturas' + err)
            }
        );
    }

    /**
     *
     * @param arg
     * Get the colour of the column based in the average and goal
     */
    const customizePoint = (arg) => {
        // TODO: existe problema quando a média é menor que a meta!!!
        if (arg.value < expenseGoal) {
            return {color: '#8c8cff', hoverStyle: {color: '#8c8cff'}};
        } else if (arg.value >= expenseGoal && arg.value <= expenseAvg) {
            return {color: '#efff2f', hoverStyle: {color: '#efff2f'}}
        } else if (arg.value > expenseAvg) {
            return {color: '#ff7c7c', hoverStyle: {color: '#ff7c7c'}};
        }
        return null;
    }

    const valueAxisLabel = (arg) => {
        return `R$ ${arg.valueText}`;
    }

    const customizeArgumentLabel = (e) => {
        return `${e.value}`;
    }

    const customizeLabel = (arg) => {
        if (arg.value > 70000) {
            return {
                visible: true,
                backgroundColor: '#ff7c7c',
                customizeText(e) {
                    return `${e.valueText}&#176F`;
                },
            };
        }
        return null;
    }

    function formatText(arg) {
        return `${arg.value}`;
    }

    return (
        <Chart id="bill_history"
               title={"Histórico de faturas"}
               dataSource={billHistory}
               customizePoint={customizePoint}
               customizeLabel={customizeLabel}
        >
            <Series
                axis={'amount'}
                argumentField={"period"}
                valueField={"total_amount"}
                type="bar"
                color="#e7d19a"
                // hoverMode="onlyPoints" //<!-- or "onlyPoint" | "allArgumentPoints" | "none" -->

            >
                <Label visible={true} customizeText={formatText}></Label>
            </Series>
            <ArgumentAxis argumentType={"string"}>
                {/*<Label customizeText={customizeArgumentLabel}/>*/}
            </ArgumentAxis>
            <ValueAxis maxValueMargin={0.01} name={'amount'}>
                <VisualRange startValue={500}/>
                <Label customizeText={valueAxisLabel}/>
                <Title text={"Gasto em reais"}>
                    <Font color={"#e91e63"}/>
                </Title>
                <ConstantLine width={2} value={expenseGoal} color={"#8c8cff"} dashStyle={"dash"}>
                    <Label text={"Meta"}/>
                </ConstantLine>
                <ConstantLine width={2} value={expenseAvg} color={"#8c8cff"} dashStyle={"dash"}>
                    <Label text={"Média"}/>
                </ConstantLine>
            </ValueAxis>
            <Legend visible={false}/>
            <Export enabled={true}/>
        </Chart>
    );
}

export default App;