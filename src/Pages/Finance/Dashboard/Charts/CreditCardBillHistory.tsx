import BarChart from '../../../../Components/Chart/Bar'
import React, {useEffect, useState} from "react";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {URL_CREDIT_CARD_BILL_CONSOLIDATED} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {Behavior, Scale} from "devextreme-react/range-selector";
import {RangeSelector} from "devextreme-react";
import {CreditCardBillHistory} from "../../Interfaces";

const App = () => {
    const [billHistory, setBillHistory] = useState<CreditCardBillHistory[]>([])
    const [expenseAvg, setExpenseAvg] = useState<number>(0)
    const [expenseGoal, setExpenseGoal] = useState<number>(0)

    // Variables for the bill history range selector
    const [acceptedYearRangeValues, setAcceptedYearRangeValues] = useState();
    const [selectedBillHistoryRange, setSelectedBillHistoryRange] = useState<[Date, Date]>()

    useEffect(() => {
        getBillHistory(202401, 202412);
    }, []);

    const customizePoint = (arg: { value: number; }) => {
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
        getFinanceData(URL_CREDIT_CARD_BILL_CONSOLIDATED, {
                'startPeriod': startAt,
                'endPeriod': endAt,
            }
        ).then(response => {
            let options = response == null ? {} : response.bill.map((i: {
                period: string;
                total_amount: number;
            }): { period: string, total_amount: number } => ({
                period: i.period,
                total_amount: i.total_amount
            }))
            setBillHistory(options);

            let period_range = response.periodRange.map((item: any) => ({
                date: new Date(Math.floor(item / 100), (item % 100) - 1, 1),
                value: item,
            }));

            // Only set accepted range when not available yet
            if (acceptedYearRangeValues == null) {
                setAcceptedYearRangeValues(period_range);
            }
            
            const sd = new Date(Math.floor(startAt / 100), (startAt % 100) - 1, 1)
            const ed = new Date(Math.floor(endAt / 100), (endAt % 100) - 1, 1)
            setSelectedBillHistoryRange([sd, ed])

            setExpenseGoal(response.goal);
            setExpenseAvg(response.average);
        }).catch((err: string | ToastOptions) => {
                toast.error('Houve um erro ao buscar o histórico de faturas' + err)
            }
        );
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
                valueField={'total_amount'}
                name={'Faturas'}
                customizePoint={customizePoint}
                argumentAxis={{
                    argumentType: "string"
                }}
                valueAxis={{
                    maxValueMargin: 0.01,
                    name: 'total_amount',
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