import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import {Chart, Series, ArgumentAxis, CommonSeriesSettings, Export, Legend, Margin, Title, Subtitle, Tooltip, Grid,} from 'devextreme-react/chart';

const types = ['line', 'stackedline', 'fullstackedline'];

const energySources = [
    {value: 'hydro', name: 'Hydro-electric'},
    {value: 'oil', name: 'Oil'},
    {value: 'gas', name: 'Natural gas'},
    {value: 'coal', name: 'Coal'},
    {value: 'nuclear', name: 'Nuclear'},
];

const countriesInfo = [
    {
        country: 'USA',
        hydro: 59.8,
        oil: 937.6,
        gas: 582,
        coal: 564.3,
        nuclear: 187.9,
    }, {
        country: 'China',
        hydro: 74.2,
        oil: 308.6,
        gas: 35.1,
        coal: 956.9,
        nuclear: 11.3,
    }, {
        country: 'Russia',
        hydro: 40,
        oil: 128.5,
        gas: 361.8,
        coal: 105,
        nuclear: 32.4,
    }, {
        country: 'Japan',
        hydro: 22.6,
        oil: 241.5,
        gas: 64.9,
        coal: 120.8,
        nuclear: 64.8,
    }, {
        country: 'India',
        hydro: 19,
        oil: 119.3,
        gas: 28.9,
        coal: 204.8,
        nuclear: 3.8,
    }, {
        country: 'Germany',
        hydro: 6.1,
        oil: 123.6,
        gas: 77.3,
        coal: 85.7,
        nuclear: 37.8,
    }];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'line',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Chart
                    palette="Violet"
                    dataSource={countriesInfo}
                >
                    <CommonSeriesSettings
                        argumentField="country"
                        type={this.state.type}
                    />
                    {
                        energySources.map((item) => <Series
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
                    <Title text="Energy Consumption in 2004">
                        <Subtitle text="(Millions of Tons, Oil Equivalent)"/>
                    </Title>
                    <Tooltip enabled={true}/>
                </Chart>
                <div className="options">
                    <div className="caption">Options</div>
                    <div className="option">
                        <span>Series Type </span>
                        <SelectBox
                            dataSource={types}
                            value={this.state.type}
                            onValueChanged={this.handleChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleChange(e) {
        this.setState({type: e.value});
    }
}

export default App;
