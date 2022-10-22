import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_AUTHORS, URL_BILLS, URL_LANGUAGE} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalAuthor from '../Modals/Author'
import {getData} from "../../../../Services/Axios/Get";

const App = () => {
    const [author, setAuthor] = useState();
    const [selectedBill, setSelectedBill] = useState()
    const [modalState, setModalState] = useState(false)

    const showModal = (e) => {
        if (typeof e.row !== 'undefined') {
            setSelectedBill(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    const getAuthor = () => {
        getData(URL_AUTHORS).then(response => {
            setAuthor(response?.authors)
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
            width: 150,
        },
        {
            dataField: "nm_full",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "dat_birth",
            caption: "Nascimento",
            dataType: "date",
            format: 'shortDate',
        },
        {
            dataField: "nm_country",
            caption: "Pais",
            dataType: "string",
        },
        {
            dataField: "nm_language",
            caption: "Idioma",
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
                data={author}
                toolBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
            />
            <ModalAuthor modalState={modalState} hideModal={hideModal} bill={selectedBill}/>
        </>
    );
}

export default App;