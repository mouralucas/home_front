import React from "react";
import {ArgumentAxis, Chart, CommonSeriesSettings, Export, Grid, Legend, Margin, Series, Subtitle, Title, Tooltip,} from 'devextreme-react/chart';


interface LineChartProps {
    data: any[] | undefined
    series: any[] | undefined
    argumentField: string
    title: string
    subtitle?: string
    type?: string
}

const App = (props: LineChartProps) => {
    return (
        <Chart palette={"Violet"}
               dataSource={props.data}>

            <CommonSeriesSettings
                argumentField={props.argumentField}
                type={props.type || 'line'}
            />
            {
                props.series?.map((item) => <Series
                    key={item.value}
                    valueField={item.value}
                    name={item.name}/>)
            }
            <Margin bottom={20}/>
            <ArgumentAxis
                valueMarginsEnabled={false}
                discreteAxisDivisionMode="crossLabels"
            >
                <Grid visible={true}/>
            </ArgumentAxis>
            <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
                itemTextPosition="bottom"
            />
            <Export enabled={true}/>
            <Title text={props.title}>
                {props.subtitle ? <Subtitle text={props.subtitle}/> : <></>}
            </Title>
            <Tooltip enabled={true}/>
        </Chart>
    )
}

export default App;