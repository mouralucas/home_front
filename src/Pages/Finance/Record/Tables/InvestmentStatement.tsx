import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_CREDIT_CARD_BILL} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalInvestmentStatement from '../Modals/InvestmentStatement'

const App = () => {
    const [bills, setBills] = useState();
    const [selectedBill, setSelectedBill] = useState()
    const [modalState, setModalState] = useState(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedBill(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    const getInvestmentStatement = () => {
        axios.get(URL_CREDIT_CARD_BILL, {
            params: {'reference': 202209}
        }).then(response => {
                setBills(response.data.bill);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    useEffect(() => {
        getInvestmentStatement();
    }, []);


    function myOtherCommand(e: any) {
        alert('Café');
    }

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            width: 100
        },
        {
            dataField: "reference",
            caption: "Referência",
            dataType: "string",
        },
        {
            dataField: "nm_investment",
            caption: "Investimento",
            dataType: "string",
        },
        {
            dataField: "dat_investment",
            caption: "Compra",
            dataType: "date",
            format: 'shortDate',
            width: 150,
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
            child: <Button icon={'refresh'} onClick={getInvestmentStatement}/>,
            location: "after"
        },
        {
            child: <Button text={'Adicionar Fatura'} icon={'add'} onClick={showModal}></Button>,
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
                data={bills}
                // toolBarRefresh={false}
                toolBarItems={toolBarItems}
                showLoadPanel={false}
            />
            <ModalInvestmentStatement modalState={modalState} hideModal={hideModal} bill={selectedBill}/>
        </>
    );
}

export default App;