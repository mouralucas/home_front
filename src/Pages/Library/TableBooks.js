import DataGrid from "../../Components/DataGrid";
import React, {useEffect, useState} from "react";
import axios from "../../Services/Axios/Axios";
import Button from "devextreme-react/button";
import ModalItem from "../../Pages/Library/ModalItem";


const TableBooks = () => {
    const [books, setBooks] = useState();

    function getBooks() {
        axios.get('/library/ajax/item', {
            params: {'item_type': 'book'}
        })
            .then(response => {
                    setBooks(response.data.items);
                }
            )
    }

    useEffect(() => {
        getBooks();
    }, []);


    function updateBooks() {
        getBooks();
    }

    function testeFuncionamento() {
        alert('Deu boa');
    }



    let colunasTabelaLivro = [
        {
            dataField: "id",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: "title",
            caption: "Título",
            dataType: "string",
            visible: true,
        },
        {
            dataField: "nm_main_author",
            caption: "Autor",
            dataType: "string",
            visible: true,
        },
        {
            dataField: "pages",
            caption: "Paginas",
            dataType: "number",
        },
        {
            dataField: "volume",
            caption: "Vol.",
            dataType: "number",
        },
        {
            dataField: "cover_price",
            caption: "Pago/Capa",
            dataType: "currency",
        },
        {
            dataField: "nm_serie",
            caption: "Serie",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "nm_publisher",
            caption: "Editora",
            dataType: "string",
        },
        {
            dataField: "nm_last_status",
            caption: "Status",
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
            child: <Button icon='refresh' onClick={updateBooks}/>,
            location: "after"
        },
        {
            child: <ModalItem />,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <DataGrid
            tableColumns={colunasTabelaLivro}
            data={books}
            tooBarRefresh={false}
            toolBarItems={toolBarItems}
            loadPanel={false}
        />
    );
}

export default TableBooks;