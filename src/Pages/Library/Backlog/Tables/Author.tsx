import React, {useEffect, useState} from "react";
import {URL_AUTHOR} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/Table/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalAuthor from '../Modals/Author'
import {getData} from "../../../../Services/Axios/Get";
import {toast} from "react-toastify";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";

const App = () => {
    const [author, setAuthor] = useState();
    // TODO: ver vídeo sobre uso de states desnecessários
    const [selectedAuthor, setSelectedAuthor] = useState()
    const [modalState, setModalState] = useState(false)

    const showModal = (e: any) => {
        const row_state = typeof e.row === 'undefined' ? null : e.row.data
        setSelectedAuthor(row_state);
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    const getAuthor = () => {
        getData(URL_AUTHOR).then(response => {
            setAuthor(response?.authors)
        }).catch(err => {
            toast.error('Não foi possível buscar a lista de autores')
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
            dataField: "id",
            caption: "Id",
            dataType: "number",
            width: 150,
        },
        {
            dataField: "authorName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "birthDate",
            caption: "Nascimento",
            dataType: "date",
            format: 'shortDate',
        },
        {
            dataField: "countryName",
            caption: "Pais",
            dataType: "string",
        },
        {
            dataField: "languageName",
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
                keyExpr={'id'}
                columns={columns}
                data={author}
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
            />
            <ModalAuthor modalState={modalState} hideModal={hideModal} author={selectedAuthor}/>
        </>
    );
}

export default App;