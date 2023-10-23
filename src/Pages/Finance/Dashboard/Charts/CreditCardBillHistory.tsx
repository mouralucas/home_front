import BarChart from '../../../../Components/Chart/Bar'
import React, {useEffect, useState} from "react";
import {getData} from "../../../../Services/Axios/Get";
import {URL_CREDIT_CARD_BILL_HISTORY, URL_PERIOD} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {Behavior, Scale} from "devextreme-react/range-selector";
import {RangeSelector} from "devextreme-react";
import {CreditCardBillHistory} from "../../Interfaces";

const App = () => {
    const [billHistory, setBillHistory] = useState<CreditCardBillHistory[]>([])
    const [expenseAvg, setExpenseAvg] = useState<number>(0)
    const [expenseGoal, setExpenseGoal] = useState<number>(0)

    const [acceptedYearRangeValues, setAcceptedYearRangeValues] = useState();
    const [selectedBillHistoryRange, setSelectedBillHistoryRange] = useState<[Date, Date]>()

    useEffect(() => {
        getBillHistory(202301, 202310);
        getPeriodList();
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

    const valueAxisLabel = (arg: any) => {
        return `R$ ${arg.valueText}`;
    }

    const getBillHistory = (startAt: number, endAt: number) => {
        getData(URL_CREDIT_CARD_BILL_HISTORY, {
                'startAt': startAt,
                'endAt': endAt,
                'type': 'aggregated'
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

    function customizeTooltip(pointInfo: any) {
        console.log(pointInfo);
        return {
            html:
                `<div>
                    <div class="tooltip-header">
                        ${pointInfo.argumentText}
                    </div>
                    <div class="tooltip-body"><div class="series-name">
                        <span class='top-series-name'>
                            ${pointInfo.points[0].seriesName}:
                        </span> 
                    </div>
                    <div class="value-text">
                        <span class='top-series-value'>
                            R$ ${pointInfo.points[0].valueText}
                        </span>
                    </div>
                </div>`,
        };
    }

    return (
        <>
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
                valueAxis={{
                    maxValueMargin: 0.01,
                    name: 'balance',
                    label: {
                        customizeText: valueAxisLabel
                    },
                    title: {
                        text: "Valores em reais",
                        font: {
                            color: "#e91e63"
                        }
                    },
                    constantLine: [
                        {
                            value: expenseGoal,
                            width: 2,
                            color: '#8c8cff',
                            dashStyle: "dash",
                            label: {
                                text: 'Meta'
                            }
                        },
                        {
                            value: expenseAvg,
                            width: 2,
                            color: '#8c8cff',
                            dashStyle: "dash",
                            label: {
                                text: 'Média'
                            }
                        },
                        // Add more constant lines as needed
                    ]
                }}
                toolTip={{
                    enabled: true,
                    customizeTooltip: customizeTooltip
                }}
            ></BarChart>
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
    )
}

export default App;