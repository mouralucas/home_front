import React, {useEffect, useState} from "react";
import {URL_ITEM_COLLECTION, URL_ITEM_SERIE, URL_PUBLISHER} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalPublisher from '../Modals/Publisher'
import {getData} from "../../../../Services/Axios/Get";

const App = () => {
    const [collection, setCollection] = useState();
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

    const getAuthor = () => {
        getData(URL_ITEM_COLLECTION).then(response => {
            setCollection(response?.collections)
        });
    }

    useEffect(() => {
        getAuthor();
    }, []);

    function myOtherCommand(e: any) {
        alert('Café');
    }

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            width: 70,
        },
        {
            dataField: "name",
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
            child: <Button icon={'refresh'} onClick={getAuthor}/>,
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
                keyExpr={'id'}
                tableColumns={columns}
                data={collection}
                toolBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
            />
            <ModalPublisher modalState={modalState} hideModal={hideModal} collection={selectedAuthor}/>
        </>
    );
}

export default App;