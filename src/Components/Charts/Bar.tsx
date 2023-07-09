import React from 'react';
import {
    ArgumentAxis,
    Chart,
    ConstantLine,
    Export,
    Font,
    Label,
    Legend,
    Series,
    Title,
    ValueAxis,
    VisualRange
} from 'devextreme-react/chart';


const App = (props: any) => {
    // TODO: essa função deve vir como props e ter uma validação de existência
    const customizeArgumentText = (e: any) => {
        return `${e.value}`;
    }

    // TODO: essa função deve vir como props e ter uma validação de existência
    const customizeLabel = (arg: any) => {
        if (arg.value > 70000) {
            return {
                visible: true,
                backgroundColor: '#ff7c7c',
                customizeText(e: any) {
                    return `${e.valueText}&#176F`;
                },
            };
        }
        return null;
    }

    const setConstantLine = () => {
        return props.constantLine.map((item: any) =>
            <ConstantLine
                width={item.width}
                value={item.value}
                color={item.color}
                dashStyle={item.dashStyle}
            >
                {item.label && <Label text={item.label.text}/>}
            </ConstantLine>)
    }

    const setValueAxisTitle = () => {
        return <Title text={props.valueAxisConfig.title.value ?? null}>
            {/* Add font if defined in props */}
            {props.valueAxisConfig.title.font
                &&
                <Font color={props.valueAxisConfig.title.font.color ?? "#03a9f4"}/>
            }
        </Title>
    }

    return (
        <Chart id="chart"
               title={props.title ?? "Title"}
               dataSource={props.dataSource}
               customizePoint={props.customizePoint ?? null}
               customizeLabel={customizeLabel}
        >
            <Series
                axis={'amount'}
                argumentField={props.argumentField}
                valueField={props.valueField}
                type="bar"
                color="#e7d19a"
            />
            <ArgumentAxis argumentType={props.argumentAxisConfig.argumentType}>
                <Label customizeText={customizeArgumentText}/>
            </ArgumentAxis>
            <ValueAxis maxValueMargin={props.valueAxisConfig.maxValueMargin ?? 0.01} name={'amount'}>

                <VisualRange startValue={props.valueAxisConfig.visualRange ?? null}/>
                {props.valueAxisConfig && <Label customizeText={props.valueAxisConfig.customizedText}/>}

                {/* Function based props */}
                {props.valueAxisConfig.title && setValueAxisTitle()} {/* Set the valeu axis title if defined */}
                {props.constantLine && setConstantLine()} {/* Set constant lines if defined */}
            </ValueAxis>
            <Legend visible={props.legend ?? false}/>
            <Export enabled={props.export ?? true}/>
        </Chart>
    )
}

export default App;
