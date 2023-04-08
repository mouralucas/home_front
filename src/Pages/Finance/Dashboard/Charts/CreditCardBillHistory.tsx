import React, {useEffect, useState} from "react";
import {toast, ToastOptions} from "react-toastify";
import {URL_CREDIT_CARD_BILL_HISTORY} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {
    ArgumentAxis,
    Chart,
    ConstantLine,
    Export,
    Font,
    Label,
    Legend,
    Series,
    Title,
    ValueAxis,
    VisualRange
} from "devextreme-react/chart";
import { Slider, Tooltip } from 'devextreme-react/slider';


const App = () => {
    const [billHistory, setBillHistory] = useState([])
    const [expenseAvg, setExpenseAvg] = useState(0)
    const [expenseGoal, setExpenseGoal] = useState(0)

    const [sliderValue, setSliderValue] = useState(500)

    useEffect(() => {
        getBillHistory();
    }, []);

    const getBillHistory = () => {
        getData(URL_CREDIT_CARD_BILL_HISTORY, {
                'periodStart': 202201,
                'periodEnd': 202306,
            }
        ).then(response => {
            let options = response == null ? {} : response.history.map((i: { period: string; total_amount_absolute: number; }) => ({
                period: i.period,
                amount: Number(i.total_amount_absolute)
            }))
            setBillHistory(options);
            setExpenseGoal(response.goal);
            setExpenseAvg(response.average);
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
        <>
        <Chart id="bill_history"
               title={"Histórico de faturas"}
               dataSource={billHistory}
               customizePoint={customizePoint}
               customizeLabel={customizeLabel}
               palette={'Pastel'}
        >
            <Series
                axis={'amount'}
                argumentField={"period"}
                valueField={"amount"}
                type="bar"
                color="#e7d19a"
                // hoverMode="onlyPoints" //<!-- or "onlyPoint" | "allArgumentPoints" | "none" -->

            >
                <Label visible={false} customizeText={formatText}></Label>
            </Series>
            <ArgumentAxis argumentType={"string"}>
                <Label customizeText={customizeArgumentLabel}/>
            </ArgumentAxis>
            <ValueAxis maxValueMargin={0.01} name={'amount'}>
                <VisualRange startValue={sliderValue}/>
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

        <Slider min={0}
                max={1000}
                value={sliderValue}
                onValueChange={setSliderValue}
                step={500}
                >
            <Tooltip enabled={true} showMode="always" position="bottom" format={format} />
        </Slider>
    </>
    );

    function format(value: any) {
        return `Starts with ${value}`;
      }
}

export default App;