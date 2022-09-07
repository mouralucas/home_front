import DataGrid from "../../../Components/DataGrid";
import React, {useEffect, useState} from "react";
import axios from "../../../Services/Axios/Axios";
import Button from "devextreme-react/button";
import ModalItem from "../Modals/ModalItem";
import {URL_ITEM} from '../../../Services/Axios/ApiUrls'

const Books = () => {
    const [books, setBooks] = useState();

    const getBooks = () => {
        axios.get(URL_ITEM, {
            params: {'item_type': 'book'}
        }).then(response => {
                setBooks(response.data.items);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    useEffect(() => {
        getBooks();
    }, []);


    function updateBooks() {
        getBooks();
    }

    function testeFuncionamento() {
        alert('Deu boa');
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
            width: 150,
        },
        {
            dataField: "volume",
            caption: "Vol.",
            dataType: "number",
            width: 150,
        },
        {
            dataField: "cover_price",
            caption: "Pago/Capa",
            dataType: "number",
            width: 150,
            format: {style: 'currency', currency: 'BRL', useGrouping: true, precision: 2}
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

    let toolBarItems = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={updateBooks}/>,
            location: "after"
        },
        {
            child: <ModalItem/>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <DataGrid
            tableColumns={colunasTabelaLivro}
            data={books}
            tooBarRefresh={false}
            toolBarItems={toolBarItems}
            loadPanel={false}
        />
    );
}

export default Books;