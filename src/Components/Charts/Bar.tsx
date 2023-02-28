import React, {useState} from 'react';
import {Chart, ConstantLine, Export, Label, Legend, Series, ValueAxis, VisualRange} from 'devextreme-react/chart';


const App = (props) => {
    const [highAverage, setHighAverage] = useState(77)
    const [lowAverage, setLowAverage] = useState(58)

    const customizeText = (arg) => {
        return `${arg.valueText}&#176F`;
    }

    const customizePoint = (arg) => {
        if (arg.value > highAverage) {
            return { color: '#ff7c7c', hoverStyle: { color: '#ff7c7c' } };
        }
        if (arg.value < lowAverage) {
            return { color: '#8c8cff', hoverStyle: { color: '#8c8cff' } };
        }
        return null;
    }

    const customizeLabel = (arg) => {
        if (arg.value > highAverage) {
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

    return (
        <Chart id="chart"
               title="Daily Temperature in May"
               dataSource={props.dataSource}
               customizePoint={customizePoint}
               customizeLabel={customizeLabel}>
            <Series
                argumentField={props.argumentField}
                valueField={props.valueField}
                type="bar"
                color="#e7d19a"
            />
            <ValueAxis maxValueMargin={0.01}>
                <VisualRange startValue={40}/>
                <Label customizeText={customizeText}/>
                <ConstantLine
                    width={2}
                    value={lowAverage}
                    color="#8c8cff"
                    dashStyle="dash"
                >
                    <Label text="Low Average"/>
                </ConstantLine>
                <ConstantLine
                    width={2}
                    value={highAverage}
                    color="#ff7c7c"
                    dashStyle="dash"
                >
                    <Label text="High Average"/>
                </ConstantLine>
            </ValueAxis>
            <Legend visible={false}/>
            <Export enabled={true}/>
        </Chart>
    )
}

export default App;
