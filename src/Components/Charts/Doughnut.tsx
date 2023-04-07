import React from "react";
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export,
} from 'devextreme-react/pie-chart';

const App = (props) => {
    const populationByRegions = [{
        currency: 'Dolar',
        val: 152.30,
    }, {
        currency: 'Real',
        val: 12000,
    }];

    const series2 = [
        {
            currency: 'Euro',
            val: 3500
        },
        {
            currency: 'Pounds',
            val: 1000,
        },
        {
            currency: 'Czech Crowns',
            val: 900
        }
    ]

    const formatLabel = (arg): {text: string} => {

        return arg.currency
    }

    const customizeTooltip = (arg): {text: string} => {
        console.log(arg)
        return {
            text: `${arg.value} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }

    return (
        <PieChart
            id={props.chart_id ?? 'pie'}
            type={'doughnut'}
            title={props.title ?? 'Gráfico Doughnut'}
            dataSource={populationByRegions}
        >
            <Series argumentField="currency" valueField={'val'}>
                <Label visible={true} format={'currency'}>
                    <Connector visible={true} />
                </Label>
            </Series>
            <Series argumentField="currency" valueField={'val'}>
                <Label visible={true} format={'currency'}>
                    <Connector visible={true} />
                </Label>
            </Series>
            <Legend
                margin={0}
                horizontalAlignment="left"
                verticalAlignment="top"
            />
            <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                <Format type="millions" />
            </Tooltip>
        </PieChart>
    )
}

export default App;