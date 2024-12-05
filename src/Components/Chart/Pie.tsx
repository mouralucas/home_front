import PieChart, {Animation, Export, Label, Legend, Margin, Series} from 'devextreme-react/pie-chart';
import React from 'react';
import {Tooltip} from "devextreme-react/chart";

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
    onPointClick?: any
}

const App = (props: PieCharProps) => {
    const formatText = (arg: { value: any; argumentText: any; percentText: any; }) => {
        // let value =  (Math.round(arg.value * 100) / 100).toFixed(2)
        let value = Number(arg.value).toFixed(2)

        return `${arg.argumentText}: ${value} (${arg.percentText})`;
    }

    const handlePointClick = (e: any) => {
        const sliceData = e.target.originalArgument;
        // Make a backend call to get details based on sliceData
        // Assume you have the details in response.data
        const response = {}; // Your backend response here
        // setSliceDetails(response.data);
        // setModalIsOpen(true);
    };

    return (
        <PieChart
            id="pie"
            dataSource={props.data}
            palette={props.palette ?? 'Violet'}
            title={props.title}
            type={props.type ?? 'pie'}
            resolveLabelOverlapping={'shift'}
            onPointClick={props.onPointClick ?? undefined}
        >
            <Series
                argumentField={props.axis.argumentField}
                valueField={props.axis.valueField}
            >
                <Label visible={false} customizeText={formatText}/>
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
            <Tooltip
                enabled={true} // Habilita o tooltip
                format="fixedPoint" // Formata os valores
                customizeTooltip={(info: any) => ({
                    text: `${info.argumentText}: (${info.percentText})`,
                })}
            />
            <Animation enabled={true}/>
        </PieChart>
    );
}

export default App;