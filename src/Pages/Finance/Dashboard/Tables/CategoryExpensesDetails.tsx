import React from "react";
import DataGrid from "../../../../Components/Table/DataGrid";
import {DataGridColumn} from "../../../../Assets/Core/Components/Interfaces";

interface TransactionsCategoryProps {
    data: any[]
}

const App = (props: TransactionsCategoryProps) => {
    const columns: DataGridColumn[] = [
        {
            'dataField': 'transactionId',
            'caption': 'Id',
            'dataType': 'string',
            'visible': true
        },
        {
            'dataField': 'date',
            'caption': 'Data',
            'dataType': 'date'
        },
        {
            'dataField': 'amount',
            'caption': 'Valor',
            'dataType': 'currency'
        },
        {
          'dataField': 'categoryName',
          'caption': 'Categoria',
          'dataType':'string'
        },
        {
            'dataField': 'description',
            'caption': 'Descrição',
            'dataType': 'string'
        }
    ]

    return (
        <DataGrid
            columns={columns}
            data={props.data}
            keyExpr={'transactionId'}
        />
    )
}

export default App;