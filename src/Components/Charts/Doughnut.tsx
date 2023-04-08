import React from "react";
import PieChart, {Connector, Format, Label, Legend, Series, Tooltip,} from 'devextreme-react/pie-chart';


const App = (props) => {
    const formatLabel = (arg): { text: string } => {
        return arg.currency
    }

    const customizeTooltip = (arg): { text: string } => {
        console.log(arg)
        return {
            text: `${arg.value} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }

    const customizeSeriesLabel = (pointInfo) => {
        let value =  (Math.round(pointInfo.value * 100) / 100).toFixed(2)
        return `${pointInfo.argument}: ${value} (${pointInfo.percentText})`;
    }

    return (
        <PieChart
            id={props.chart_id ?? 'pie'}
            type={'doughnut'}
            title={props.title ?? 'Gráfico Doughnut'}
            dataSource={props.dataSource}
            palette={'Pastel'}
        >
            <Series argumentField={props.argumentField} valueField={props.valueField}>
                <Label visible={true} customizeText={customizeSeriesLabel}>
                    <Connector visible={true}/>
                </Label>
            </Series>
            <Legend
                margin={0}
                horizontalAlignment="left"
                verticalAlignment="top"
            />
            <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                <Format type="millions"/>
            </Tooltip>
        </PieChart>
    )
}

export default App;