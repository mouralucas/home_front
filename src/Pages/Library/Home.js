import Card from "../../Components/Card";
import Books from "./Tables/Books";


const Home = () => {

    return (
        <div className="App">
            <Card>
                <Card.Header>Livros</Card.Header>
                <Card.Body>
                    <Books />
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;