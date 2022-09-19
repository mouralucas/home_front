import Card from "../../Components/Card";
import DataGrid from "./Tables/Books";
import {useState} from "react";


const Home = () => {
    return (
        <div className="App">
            <Card>
                <Card.Header>Livros</Card.Header>
                <Card.Body>
                    <DataGrid />
                </Card.Body>
            </Card>
        </div>
    );
}

export default Home;