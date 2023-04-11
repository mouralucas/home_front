import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL_INVESTMENT } from "../../../../Services/Axios/ApiUrls";
import { getData } from "../../../../Services/Axios/Get";
import Button from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";
import TreeList from "../../../../Components/TreeList";
import ModalInvestmento from '../Modals/Investment'


const App = () => {
    const [investment, setInvestment] = useState([])
    const [selectedInvestment, setSelectedInvestment] = useState([])
    const [modalState, setModalState] = useState(false)


    // tocar tabela para tree list
    // Cada linha principal contém o total aplicado naquele investimento
    // Para investimentos recorrentes (rendimento de conta-corrente, etc.) é criado um pai com com o valor total investido
    //  e cada filho indica um depósito específico

    const showModal = (e) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
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
            dataType: "string",
            width: 400,
        },
        {
            dataField: "date",
            caption: "Data",
            dataType: "date",
            width: 130
        },
        {
            dataField: "dat_maturity",
            caption: "Vencimento",
            dataType: "date",
            width: 130
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            width: 200
        }, 
        {
            dataField: "interest_index",
            caption: "Taxa",
            dataType: "string"
        },
        {
            dataField: 'nm_type',
            caption: 'Tipo',
            dataType: 'string'
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
        },
        {
            caption: 'Ações',
            type: 'buttons',
            width: 110,
            child: [
                <Btn
                    key={1}
                    text="Editar"
                    // icon="/url/to/my/icon.ico"
                    icon="edit"
                    hint="Editar"
                    onClick={showModal}
                />,
            ]
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
            <TreeList
                tableColumns={columns}
                keyExpr={'id'}
                parentIdExpr={'parent_id'}
                dataSource={investment}
                toolBarRefresh={false}
                toolBarItems={toolBarItems}
                loadPanel={false}
            />
            <ModalInvestmento modalState={modalState} hideModal={hideModal}></ModalInvestmento>
        </>
    )
}

export default App;