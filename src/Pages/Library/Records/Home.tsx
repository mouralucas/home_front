import Card from "../../../Components/Card";
import TableBook from "./Tables/Book";
import TableManga from "./Tables/Manga";
import React, {useEffect} from "react";


const Home = () => {
    useEffect(() => {
        document.title = 'Biblioteca';
    }, [])

    return (
        <div className='container'>
            <div className="App">
                <div className="row">
                    <Card>
                        <Card.Header>Livros</Card.Header>
                        <Card.Body>
                            <TableBook/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="row">
                    <Card>
                        <Card.Header>Mangás</Card.Header>
                        <Card.Body>
                            <TableManga/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;