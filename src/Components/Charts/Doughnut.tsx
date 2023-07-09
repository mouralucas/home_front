import React from "react";
import PieChart, {Connector, Format, Label, Legend, Series, Tooltip,} from 'devextreme-react/pie-chart';
import { DataSourceLike } from "devextreme/data/data_source";


const App = (props: { chart_id: any; title: any; dataSource: DataSourceLike<any, any> | null | undefined; argumentField: any; valueField: any; }) => {
    const formatLabel = (arg: any): { text: string } => {
        return arg.currency
    }

    const customizeTooltip = (arg: any): { text: string } => {
        console.log(arg)
        return {
            text: `${arg.value} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }

    const customizeSeriesLabel = (pointInfo: any) => {
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