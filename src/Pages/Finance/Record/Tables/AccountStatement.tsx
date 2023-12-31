import React, {useEffect, useState} from "react";
import {URL_FINANCE_ACCOUNT_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/Table/DataGrid";
import Button from "devextreme-react/button";
import ModalStatement from '../Modals/AccountStatementBeta'
import {Button as Btn} from "devextreme-react/data-grid";
import {toast} from "react-toastify";
import {getData} from "../../../../Services/Axios/Get";
import {Statement} from "../../Interfaces"
import {DataGridColumn} from "../../../../Assets/Core/Components/Interfaces";


const App = () => {
    const [statement, setStatement] = useState<Statement[] | null>();
    const [selectedStatement, setSelectedStatement] = useState<Statement | null>()
    const [modalState, setModalState] = useState<boolean>(false)

    const showModal = (e: any) => {
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
        getData(URL_FINANCE_ACCOUNT_STATEMENT, {period: 202303}).then(response => {
                setStatement(response.statement);
            }
        ).catch(err => {
            toast.error('Houve um erro ao buscar extratos: ' + err)
        })
    }

    function amountCustomCell(cellInfo: any) {
        const formattedAmount = cellInfo.amount.toFixed(2)

        return cellInfo.currencySymbol + ' ' + formattedAmount;
    }

    useEffect(() => {
        getStatements();
    }, []);

    const coffeeCommand = (e: any) => {
        toast('🦄 Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "statementId",
            caption: "Id",
            dataType: "number",
        },
        {
            dataField: "accountName",
            caption: "Conta",
            dataType: "string",
        },
        {
            dataField: "purchaseAt",
            caption: "Compra",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 150,
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            width: 110,
            alignment: 'justify',
            calculateCellValue: amountCustomCell,
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
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <>
            <DataGrid
                keyExpr={'statementId'}
                columns={columns}
                data={statement}
                toolBar={{
                    visible: true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
                searchPanel={{
                    visible: true
                }}
            />
            <ModalStatement modalState={modalState} hideModal={hideModal} statement={selectedStatement}/>
        </>
    );
}

export default App;