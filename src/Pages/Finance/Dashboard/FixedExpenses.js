import PieChart from "../../../Components/PieChart";


const App = () => {
    const dataSource = [
        {
            country: 'USA',
            medals: 112,
        }, {
            country: 'China',
            medals: 100,
        }, {
            country: 'Russia',
            medals: 60,
        }, {
            country: 'Britain',
            medals: 49,
        }, {
            country: 'Australia',
            medals: 46,
        },
    ]

    return (
        <PieChart data={dataSource}
                  axis={{argumentField: 'country', valueField: 'medals'}}
                  title={'Medalhas'}
        />
    );
}

export default App;