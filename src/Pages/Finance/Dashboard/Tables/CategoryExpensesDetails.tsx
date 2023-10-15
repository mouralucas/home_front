import React from "react";
import DataGrid from "../../../../Components/Table/DataGrid";

const App = () => {
    const columns = [
        {
            'caption': 'Data',
            'dataType': 'date'
        },
        {
            'caption': 'Valor',
            'dataType': 'currency'
        },
        {
          'caption': 'Descrição',
          'dataType': 'string'
        }
    ]

    const data: any[] = []

    return (
        <DataGrid
            columns={columns}
            data={data}
            keyExpr={'Id'}
            groupPanel={{
                visible: false
            }}
        />
    )
}

export default App;