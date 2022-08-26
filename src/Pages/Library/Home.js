import {useEffect, useState} from "react";
import Navbar from '../../Components/Navbar'
import Login from '../Login'
import axios from '../../Services/Axios/Axios'
import {isAuthenticated} from "../../Services/Auth/Auth";
import Card from "../../Components/Card";
import DataGrid from "../../Components/DataGrid";


function Home() {
    const [books, setBooks] = useState();

    useEffect(() => {
        axios.get('/library/ajax/item/teste').then(response => {
            setBooks(response.data.items);
        })
    }, []);


    if (!isAuthenticated()) {
        return <Login/>
    }

    function cellRender(data) {
        return <img src={data.value} alt='ima'/>;
    }


    let colunasTabelaLivro = [
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
            caption: "Pago/Capa",
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

    let colunasTabelaManga = [
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
            caption: "Pago/Capa",
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

            <Card>
                <Card.Header>Livros</Card.Header>
                <Card.Body>
                    <DataGrid tableColumns={colunasTabelaLivro} data={books}/>
                </Card.Body>
            </Card>
            <Card title={'Mangás'} tableColumns={colunasTabelaManga} data={books}/>
        </div>
    );
}

export default Home;