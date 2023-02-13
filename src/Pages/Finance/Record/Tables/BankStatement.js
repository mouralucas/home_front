import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_ACCOUNT_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import Button from "devextreme-react/button";
import ModalStatement from '../Modals/BankStatement'
import {Button as Btn} from "devextreme-react/data-grid";
import {toast} from "react-toastify";


const App = () => {
    const [statement, setStatement] = useState();
    const [selectedStatement, setSelectedStatement] = useState()
    const [modalState, setModalState] = useState(false)

    const showModal = (e) => {
        if (typeof e.row !== 'undefined') {
            setSelectedStatement(e.row.data);
        } else {
            setSelectedStatement(null);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
        getStatements();
    }

    const getStatements = () => {
        axios.get(URL_ACCOUNT_STATEMENT, {
            params: {'reference': 202210}
        }).then(response => {
                setStatement(response.data.statement);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    useEffect(() => {
        getStatements();
    }, []);

    const coffeeCommand = (e) => {
        toast('🦄 Wow so easy!');
    }

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
        },
        {
            dataField: "nm_account",
            caption: "Conta",
            dataType: "string",
        },
        {
            dataField: "dat_purchase",
            caption: "Compra",
            dataType: "date",
            width: 150,
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            width: 110,
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
        },
        {
            dataField: "nm_category",
            caption: "Categoria",
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
                    hint="Coffee"
                    onClick={coffeeCommand}
                />
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
            child: <Button icon='refresh' onClick={getStatements}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showModal}></Button>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={coffeeCommand}>T</Button>,
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
                data={statement}
                toolBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
            />
            <ModalStatement modalState={modalState} hideModal={hideModal} statement={selectedStatement}/>
        </>
    );
}

export default App;