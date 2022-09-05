import Navbar from "../../../Components/Navbar";
import Card from "../../../Components/Card";
import TableBill from "../Record/Tables/CreditCardBill";
import PieChartFixedExpenses from './Charts/FixedExpenses'
import PieChartVariableExpenses from './Charts/VariableExpenses'
import LineChart from '../../../Components/Charts/LineChart'


const Home = () => {

    return (
        <div className="App">
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-sm-12">
                    <Card>
                        <Card.Header>Despesas Fixas</Card.Header>
                        <Card.Body>
                            <PieChartFixedExpenses/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-xl-6 col-lg-6 col-sm-12">
                    <Card>
                        <Card.Header>Despesas Variáveis</Card.Header>
                        <Card.Body>
                            <PieChartVariableExpenses/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>Evolução</Card.Header>
                        <Card.Body>
                            <LineChart/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;