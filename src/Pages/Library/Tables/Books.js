import DataGrid from "../../../Components/DataGrid";
import React, {useEffect, useState} from "react";
import axios from "../../../Services/Axios/Axios";
import {URL_ITEM} from '../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/ModalItem";

const Books = () => {
    const [books, setBooks] = useState();
    const [bookModalState, setBookModalState] = useState(false)



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
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            child: <ModalItem/>,
            location: "after",
            locateInMenu: 'auto'
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <DataGrid
            keyExpr={'id'}
            tableColumns={colunasTabelaLivro}
            data={books}
            tooBarRefresh={false}
            toolBarItems={toolBarItems}
            loadPanel={false}

        />
    );
}

export default Books;