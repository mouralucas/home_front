import React, {useEffect, useState} from "react";
import {URL_ITEM_COLLECTION} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/Table/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalPublisher from '../Modals/Publisher'
import {getData, getLibraryData} from "../../../../Services/Axios/Get";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";
import {Collection} from "../../interfaces";

interface GetCollectionResponse {
    quantity: number;
    collections: Collection[];
}

const App = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState()
    const [modalState, setModalState] = useState(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedAuthor(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    const getCollection = () => {
        getLibraryData(URL_ITEM_COLLECTION).then((response: GetCollectionResponse) => {
            setCollections(response?.collections)
        });
    }

    useEffect(() => {
        getCollection();
    }, []);

    function myOtherCommand(e: any) {
        alert('Café');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "collectionId",
            caption: "Id",
            dataType: "number",
            width: 70,
        },
        {
            dataField: "collectionName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "description",
            caption: "Descrição",
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
                    key={2}
                    //icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="My Command"
                    onClick={myOtherCommand}
                />]
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
            child: <Button icon={'refresh'} onClick={getCollection}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showModal}></Button>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <>
            <DataGrid
                keyExpr={'collectionId'}
                columns={columns}
                data={collections}
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
            />
            <ModalPublisher modalState={modalState} hideModal={hideModal} collection={selectedAuthor}/>
        </>
    );
}

export default App;