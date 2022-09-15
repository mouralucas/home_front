import React, {useEffect, useRef, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_BILLS} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import Button from "devextreme-react/button";
import ModalBill from '../Modals/CreditCardBill'
import {Button as Btn} from "devextreme-react/data-grid";


const App = () => {
    const [bills, setBills] = useState();
    const modalBillRef = useRef();

    const getBills = () => {
        axios.get(URL_BILLS, {
            params: {'reference': 202209}
        }).then(response => {
                setBills(response.data.bill);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    useEffect(() => {
        getBills();
        console.log(modalBillRef.current);
    }, []);

    function installmentCustomCell(cellInfo) {
        /*
        * Custom function to show the installments in the table it shows the current installment and the total in the format xx/xx
        * */
        return cellInfo.installment + '/' + cellInfo.tot_installment;
    }

    function openEditModal(e) {
        modalBillRef.current.showModal();
    }

    function myOtherCommand(e) {
        alert('Café');
    }

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            visible: true,
        },
        {
            dataField: "reference",
            caption: "Referência",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "card",
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
            dataField: "total",
            caption: "Valor",
            dataType: "number",
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
            caption: 'Butãos',
            type: 'buttons',
            width: 110,
            child: [
                <Btn
                    text="My Command"
                    // icon="/url/to/my/icon.ico"
                    icon="edit"
                    hint="Editar"
                    onClick={openEditModal}
                />,
                <Btn
                    text="My Command"
                    // icon="/url/to/my/icon.ico"
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
            child: <Button icon='refresh' onClick={getBills}/>,
            location: "after"
        },
        {
            child: <ModalBill ref={modalBillRef} />,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <DataGrid
            keyExpr={'id'}
            tableColumns={columns}
            data={bills}
            toolBarRefresh={false}
            toolBarItems={toolBarItems}
            loadPanel={false}
        />
    );
}

export default App;