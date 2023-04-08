import PieChart, {Series, Label, Margin, Export, Legend, Animation} from 'devextreme-react/pie-chart';
import React from 'react';

const App = (props) => {
    const formatText = (arg) => {
        // let value =  (Math.round(arg.value * 100) / 100).toFixed(2)
        let value =  Number(arg.value).toFixed(2)

        return `${arg.argumentText}: ${value} (${arg.percentText})`;
    }

    const pointClickHandler = (arg) => {
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