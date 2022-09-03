import Navbar from "../../../Components/Navbar";
import Card from "../../../Components/Card";
import TableBill from "./TableBill";
import PieChart from '../Dashboard/FixedExpenses'


const Home = () => {

    return (
        <div className="App">
            <Navbar/>

            <div className="row">
                <div className="col-6">
                    <Card>
                        <Card.Header>Gastos Fixos</Card.Header>
                        <Card.Body>
                            <PieChart/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <Card.Header>Gastos VAriáveis</Card.Header>
                        <Card.Body>
                            <PieChart/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;