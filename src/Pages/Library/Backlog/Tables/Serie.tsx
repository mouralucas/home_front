import React, {useEffect, useState} from "react";
import {URL_ITEM_SERIE} from "../../../../Services/Axios/ApiUrls";
import DataGrid from "../../../../Components/Table/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import ModalSerie from '../Modals/Serie'
import {getLibraryData} from "../../../../Services/Axios/Get";
import {DataGridColumn, DataGridToolBarItem} from "../../../../Assets/Core/Components/Interfaces";
import {Serie} from "../../interfaces";

interface GetSerieResponse {
    quantity: number;
    series: Serie[];
}

const App = () => {
    const [series, setSeries] = useState<Serie[]>();
    
    const [selectedSerie, setSelectedSerie] = useState({})
    const [modalState, setModalState] = useState(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedSerie(e.row.data);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
        setSelectedSerie({});
        getSerie();
    }

    const getSerie = () => {
        getLibraryData(URL_ITEM_SERIE).then((response: GetSerieResponse) => {
            setSeries(response?.series)
        });
    }

    useEffect(() => {
        getSerie();
    }, []);

    function myOtherCommand(e: any) {
        alert('Café');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "serieId",
            caption: "Id",
            dataType: "number",
            width: 70,
        },
        {
            dataField: "serieName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "nm_original",
            caption: "Nome Original",
            dataType: "date",
            format: 'shortDate',
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
        },
        {
            dataField: "nm_country",
            caption: "País",
            dataType: "string"
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
                <Btn
                    key={2}
                    //icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="My Command"
                    onClick={myOtherCommand}
                />]
        }
    ]

    let toolBarItems: DataGridToolBarItem[] = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon={'refresh'} onClick={getSerie}/>,
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

    return (
        <>
            <DataGrid
                keyExpr={'serieId'}
                columns={columns}
                data={series}
                toolBar={{
                    visible:true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
            />
            <ModalSerie modalState={modalState} hideModal={hideModal} serie={selectedSerie}/>
        </>
    );
}

export default App;