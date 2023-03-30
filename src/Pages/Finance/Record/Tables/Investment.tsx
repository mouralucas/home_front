import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL_INVESTMENT } from "../../../../Services/Axios/ApiUrls";
import { getData } from "../../../../Services/Axios/Get";
import Button from "devextreme-react/button";
import DataGrid from "../../../../Components/DataGrid";


const App = () => {
    const [investment, setInvestment] = useState([])
    const [selectedInvestment, setSelectedInvestment] = useState([])
    const [modalState, setModalState] = useState(false)

    const showModal = (e) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row.data);
        }
        setModalState(true);
    }

    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = () => {
        getData(URL_INVESTMENT).then(response => {
            setInvestment(response.investment);
        }).catch(err => {
            toast.error(err)
        })
    }

    const columns = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "string",
            width: 70,
            visible: false
        },
        {
            dataField: "period",
            caption: "Referência",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "name",
            caption: "Nome",
            dataType: "string"
        },
        {
            dataField: "date",
            caption: "Data",
            dataType: "date"
        },
        {
            dataField: "dat_maturity",
            caption: "Vencimento",
            dataType: "date"
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency"
        }, 
        {
            dataField: "interest_index",
            caption: "Taxa",
            dataType: "string"
        },
        {
            dataField: 'nm_custodian',
            caption: 'Agente de custódia',
            dataType: "string"
        },
        {
            dataField: 'id_custodian',
            caption: 'Id dgente de custódia',
            dataType: "string",
            visible: false
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
            child: <Button icon={'refresh'} onClick={getInvestment}/>,
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

    return(
        <>
            <DataGrid
                keyExpr={'id'}
                tableColumns={columns}
                data={investment}
                toolBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
            />
        </>
    )
}

export default App;