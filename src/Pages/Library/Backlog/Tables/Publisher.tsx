import React, {useEffect, useState} from "react";
import {URL_PUBLISHER} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/Table/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalPublisher from '../Modals/Publisher'
import {getLibraryData} from "../../../../Services/Axios/Get";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";
import {Publisher} from "../../interfaces";

interface GetPublisherResponse {
    quantity: number;
    publishers: Publisher[];
}

const App = () => {
    const [publisher, setPublisher] = useState<Publisher[]>([]);

    const [selectedPublisher, setSelectedPublisher] = useState()
    const [modalState, setModalState] = useState(false)

    const showModal = (e: any) => {
        const row_state = typeof e.row === 'undefined' ? null : e.row.data
        setSelectedPublisher(row_state);
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    const getAuthor = () => {
        getLibraryData(URL_PUBLISHER).then((response: GetPublisherResponse) => {
            setPublisher(response?.publishers)
        });
    }

    useEffect(() => {
        getAuthor();
    }, []);

    function myOtherCommand(e: any) {
        alert('Café');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "publisherId",
            caption: "Id",
            dataType: "number",
            width: 70,
        },
        {
            dataField: "publisherName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
            format: 'shortDate',
        },
        {
            dataField: "country_name",
            caption: "Pais",
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
                keyExpr={'publisherId'}
                columns={columns}
                data={publisher}
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
            />
            <ModalPublisher modalState={modalState} hideModal={hideModal} publisher={selectedPublisher}/>
        </>
    );
}

export default App;