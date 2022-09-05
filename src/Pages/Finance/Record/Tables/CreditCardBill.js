import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_BILLS} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import Button from "devextreme-react/button";


const TableBills = () => {
    const [bills, setBills] = useState();

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
    }, []);

    function installmentCustomCell(cellInfo) {
        /*
        * Custom function to show the installments in the table it shows the current installment and the total in the format xx/xx
        * */
        return cellInfo.installment + '/' + cellInfo.tot_installment;
    }

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            visible: false,
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
            dataType: "text",
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
            dataType: "number",
            calculateCellValue: installmentCustomCell,
            width: 100,
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "text",
        },
        {
            dataField: "nm_category",
            caption: "Categoria",
            dataType: "string",
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
        // {
        //     child: <ModalItem/>,
        //     location: "after"
        // },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <DataGrid
            tableColumns={columns}
            data={bills}
            toolBarRefresh={false}
            toolBarItems={toolBarItems}
            loadPanel={false}
        />
    );
}

export default TableBills;