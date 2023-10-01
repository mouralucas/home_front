import React from 'react';
import {ArgumentAxis, Chart, ConstantLine, Export, Font, Label, Legend, Series, Title, ValueAxis} from 'devextreme-react/chart';

interface BarProps {
    data: any[]
    argumentField: string
    valueField: string
    title: string
    axis?: string
    name?: any
    palette?: string[]
    customizePoint?: any
    customizeLabel?: any
    legend?: boolean
    export?: boolean
    seriesLabel?: {
        visible: boolean
        customizeText?: any
    }
    argumentAxis?: {
        argumentType?: string
        label?: {
            customizeText?: any
        }
    }
    valueAxis?: {
        maxValueMargin?: number
        name?: string
        label?: {
            customizeText?: any
        }
        title?: {
            text?: string
            font?: {
                color: string
            }
        }
        constantLine?: Array<{
            value: any,
            width?: number,
            color?: string
            dashStyle?: string
            label?: {
                text: string
            }
        }>
    }
}

const App = (props: BarProps) => {
    const setConstantLine = () => {
        return props.valueAxis?.constantLine?.map((item: any) =>
            <ConstantLine
                width={item.width ?? undefined}
                value={item.value}
                color={item.color ?? undefined}
                dashStyle={item.dashStyle ?? undefined}
            >
                {item.label && <Label text={item.label.text}/>}
            </ConstantLine>)
    }

    return (
        <Chart id="chart"
               title={props.title}
               dataSource={props.data}
               palette={props.palette ?? 'Pastel'}
               customizePoint={props.customizePoint}
               customizeLabel={props.customizeLabel}
        >
            <Series
                valueField={props.valueField}
                argumentField={props.argumentField}
                axis={props.axis}
                name={props.name ?? undefined}
                type="bar"
                color="#ffaa66"
            >
                {props.seriesLabel &&
                    <Label visible={props.seriesLabel.visible}></Label>
                }
            </Series>
            {props.argumentAxis &&
                <ArgumentAxis argumentType={props.argumentAxis?.argumentType || undefined}>
                    {props.argumentAxis.label &&
                        <Label customizeText={props.argumentAxis.label?.customizeText}/>
                    }
                </ArgumentAxis>
            }
            {props.valueAxis &&
                <ValueAxis maxValueMargin={props.valueAxis?.maxValueMargin ?? undefined} name={props.name ?? undefined}>
                    {props.valueAxis.label &&
                        <Label customizeText={props.valueAxis?.label?.customizeText || undefined}></Label>
                    }
                    {props.valueAxis.title &&
                        <Title text={props.valueAxis.title.text ?? undefined}>
                            <Font color={props.valueAxis?.title?.font?.color ?? undefined}/>
                        </Title>
                    }
                    {props.valueAxis.constantLine &&
                        setConstantLine()
                    }
                </ValueAxis>
            }
            <Legend visible={props.legend ?? false}></Legend>
            <Export enabled={props.export ?? false}/>
        </Chart>
    )
}

export default App;
