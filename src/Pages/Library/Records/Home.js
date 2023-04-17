import Card from "../../../Components/Card";
import TableBook from "./Tables/Book";
import TableManga from "./Tables/Manga";
import React, {useEffect} from "react";
import Sidebar from "../../../Components/Sidebar/Base";


const Home = () => {
    useEffect(() => {
        document.title = 'Biblioteca';
    }, [])

    return (
        <div className='page-with-menu'>
            <div className="App">
                <Card>
                    <Card.Header>Livros</Card.Header>
                    <Card.Body>
                        <TableBook/>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Mangás</Card.Header>
                    <Card.Body>
                        <TableManga/>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Home;