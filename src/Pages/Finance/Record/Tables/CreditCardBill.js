import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_BILLS} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalBill from '../Modals/CreditCardBill'
import getCurrentPeriod from '../../../../Utils/DateTime'

const App = () => {
    const [bills, setBills] = useState();
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
        getBills();
    }

    const getBills = () => {
        axios.get(URL_BILLS, {
            params: {'period': getCurrentPeriod()}
        }).then(response => {
                setBills(response.data.bill);
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
    function installmentCustomCell(cellInfo) {
        return cellInfo.installment + '/' + cellInfo.tot_installment;
    }

    function myOtherCommand(e) {
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
            dataType: "shortDate",
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
                tableColumns={columns}
                data={bills}
                toolBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
            />
            <ModalBill modalState={modalState} hideModal={hideModal} bill={selectedBill}/>
        </>
    );
}

export default App;