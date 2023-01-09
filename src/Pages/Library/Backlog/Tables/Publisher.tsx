import React, {useEffect, useState} from "react";
import {URL_PUBLISHER} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalPublisher from '../Modals/Publisher'
import {getData} from "../../../../Services/Axios/Get";

const App = () => {
    const [publisher, setPublisher] = useState();
    const [selectedPublisher, setSelectedPublisher] = useState()
    const [modalState, setModalState] = useState(false)

    const showModal = (e) => {
        const row_state = typeof e.row === 'undefined' ? null : e.row.data
        setSelectedPublisher(row_state);
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    const getAuthor = () => {
        getData(URL_PUBLISHER).then(response => {
            setPublisher(response?.publishers)
        });
    }

    useEffect(() => {
        getAuthor();
    }, []);

    function myOtherCommand(e) {
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
            format: 'shortDate',
        },
        {
            dataField: "nm_country",
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
                data={publisher}
                toolBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
            />
            <ModalPublisher modalState={modalState} hideModal={hideModal} publisher={selectedPublisher}/>
        </>
    );
}

export default App;