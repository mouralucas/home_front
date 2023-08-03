import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_CREDIT_CARD_BILL} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalBill from '../Modals/CreditCardBill'
import {getCurrentPeriod} from '../../../../Utils/DateTime'
import {CreditCardBill} from "../../Interfaces";

const App = () => {
    const [creditCardBill, setCreditCardBill] = useState<CreditCardBill[]>();
    const [selectedCreditCardBill, setSelectedCreditCardBill] = useState<CreditCardBill | null>(null)
    const [modalState, setModalState] = useState(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedCreditCardBill(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
        getBills();
    }

    const getBills = () => {
        axios.get(URL_CREDIT_CARD_BILL, {
            params: {'period': getCurrentPeriod()}
        }).then(response => {
                setCreditCardBill(response.data.bill);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    useEffect(() => {
        getBills();
    }, []);

    /**
     * Custom function to show the installments in the table it shows the current installment and the total in the format xx/xx
     * @param cellInfo
     * @returns the installments in xx/xx format
     */
    function installmentCustomCell(cellInfo: any) {
        return cellInfo.installment + '/' + cellInfo.tot_installment;
    }

    function myOtherCommand(e: any) {
        alert('Café');
    }

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            width: 70
        },
        {
            dataField: "reference",
            caption: "Referência",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "credit_card_id",
            visible: false
        },
        {
            dataField: "nm_credit_card",
            caption: "Cartão",
            dataType: "string",
            width: 150,
        },
        {
            dataField: "dat_purchase",
            caption: "Compra",
            dataType: "date",
            format: 'shortDate',
            width: 150,
        },
        {
            dataField: "dat_payment",
            caption: "Pagamento",
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
            dataField: "installment",
            caption: "Parcela",
            dataType: "string",
            calculateCellValue: installmentCustomCell,
            width: 100,
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
            child: <Button icon={'refresh'} onClick={getBills}/>,
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
                data={creditCardBill}
                // toolBarRefresh={false}
                toolBarItems={toolBarItems}
                showLoadPanel={false}
            />
            <ModalBill modalState={modalState} hideModal={hideModal} creditCardBill={selectedCreditCardBill}/>
        </>
    );
}

export default App;