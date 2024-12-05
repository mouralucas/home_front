import React, {useEffect, useState} from "react";
import {DataGridColumn} from "../../../../Assets/Core/Components/Interfaces";
import {URL_CREDIT_CARD_BILL_BY_CARD} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {CreditCardBillHistory} from "../../Interfaces";
import DataGrid from "../../../../Components/Table/DataGrid";
import {getFinanceData} from "../../../../Services/Axios/Get";


interface CreditCardBillByCardProps {

}

// interface HistoryResponse {
//     success: boolean
//     message: string
//     history: {
//         periods: any
//         columns: any
//     }
// }
interface Test {
    credit_card: string
    period: string,
    total_amount: number
}

const defaultColumns: DataGridColumn[] = [
    {
        'dataField': 'id',
        'caption': 'Id',
        'visible': false,
        'dataType': 'string'
    },
    {
        'dataField': 'currencySymbol',
        'caption': 'Currency',
        'visible': false,
        'dataType': 'string'
    },
    {
        'dataField': 'period',
        'caption': 'Período',
        'dataType': 'string'
    }
]


// # TODO: This function can by global, since it is generic
function amountCustomCellFactory(dataField: any) {
    return function(cellInfo: any) {
        const value = cellInfo[dataField];
        if (!value) return '';
        const formattedAmount = parseFloat(value).toFixed(2);
        return cellInfo.currencySymbol + ' ' + formattedAmount;
    };
}

const App = (props: CreditCardBillByCardProps) => {
    // TODO: create default table columns like period and id
    const [columns, setColumns] = useState<DataGridColumn[]>([])
    const [billHistory, setBillHistory] = useState<CreditCardBillHistory[]>([])

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = () => {
        // Get the history by card available
        // In theory the table will have as many columns as credit cards used in the period rage
        // The first column is always the period, the other are the credit card and their bill amount for the period
        // The last column is the total for the period
        getFinanceData(URL_CREDIT_CARD_BILL_BY_CARD, {
            startPeriod: 202401,
            endPeriod: 202412,
        }).then((response: any) => {
            const dynamicColumns: DataGridColumn[] = response.cards.map((i: any) => ({
                dataField: i,
                caption: i,
                dataType: 'currency',
                calculateCellValue: amountCustomCellFactory(i),
            }));

            dynamicColumns.push(
                {
                    dataField: 'total',
                    caption: 'Total',
                    dataType: 'currency',
                    calculateCellValue: amountCustomCellFactory('total'),
                }
            )

            setColumns([...defaultColumns, ...dynamicColumns]);
            setBillHistory(response.bill);
        }).catch((err: string | ToastOptions) => {
            toast.error('Erro ao buscar histórico de faturas')
        });
    }

    return (
        columns.length > 0 ? (
            <DataGrid
                keyExpr={'id'}
                data={billHistory}
                columns={columns}
            />
        ) : (
            <div>Carregando...</div>
        )
    )
}

export default App;