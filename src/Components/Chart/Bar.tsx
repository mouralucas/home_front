import React from 'react';
import {ArgumentAxis, Chart, ConstantLine, Export, Font, Label, Legend, Series, Title, ValueAxis, VisualRange} from 'devextreme-react/chart';

interface BarProps {
    data: any[]
    argumentField: string
    valueField: string
    title: string
    axis?: string
    name?: any
    palette?: string[]
    customizePoint?: any
    customizeLabel?: any
    seriesLabel?: {
        visible: boolean
        customizeText?: any
    }
}

const App = (props: BarProps) => {
    return (
        <Chart id="chart"
               title={props.title}
               dataSource={props.data}
               palette={props.palette ?? 'Pastel'}
               customizePoint={props.customizePoint}
               customizeLabel={props.customizeLabel}
        >
            <Series
                valueField={props.valueField}
                argumentField={props.argumentField}
                axis={props.axis}
                name={props.name ?? undefined}
                type="bar"
                color="#ffaa66"
            >
                {props.seriesLabel &&
                    <Label visible={props.seriesLabel.visible}></Label>
                }
            </Series>
        </Chart>
    )
}

export default App;
