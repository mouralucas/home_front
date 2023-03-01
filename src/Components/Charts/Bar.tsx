import React, {useState} from 'react';
import {ArgumentAxis, Chart, ConstantLine, Export, Label, Legend, Series, ValueAxis} from 'devextreme-react/chart';


const App = (props) => {
    // TODO: esses states devem vir como props no respectivo componente
    const [expenseGoal, setExpenseGoal] = useState(2300)
    const [expenseAvg, setExpenseAvg] = useState(3000)

    // TODO: essa função deve vir como props e ter uma validação de existência
    const customizeText = (arg) => {
        // return `${arg.valueText}&#176F`;
        return null;
    }

    // TODO: essa função deve vir como props e ter uma validação de existência
    const customizeArgumentText = (e) => {
        return `${e.value}`;
    }

    // TODO: essa função deve vir como props e ter uma validação de existência
    const customizePoint = (arg) => {
        if (arg.value > expenseGoal) {
            return {color: '#ff7c7c', hoverStyle: {color: '#ff7c7c'}};
        }
        if (arg.value < expenseAvg) {
            return {color: '#8c8cff', hoverStyle: {color: '#8c8cff'}};
        }
        return null;
    }

    // TODO: essa função deve vir como props e ter uma validação de existência
    const customizeLabel = (arg) => {
        if (arg.value > expenseGoal) {
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

    const caralho = [
        {
            width: 2,
            value: 3000,
            color: "#8c8cff",
            dashStyle: "dash",
            label: {
                text: "Média"
            }
        },
        {
            width: 2,
            value: 2300,
            color: "#8c8cff",
            dashStyle: "dash",
            // label: {
            //     text: "Meta de gasto"
            // }
        },

    ]

    const setConstantLine = () => {
        return caralho.map((item) =>
            <ConstantLine
                width={item.width}
                value={item.value}
                color={item.color}
                dashStyle={item.dashStyle}
            >
                {item.label && <Label text={item.label.text} />}
            </ConstantLine>)
    }

    return (
        <Chart id="chart"
               title="Daily Temperature in May"
               dataSource={props.dataSource}
               customizePoint={props.customizePoint}
               customizeLabel={customizeLabel}
        >
            <Series
                argumentField={props.argumentField}
                valueField={props.valueField}
                type="bar"
                color="#e7d19a"
            />
            <ArgumentAxis>
                <Label customizeText={customizeArgumentText}/>
            </ArgumentAxis>
            <ValueAxis maxValueMargin={0.01}>
                {/*<VisualRange startValue={40}/>*/}
                {/*<Label customizeText={customizeText}/>*/}
                {setConstantLine()}
            </ValueAxis>
            <Legend visible={false}/>
            <Export enabled={true}/>
        </Chart>
    )
}

export default App;
