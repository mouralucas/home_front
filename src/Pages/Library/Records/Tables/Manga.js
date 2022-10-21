import DataGrid from "../../../../Components/DataGrid";
import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_ITEM} from '../../../../Services/Axios/ApiUrls'
import ModalItem from "../Modals/ModalItem";
import {Button} from "devextreme-react/button";

const Manga = () => {
    const [mangas, setMangas] = useState();
    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        getMangas();
    }, []);

    const showModalItem = () => {
        setModalState(true);
    }

    const hideModalItem = () => {
        setModalState(false);
    }

    const getMangas = () => {
        axios.get(URL_ITEM, {
            params: {'item_type': 'manga'}
        }).then(response => {
                setMangas(response.data.items);
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
            width: 50,
        },
        {
            dataField: "nm_main_author",
            caption: "Autor",
            dataType: "string",
        },
        {
            dataField: "title",
            caption: "Título",
            dataType: "string",
        },
        {
            dataField: "nm_serie",
            caption: "Serie",
            dataType: "string",
            groupIndex: 0,
        },
        {
            dataField: "nm_collection",
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
            dataField: "pages",
            caption: "Paginas",
            dataType: "number",
            width: 150,
            visible: false
        },
        {
            dataField: "cover_price",
            caption: "Pago/Capa",
            dataType: "number",
            width: 150,
            format: {style: 'currency', currency: 'BRL', useGrouping: true, precision: 2},
            visible: false,
        },
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
            child: <Button icon={'add'} onClick={showModalItem}></Button>,
            location: "after",
            locateInMenu: 'auto'
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]


    function updateBooks() {
        getMangas();
    }

    return (
        <>
            <DataGrid
                keyExpr={'id'}
                tableColumns={colunasTabelaLivro}
                data={mangas}
                tooBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}

            />
            <ModalItem modalState={modalState} hideModalItem={hideModalItem}/>
        </>
    );
}

export default Manga;