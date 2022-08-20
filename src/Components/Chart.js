import React from 'react';

import Chart, {
    ArgumentAxis,
    Series,
    Legend
} from 'devextreme-react/chart';

const data = [{
    arg: 1990,
    val: 5320816667
}, {
    arg: 2000,
    val: 6127700428
}, {
    arg: 2010,
    val: 6916183482
}];

class MyChart extends React.Component {
    render() {
        return (
            <Chart dataSource={data}>
                <ArgumentAxis tickInterval={10} />
                <Series type="bar" />
                <Legend visible={false} />
            </Chart>
        );
    }
}

export default MyChart;