import React, {useEffect, useState} from "react";
import {toast, ToastOptions} from "react-toastify";
import {URL_CREDIT_CARD_BILL_HISTORY, URL_PERIOD} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {ArgumentAxis, Chart, ConstantLine, Export, Font, Label, Legend, Series, Title, ValueAxis, VisualRange} from "devextreme-react/chart";
import {RangeSlider} from "devextreme-react";


const App = () => {
    const [billHistory, setBillHistory] = useState([])
    const [expenseAvg, setExpenseAvg] = useState(0)
    const [expenseGoal, setExpenseGoal] = useState(0)

    const [sliderValue, setSliderValue] = useState(500)

    const [acceptedYearRangeValues, setAcceptedYearRangeValues] = useState([]);


    useEffect(() => {
        getBillHistory(null);
    }, []);

    const getReferenceList = () => {
        getData(URL_PERIOD).then(response => {

        }).catch(err => {
            toast.error("Erro ao buscas os períodos")
        })
    }

    const getBillHistory = (e: any) => {
        getData(URL_CREDIT_CARD_BILL_HISTORY, {
                'startAt': 202301,
                'endAt': 202312,
            }
        ).then(response => {
            let options = response == null ? {} : response.history.map((i: {
                reference: string;
                total_amount_absolute: number;
            }): { amount: number, reference: string } => ({
                reference: i.reference,
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

    const valueAxisLabel = (arg: any) => {
        return `R$ ${arg.valueText}`;
    }

    const customizeArgumentLabel = (e: any) => {
        return `${e.value}`;
    }

    const customizeLabel = (arg: any) => {
        if (arg.value > 70000) {
            return {
                visible: true,
                backgroundColor: '#ff7c7c',
                customizeText(e: any) {
                    return `${e.valueText}&#176F`;
                },
            };
        }
        return null;
    }

    function formatText(arg: any) {
        return `${arg.value}`;
    }

    const handleValueChanged = (e: any) => {
        console.log(e)
    };


    return (
        <>
            <Chart id="bill_history"
                   title={"Histórico de faturas"}
                   dataSource={billHistory}
                // @ts-ignore
                   customizePoint={customizePoint}
                // @ts-ignore
                   customizeLabel={customizeLabel}
                   palette={'Pastel'}
            >
                <Series
                    axis={'amount'}
                    argumentField={"reference"}
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

            <RangeSlider
                min={201801}
                max={201805}
                start={acceptedYearRangeValues[0]}
                end={acceptedYearRangeValues[acceptedYearRangeValues.length - 1]}
                onValueChanged={e => handleValueChanged(e)}
                // tooltip={{
                //     enabled: true,
                //     format: (value: string | number) => acceptedYearRangeValues[value],
                // }}
            >
            </RangeSlider>
        </>
    );

    function format(value: any) {
        return `Starts with ${value}`;
    }
}

export default App;