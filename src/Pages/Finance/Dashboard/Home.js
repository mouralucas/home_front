import Navbar from "../../../Components/Navbar";
import Card from "../../../Components/Card";
import TableBill from "./TableBill";


const Home = () => {

    return (
        <div className="App">
            <Navbar/>

            <Card>
                <Card.Header>Faturas</Card.Header>
                <Card.Body>
                    <TableBill/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;