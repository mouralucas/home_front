import PieChart, {Series, Label, Margin, Export, Legend, Animation} from 'devextreme-react/pie-chart';
import { DataSourceLike } from 'devextreme/data/data_source';
import { BaseWidgetTitle } from 'devextreme/viz/core/base_widget';
import React from 'react';

interface PieCharProps {
    data: any[],
    pallete?: string[]
    title: string
    axis: any
    showLegend?: boolean
}

const App = (props: PieCharProps) => {
    const formatText = (arg: { value: any; argumentText: any; percentText: any; }) => {
        // let value =  (Math.round(arg.value * 100) / 100).toFixed(2)
        let value =  Number(arg.value).toFixed(2)

        return `${arg.argumentText}: ${value} (${arg.percentText})`;
    }

    const pointClickHandler = (arg: { target: { select: () => void; }; }) => {
        console.log(arg)
        arg.target.select();
    }

    return (
        <PieChart
            id="pie"
            dataSource={props.data}
            palette={props.pallete ?? "Pastel"}
            title={props.title}
            resolveLabelOverlapping={'shift'}
            onPointClick={pointClickHandler}
        >
            <Series
                argumentField={props.axis.argumentField}
                valueField={props.axis.valueField}
            >
                <Label visible={true} customizeText={formatText}/>
            </Series>
            <Margin bottom={20}/>
            <Export enabled={true}/>
            <Legend visible={props.showLegend ?? true} orientation={'horizontal'}
                    verticalAlignment="bottom" itemTextPosition="right" horizontalAlignment="center"/>
            <Animation enabled={true}/>
        </PieChart>
    );
}

export default App;