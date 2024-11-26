import DataGrid from "../../../../Components/Table/DataGrid";
import React, {useEffect, useState} from "react";
import {URL_ITEM} from '../../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/ModalItem";
import {Button} from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";
import {Item} from "../../interfaces";
import {getLibraryData} from "../../../../Services/Axios/Get";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";
import {toast} from "react-toastify";

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
        getLibraryData(URL_ITEM, {itemType: 'book'}).then(response => {
                setBooks(response.items);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    const coffeeCommand = (e: any) => {
        toast('🦄 Cafezinho delícia!');
    }

    let columns: DataGridColumn[] = [
        {
            dataField: "itemId",
            caption: "Id",
            dataType: "number",
            visible: true,
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
            dataField: "itemFormat",
            caption: "Formato",
            dataType: "string"
        },
        {
            dataField: "serieName",
            caption: "Serie",
            dataType: "string",
            visible: true,
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
                <Btn
                    // text="My Command"
                    // // icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="My Command"
                    onClick={coffeeCommand}
                />
            ]
        }
    ]

    let toolBarItems: DataGridToolBarItem[] = [
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
                columns={columns}
                data={books}
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
                searchPanel={{
                    visible: true
                }}
            />
            <ModalItem modalState={modalState} hideModalItem={hideModalItem} item={selectedBook}/>
        </>
    );
}

export default Book;