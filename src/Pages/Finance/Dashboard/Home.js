import Navbar from "../../../Components/Navbar";
import Card from "../../../Components/Card";
import TableBill from "./TableBill";
import PieChartFixedExpenses from '../Dashboard/FixedExpenses'
import PieChartVariableExpenses from '../Dashboard/VariableExpenses'


const Home = () => {

    return (
        <div className="App">
            <Navbar/>

            <div className="row">
                <div className="col-6">
                    <Card>
                        <Card.Header>Despesas Fixas</Card.Header>
                        <Card.Body>
                            <PieChartFixedExpenses/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <Card.Header>Despesas Variáveis</Card.Header>
                        <Card.Body>
                            <PieChartVariableExpenses/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;