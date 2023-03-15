import PieChart, {Series, Label, Margin, Export, Legend, Animation} from 'devextreme-react/pie-chart';
import React from 'react';

const App = (props) => {
    function formatText(arg) {
        return `${arg.argumentText} (${arg.percentText})`;
    }
    return (
        <PieChart
            id="pie"
            dataSource={props.data}
            palette={props.pallete ?? "Bright"}
            title={props.title}
            resolveLabelOverlapping={'shift'}
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