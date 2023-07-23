import DataGrid from "../../../../Components/DataGrid";
import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_ITEM} from '../../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/ModalItem";
import {Button} from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";

const Manga = () => {
    const [mangas, setMangas] = useState();
    const [selectedManga, setSelectedManga] = useState();
    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        getMangas();
    }, []);

    const showModal = (e) => {
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
        axios.get(URL_ITEM, {
            params: {'itemType': 'manga'}
        }).then(response => {
                setMangas(response.data.items);
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
            visible: false,
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
                columns={colunasTabelaLivro}
                data={mangas}
                tooBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
                paging={20}

            />
            <ModalItem modalState={modalState} hideModalItem={hideModalItem} item={selectedManga}/>
        </>
    );
}

export default Manga;