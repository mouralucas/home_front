import Navbar from '../../Components/Navbar'
import Card from "../../Components/Card";
import TableBooks from "./Tables/TableBooks";


const Home = () => {

    return (
        <div className="App">
            <Card>
                <Card.Header>Livros</Card.Header>
                <Card.Body>
                    <TableBooks />
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;