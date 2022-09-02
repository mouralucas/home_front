import React, {useEffect, useState} from "react";
import axios from "../../../Services/Axios/Axios";
import {URL_BILLS} from "../../../Services/Axios/ApiUrls";
import DataGrid from "../../../Components/DataGrid";
import Button from "devextreme-react/button";
import ModalItem from "../../Library/ModalItem";


const TableBills = () => {
    const [bills, setBills] = useState();

    const getBills = () => {
        axios.get(URL_BILLS, {
            params: {'reference': 202206}
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

    const updateBills = () => {
        getBills();
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
        },
        {
            dataField: "dat_purchase",
            caption: "Compra",
            dataType: "date",
        },
        {
            dataField: "dat_payment",
            caption: "Pagamento",
            dataType: "date",
        },
        {
            dataField: "total",
            caption: "Valor",
            dataType: "number",
        },
        {
            dataField: "stallmen",
            caption: "Parcela",
            dataType: "number",
        },
        {
            dataField: "description",
            caption: "Descricao",
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
            child: <Button icon='refresh' onClick={updateBills}/>,
            location: "after"
        },
        {
            child: <ModalItem/>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <DataGrid
            tableColumns={columns}
            data={bills}
            tooBarRefresh={false}
            toolBarItems={toolBarItems}
            loadPanel={false}
        />
    );
}

export default TableBills;