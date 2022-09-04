import Card from '../../../Components/Card'
import LineChart from "../../../Components/Charts/LineChart";
import Table from '../Dashboard/Tables/TableBill'

const App = () => {
    return (
        <div className="App">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>Faturas</Card.Header>
                        <Card.Body>
                            <Table />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default App;