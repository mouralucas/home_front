import React from 'react';
import {ArgumentAxis, Chart, ConstantLine, Export, Font, Label, Legend, Series, Title, ValueAxis, VisualRange} from 'devextreme-react/chart';

interface BarProps {
    data: any[]
    argumentField: string
    valueField: string
    axis?: string
    name?: any
    customizePoint?: any
}

const App = (props: BarProps) => {
    return (
        <Chart id="chart"
               dataSource={props.data}
               customizePoint={props.customizePoint}
        >
            <Series
                valueField={props.valueField}
                argumentField={props.argumentField}
                axis={props.axis}
                name={props.name ?? undefined}
                type="bar"
                color="#ffaa66"
            />
        </Chart>
    )
}

export default App;
