import PieChart, {Animation, Export, Label, Legend, Margin, Series} from 'devextreme-react/pie-chart';
import React from 'react';

interface PieCharProps {
    data: any[],
    title: string
    axis: any
    palette?: string[]
    type?: any
    showLegend?: boolean
    legendOrientation?: string
    legendVerticalAlignment?: string
    legendHorizontalAlignment?: string
    legendItemTextPosition?: string
    exportEnabled?: boolean
}

const App = (props: PieCharProps) => {
    const formatText = (arg: { value: any; argumentText: any; percentText: any; }) => {
        // let value =  (Math.round(arg.value * 100) / 100).toFixed(2)
        let value = Number(arg.value).toFixed(2)

        return `${arg.argumentText}: ${value} (${arg.percentText})`;
    }

    const pointClickHandler = (arg: { target: { select: () => void; }; }) => {
        arg.target.select();
    }

    return (
        <PieChart
            id="pie"
            dataSource={props.data}
            palette={props.palette ?? 'Violet'}
            title={props.title}
            type={props.type ?? 'pie'}
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
            <Export enabled={props.exportEnabled ?? false}/>
            <Legend
                visible={props.showLegend ?? true}
                orientation={props.legendOrientation ?? 'horizontal'}
                verticalAlignment={props.legendVerticalAlignment ?? "bottom"}
                horizontalAlignment={props.legendHorizontalAlignment ?? "center"}
                itemTextPosition={props.legendItemTextPosition ?? "right"}
            />
            <Animation enabled={true}/>
        </PieChart>
    );
}

export default App;