import DataGrid from "../../../../Components/Table/DataGrid";
import React, {useEffect, useState} from "react";
import {URL_ITEM} from '../../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/Item";
import {Button} from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";
import {Item} from "../../interfaces";
import {getData} from "../../../../Services/Axios/Get";

const Book = () => {
    const [books, setBooks] = useState<Item[] | null>();
    const [selectedBook, setSelectedBook] = useState<Item | null>(null);
    const [modalState, setModalState] = useState<boolean>(false);

    useEffect(() => {
        getBooks();
    }, []);

    const showModal = (e: any) => {
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
        getData(URL_ITEM, {itemType: 'book'}).then(response => {
                setBooks(response.items);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    let colunasTabelaLivro = [
        {
            dataField: "itemId",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: "title",
            caption: "Título",
            dataType: "string",
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
                toolBarItems={toolBarItems}
                showLoadPanel={false}
            />
            <ModalItem modalState={modalState} hideModalItem={hideModalItem} item={selectedBook}/>
        </>
    );
}

export default Book;