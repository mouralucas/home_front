import Card from "../../../Components/Card";
import TableBook from "./Tables/Book";
import TableManga from "./Tables/Manga";
import {useEffect} from "react";


const Home = () => {
    useEffect(() => {
        document.title = 'Biblioteca';
    }, [])

    return (
        <div className="App">
            <Card>
                <Card.Header>Livros</Card.Header>
                <Card.Body>
                    <TableBook />
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Mangás</Card.Header>
                <Card.Body>
                    <TableManga />
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;