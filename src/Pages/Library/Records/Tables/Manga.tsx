import DataGrid from "../../../../Components/Table/DataGrid";
import React, {useEffect, useState} from "react";
import {URL_ITEM} from '../../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/ModalItem";
import {Button} from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";
import {getLibraryData} from "../../../../Services/Axios/Get";
import {Item} from "../../interfaces";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";
import {toast} from "react-toastify";

const Manga = () => {
    const [mangas, setManga] = useState<Item[] | null>();
    const [selectedManga, setSelectedManga] = useState<Item | null>();
    const [modalState, setModalState] = useState<boolean>(false)

    useEffect(() => {
        getMangas();
    }, []);

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedManga(e.row.data);
        } else {
            setSelectedManga(null);
        }
        setModalState(true);
    }

    const hideModalItem = () => {
        setModalState(false);
        getMangas();
    }

    const getMangas = () => {
        getLibraryData(URL_ITEM, {itemType: 'manga'}).then(response => {
                setManga(response.items);
            }
        ).catch(response => {
            return {'error': response}
        });
    }

    const coffeeCommand = (e: any) => {
        toast('🦄 Cafezinho delícia!');
    }

    let columns: DataGridColumn[] = [
        {
            dataField: "itemId",
            caption: "Id",
            dataType: "number",
            width: 50,
        },
        {
            dataField: "mainAuthorName",
            caption: "Autor",
            dataType: "string",
        },
        {
            dataField: "title",
            caption: "Título",
            dataType: "string",
        },
        {
            dataField: "serieName",
            caption: "Serie",
            dataType: "string",
            groupIndex: 0,
        },
        {
            dataField: "collectionName",
            caption: "Coleção",
            dataType: "string"
        },
        {
            dataField: "volume",
            caption: "Vol.",
            dataType: "number",
            width: 150,
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
            dataField: "pages",
            caption: "Paginas",
            dataType: "number",
            width: 150,
            visible: false
        },
        {
            dataField: "coverPrice",
            caption: "Pago/Capa",
            dataType: "number",
            width: 150,
            format: {style: 'currency', currency: 'BRL', useGrouping: true, precision: 2},
            visible: true,
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
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={getMangas}/>,
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
                data={mangas}
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
                paging={20}
                searchPanel={{
                    visible: true
                }}
            />
            <ModalItem modalState={modalState} hideModalItem={hideModalItem} item={selectedManga}/>
        </>
    );
}

export default Manga;