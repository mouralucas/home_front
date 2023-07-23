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
        getBooks();
    }

    const getBooks = () => {
        axios.get(URL_ITEM, {
            params: {'itemType': 'book'}
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
            dataField: "mainAuthorName",
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
            dataField: "itemType",
            caption: "Tipo",
            dataType: "string",
            width: 150,
        },
        {
          dataField: "itemFormatId",
          caption: "Formato",
          dataType: "string"
        },
        {
            dataField: "serieName",
            caption: "Serie",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "publisherName",
            caption: "Editora",
            dataType: "string",
        },
        {
            dataField: "lastStatusName",
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
            ]
        }
    ]

    let toolBarItems = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={getBooks}/>,
            location: "after"
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

    return (
        <>
            <DataGrid
                keyExpr={'itemId'}
                columns={colunasTabelaLivro}
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