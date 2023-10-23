import React, {useEffect, useState} from "react";
import {DataGridColumn} from "../../../../Assets/Core/Components/Interfaces";
import {getData} from "../../../../Services/Axios/Get";
import {URL_CREDIT_CARD_BILL_HISTORY} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {CreditCardBillHistory} from "../../Interfaces";
import DataGrid from "../../../../Components/Table/DataGrid";


interface CreditCardBillByCardProps {

}

interface CreditCardBillHistoryResponse {
    success: boolean,
    message: string,
    history: any
}

const defaultColumns: DataGridColumn[] = [
    {
        'dataField': 'id',
        'caption': 'Id',
        'visible': false,
        'dataType': 'string'
    },
    {
        'dataField': 'period',
        'caption': 'Período',
        'dataType': 'string'
    }
]

const App = (props: CreditCardBillByCardProps) => {
    // TODO: create default table columns like period and id
    const [columns, setColumns] = useState<DataGridColumn[]>(defaultColumns)
    const [billHistory, setBillHistory] = useState<CreditCardBillHistory[]>([])

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = () => {
        getData(URL_CREDIT_CARD_BILL_HISTORY, {
            startAt: 202306,
            endAt: 202312,
            type: 'byCard'
        }).then((response: CreditCardBillHistoryResponse) => {
            // setColumns(prevLists => [...prevLists, response.history.columns])
        }).catch((err: string | ToastOptions) => {
            toast.error('Erro ao buscar histórico de faturas')
        });
    }

    return (
        <DataGrid
            keyExpr={'id'}
            data={billHistory}
            columns={columns}
        />
    )
}

export default App;