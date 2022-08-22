import {useEffect, useState} from "react";
import Navbar from '../../Components/Navbar'
import Login from '../Login'
import Table from '../../Components/DataGrid'
import axios from '../../Services/Axios/Axios'
import {isAuthenticated} from "../../Services/Auth/Auth";
import Card from "../../Components/Card";


function Home() {
    const [books, setBooks] = useState();

    useEffect(() => {
        axios.get('/library/ajax/item/teste').then(response => {
            console.log(response.data);
            setBooks(response.data.items);
        })
    }, []);


    if (!isAuthenticated()) {
        return <Login/>
    }


    let colunasTabelaItem = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: "title",
            caption: "Título",
            dataType: "string",
            visible: true,
        },
        {
            dataField: "nm_main_author",
            caption: "Autor",
            dataType: "string",
            visible: true,
        },
        {
            dataField: "pages",
            caption: "Paginas",
            dataType: "number",
        },
        {
            dataField: "volume",
            caption: "Vol.",
            dataType: "number",
        },
        {
            dataField: "cover_price",
            caption: "Valor",
            dataType: "currency",
        },
        {
            dataField: "nm_serie",
            caption: "Serie",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "nm_publisher",
            caption: "Editora",
            dataType: "string",
        },
        {
            dataField: "nm_last_status",
            caption: "Status",
            dataType: "string",
        }
    ]

    return (
        <div className="App">
            <Navbar/>

            <Card colunasTabelaItem={colunasTabelaItem} data={books}/>

        </div>
    );
}

export default Home;