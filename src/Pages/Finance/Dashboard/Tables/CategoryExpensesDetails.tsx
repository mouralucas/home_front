import React from "react";
import DataGrid from "../../../../Components/Table/DataGrid";

const App = () => {
    const columns = [
        {}
    ]

    const data: any[] = []

    return (
        <DataGrid
            columns={columns}
            data={data}
            keyExpr={'Id'}
        />
    )
}

export default App;