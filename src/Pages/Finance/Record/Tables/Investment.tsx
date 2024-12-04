import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {URL_INVESTMENT} from "../../../../Services/Axios/ApiUrls";
import {getFinanceData} from "../../../../Services/Axios/Get";
import Button from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";
import ModalInvestment from '../Modals/Investment';
import {Investment} from "../../Interfaces";
import {DataGridColumn} from "../../../../Assets/Core/Components/Interfaces";
import DataGrid from "../../../../Components/Table/DataGrid";

interface InvestmentResponse {
    success: boolean
    quantity: number
    investments: Investment[]
}

const App = () => {
    const [investment, setInvestment] = useState<Investment[]>([])
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | undefined>()
    const [modalState, setModalState] = useState<boolean>(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
        setSelectedInvestment(undefined);
        getInvestment();
    }

    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = () => {
        getFinanceData(URL_INVESTMENT).then((response: InvestmentResponse) => {
            setInvestment(response.investments);
        }).catch(err => {
            toast.error(err)
        })
    }

    function amountCustomCell(cellInfo: any) {
        let amount = parseFloat(cellInfo.amount);
        return cellInfo.currencySymbol + ' ' + amount;
    }

    function grossAmountCustomCell(cellInfo: any) {
        let currentSymbol: string = cellInfo.currencySymbol;
        let grossAmount: number = parseFloat(cellInfo.grossAmount);
        let percentageChange: number = parseFloat(cellInfo.percentageChange);
        let formated_string: string = `${currentSymbol} ${grossAmount} (${percentageChange}%)`
        return formated_string;
    }


    const coffeeCommand = (e: any) => {
        toast('🦄 Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "investmentId",
            caption: "Id",
            dataType: "string",
            width: 70,
            visible: false
        },
        {
            dataField: "period",
            caption: "Referência",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "name",
            caption: "Nome",
            dataType: "string",
            alignment: 'left',
            width: 400,
        },
        {
            dataField: "transactionDate",
            caption: "Data",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 130
        },
        {
            dataField: "maturityDate",
            caption: "Vencimento",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 130
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            calculateCellValue: amountCustomCell,
            width: 200
        },
        {
            dataField: "grossAmount",
            caption: 'Atual',
            dataType: "currency",
            calculateCellValue: grossAmountCustomCell,
        },
        {
            dataField: 'contractedRate',
            caption: 'Taxa',
            dataType: 'string'
        },
        {
            dataField: 'custodianName',
            caption: 'Agente de custódia',
            dataType: "string",
            visible: false
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
            child: <Button icon='refresh' onClick={getInvestment}/>,
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
                keyExpr={'investmentId'}
                columns={columns}
                data={investment}
                toolBar={{
                    visible: true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
            />
            <ModalInvestment modalState={modalState} hideModal={hideModal} investment={selectedInvestment}></ModalInvestment>
        </>
    )
}

export default App;