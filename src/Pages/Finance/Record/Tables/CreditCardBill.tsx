import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_CREDIT_CARD_BILL} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/Table/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalBill from '../Modals/CreditCardBillBeta'
import {getCurrentPeriod} from '../../../../Utils/DateTime'
import {CreditCardBill} from "../../Interfaces";
import {toast} from "react-toastify";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";

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
        //TODO: trocar para getData
        axios.get(URL_CREDIT_CARD_BILL, {
            params: {'period': getCurrentPeriod()}
        }).then(response => {
                setCreditCardBill(response.data.bill);
            }
        ).catch(response => {
            toast.error("Erro ao buscar faturas")
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
        return cellInfo.installment + '/' + cellInfo.totalInstallment;
    }

    function amountCustomCell(cellInfo: any) {
        const formattedAmount = cellInfo.amount.toFixed(2)

        return cellInfo.currencyReferenceSymbol + ' ' + formattedAmount;
    }

    function myOtherCommand(e: any) {
        alert('Café');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            width: 70
        },
        {
            dataField: "period",
            caption: "Período",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "creditCardId",
            visible: false
        },
        {
            dataField: "creditCardName",
            caption: "Cartão",
            dataType: "string",
            width: 150,
        },
        {
            dataField: "purchaseAt",
            caption: "Compra",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 150,
        },
        {
            dataField: "paymentAt",
            caption: "Pagamento",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 150,
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            calculateCellValue: amountCustomCell,
            alignment: 'justify',
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
            dataField: "categoryName",
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
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
                searchPanel={{
                    visible: true
                }}
            />
            <ModalBill modalState={modalState} hideModal={hideModal} creditCardBill={selectedCreditCardBill}/>
        </>
    );
}

export default App;