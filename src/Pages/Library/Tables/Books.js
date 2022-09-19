import DataGrid from "../../../Components/DataGrid";
import React, {useEffect, useState} from "react";
import axios from "../../../Services/Axios/Axios";
import {URL_ITEM} from '../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/ModalItem";
import {Button as Btn} from "devextreme-react/button";

const Books = () => {
    const [books, setBooks] = useState();
    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        getBooks();
    }, []);

    const showModalItem = () => {
        setModalState(true);
    }

    const hideModalItem = () => {
        setModalState(false);
    }


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
            child: <Btn text={'Adicionar Item'} icon={'add'} onClick={showModalItem}></Btn>,
            location: "after",
            locateInMenu: 'auto'
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]


    function updateBooks() {
        getBooks();
    }

    return (
        <>
            <DataGrid
                keyExpr={'id'}
                tableColumns={colunasTabelaLivro}
                data={books}
                tooBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}

            />
            <ModalItem modalState={modalState} hideModalItem={hideModalItem}/>
        </>
    );
}

export default Books;