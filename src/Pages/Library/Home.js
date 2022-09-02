import {useEffect, useState} from "react";
import Navbar from '../../Components/Navbar'
import Login from '../Login'
import axios from '../../Services/Axios/Axios'
import {isAuthenticated} from "../../Services/Auth/Auth";
import Card from "../../Components/Card";
import DataGrid from "../../Components/DataGrid";
import Modal from './ModalItem'
import TableBooks from "./TableBooks";


function Home() {

    return (
        <div className="App">
            <Navbar/>

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