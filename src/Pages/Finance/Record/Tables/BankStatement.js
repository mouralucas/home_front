import React, {useEffect, useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_BILLS, URL_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/DataGrid";
import Button from "devextreme-react/button";
import ModalStatement from '../Modals/BankStatement'


const App = () => {
    const [statement, setStatement] = useState();

    const getStatements = () => {
        axios.get(URL_STATEMENT, {
            params: {'reference': 202206}
        }).then(response => {
                setStatement(response.data.statement);
            }
        ).catch(response => {
            return {'error': response}
        })
    }

    useEffect(() => {
        getStatements();
    }, []);

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: "account",
            caption: "Conta",
            dataType: "string",
        },
        {
            dataField: "dat_purchase",
            caption: "Compra",
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
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
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
            child: <Button icon='refresh' onClick={getStatements}/>,
            location: "after"
        },
        {
            child: <ModalStatement/>,
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
            data={statement}
            toolBarRefresh={false}
            toolBarItems={toolBarItems}
            loadPanel={false}
        />
    );
}

export default App;