import DataGrid from "../../../../Components/DataGrid";
import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_ITEM} from '../../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/ModalItem";
import {Button} from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";

const Book = () => {
    const [books, setBooks] = useState();
    const [selectedBook, setSelectedBook] = useState();
    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        getBooks();
    }, []);

    const showModal = (e) => {
        if (typeof e.row !== 'undefined') {
            setSelectedBook(e.row.data);
        } else {
            setSelectedBook(null);
        }
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
        },
        {
            caption: 'Ações',
            type: 'buttons',
            width: 110,
            child: [
                <Btn
                    key={1}
                    text="Editar"
                    // icon="/url/to/my/icon.ico"
                    icon="edit"
                    hint="Editar"
                    onClick={showModal}
                />,
                // <Btn
                //     // text="My Command"
                //     // // icon="/url/to/my/icon.ico"
                //     icon="coffee"
                //     hint="My Command"
                //     onClick={myOtherCommand}
                // />
            ]
        }
    ]

    let toolBarItems = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            child: <Button icon={'add'} onClick={showModal}></Button>,
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
            <ModalItem modalState={modalState} hideModalItem={hideModalItem} item={selectedBook}/>
        </>
    );
}

export default Book;