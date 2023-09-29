import React, {useEffect, useState} from "react";
import {toast, ToastOptions} from "react-toastify";
import {URL_CREDIT_CARD_BILL_HISTORY, URL_PERIOD} from "../../../../Services/Axios/ApiUrls";
import {getData} from "../../../../Services/Axios/Get";
import {ArgumentAxis, Chart, ConstantLine, Export, Font, Label, Legend, Series, Title, ValueAxis, VisualRange} from "devextreme-react/chart";
import {RangeSelector} from "devextreme-react";
import {Behavior, Format, Scale} from "devextreme-react/range-selector";
import {CreditCardBillHistory} from "../../Interfaces";


interface CreditCardBillHistoryResponse {
    success: boolean
    average: number
    goal: number
    history: CreditCardBillHistory[]
}


const App = () => {
    const [billHistory, setBillHistory] = useState([])
    const [expenseAvg, setExpenseAvg] = useState<number>(0)
    const [expenseGoal, setExpenseGoal] = useState<number>(0)

    const [selectedBillHistoryRange, setSelectedBillHistoryRange] = useState<[Date, Date]>()

    const [acceptedYearRangeValues, setAcceptedYearRangeValues] = useState();


    useEffect(() => {
        getBillHistory(202301, 202310);
        getPeriodList();
    }, []);

    const getPeriodList = () => {
        getData(URL_PERIOD, {
            'sMonth': 1,
            'sYear': 2018,
            'eMonth': 5,
            'eYear': 2024
        }).then(response => {
            // TODO: return the default range 13 months back and 5 or 6 in front current period
            // TODO: add response and other interfaces
            const dataSource = response.periods.map((item: any) => ({
                date: new Date(Math.floor(item.value / 100), (item.value % 100) - 1, 1),
                value: item.value,
            }));
            setAcceptedYearRangeValues(dataSource);
        }).catch(err => {
            toast.error("Erro ao buscas os períodos")
        })
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

    // TODO: Pass all chart config to a bar chart component, and namings must be more relatable with its use
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

    const onHandleMove = (e: any) => {
        const startDate = e.value[0];
        let startMonth = startDate.getUTCMonth() + 1;
        let startYear = startDate.getUTCFullYear();

        let startPeriod = startYear * 100 + startMonth;

        const endDate = e.value[1];
        let endMonth = endDate.getUTCMonth() + 1;
        let endYear = endDate.getUTCFullYear();

        let endPeriod = endYear * 100 + endMonth;

        setSelectedBillHistoryRange([startDate, endDate])
        getBillHistory(startPeriod, endPeriod);
    }
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
                    argumentField={"period"}
                    valueField={"balance"}
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
                <Export enabled={false}/>
            </Chart>

            <RangeSelector
                dataSource={acceptedYearRangeValues}
                dataSourceField={'date'}
                onValueChanged={onHandleMove}
                defaultValue={selectedBillHistoryRange}
                // scale={{ valueType: 'datetime', tickInterval: { months: 1 } }}
                // behavior={{ snapToTicks: true }}
            >
                <Scale tickInterval={'year'} minorTickInterval={'month'} valueType={'period'}>
                    {/*<Label>*/}
                    {/*    <Format type={"decimal"}/>*/}
                    {/*</Label>*/}
                </Scale>
                <Behavior callValueChanged="onHandleMove"/>
            </RangeSelector>
        </>
    );


    function format(value: any) {
        return `Starts with ${value}`;
    }
}

export default App;