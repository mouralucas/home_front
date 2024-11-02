import React, {useEffect, useState} from "react";
import {URL_CREDIT_CARD_TRANSACTION} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/Table/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalBill from '../Modals/CreditCardTransactionBeta_2'
import {CreditCardTransaction} from "../../Interfaces";
import {toast} from "react-toastify";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";
import {getFinanceData} from "../../../../Services/Axios/Get";


interface TransactionResponse {
    success: boolean
    quantity: number
    transactions: CreditCardTransaction[]
}

const App = () => {
    const [creditCardTransaction, setCreditCardTransaction] = useState<CreditCardTransaction[]>();
    const [selectedCreditCardTransaction, setSelectedCreditCardTransaction] = useState<CreditCardTransaction | null>(null)
    const [modalState, setModalState] = useState(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedCreditCardTransaction(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
        getTransactions();
    }

    const getTransactions = () => {
        getFinanceData(URL_CREDIT_CARD_TRANSACTION, {
            startPeriod: 202401,
            endPeriod: 202412
        }).then((response: TransactionResponse) => {
            setCreditCardTransaction(response.transactions);
        }).catch(response => {
            toast.error("Erro ao buscar transações")
            return {'error': response}
        })
    }

    useEffect(() => {
        getTransactions();
    }, []);

    /**
     * Custom function to show the installments in the table it shows the current installment and the total in the format xx/xx
     * @param cellInfo
     * @returns the installments in xx/xx format
     */
    function installmentCustomCell(cellInfo: any) {
        return cellInfo.currentInstallment + '/' + cellInfo.installments;
    }

    function amountCustomCell(cellInfo: any) {
        const formattedAmount = cellInfo.amount.toFixed(2)

        return cellInfo.currencySymbol + ' ' + formattedAmount;
    }

    const coffeeCommand = (e: any) => {
        toast('🦄 Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "transactionId",
            caption: "Id",
            dataType: "number",
            visible: false,
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
            dataField: "creditCardNickname",
            caption: "Cartão",
            dataType: "string",
            width: 150,
        },
        {
            dataField: "transactionDate",
            caption: "Compra",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 150,
        },
        {
            dataField: "dueDate",
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
                    hint="Coffee"
                    onClick={coffeeCommand}
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
            child: <Button icon={'refresh'} onClick={getTransactions}/>,
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
                keyExpr={'transactionId'}
                columns={columns}
                data={creditCardTransaction}
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
                searchPanel={{
                    visible: true
                }}
            />
            <ModalBill modalState={modalState} hideModal={hideModal} creditCardBill={selectedCreditCardTransaction}/>
        </>
    );
}

export default App;