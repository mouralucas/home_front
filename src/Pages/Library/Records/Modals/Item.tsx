import React, {useEffect, useState} from "react";
import {Author, Item, ItemModalProps, LastStatus} from "../../interfaces";
import {getData} from "../../../../Services/Axios/Get";
import {URL_AUTHOR, URL_STATUS} from "../../../../Services/Axios/ApiUrls";
import {getDefaultDate} from "../../../../Utils/DateTime";
import Modal from "../../../../Components/Modal";
import {Controller, useForm} from 'react-hook-form';
import MainAuthorSelect from '../../../../Components/Form/Select'
import OtherAuthorsSelect from '../../../../Components/Form/MultiSelect'
import StatusSelect from '../../../../Components/Form/Select'
import {toast} from "react-toastify";


const ItemDefault: Item = {
    itemId: null,
    lastStatusId: null,
    lastStatusDate: getDefaultDate(),
    mainAuthorId: null,
    authorsId: [],
    translatorId: 0,
    title: '',
    subtitle: '',
    titleOriginal: '',
    subtitleOriginal: null,
    isbnFormatted: '',
    isbn10Formatted: '',
    itemType: 0,
    pages: 0,
    volume: 1,
    edition: 1,
    publishedAt: null,
    publishedOriginalAt: null,
    serieId: 0,
    collectionId: 0,
    publisherId: 0,
    itemFormatId: 0,
    languageId: 'PT',
    coverPrice: 0,
    paidPrice: 0,
    dimensions: '',
    height: 0,
    width: 0,
    thickness: 0,
    summary: '',
    createdBy: null,
    createdAt: null,
    lastEditedBy: null,
    lastEditedAt: null
}

interface AuthorResponse {
    success: boolean
    message: string
    authors: Author[]
}

const App = (props: ItemModalProps) => {
    const [authors, setAuthors] = useState<Author[]>();
    const [status, setStatus] = useState<LastStatus[]>()

    // Verificar como usar o formData pra controlar o form e os dados de entrada
    const [items, setItems] = useState<Item>(ItemDefault)

    const {handleSubmit, control, setValue} = useForm();
    const [formData, setFormData] = useState<Item>(ItemDefault);

    useEffect(() => {
        if (props.modalState) {
            getAuthors();
            getStatus();
        }
    }, [props.modalState]);

    const getAuthors = () => {
        getData(URL_AUTHOR).then((response: AuthorResponse) => {
            // Tratar retorno, caso necessário, add toastr
            setAuthors(response.authors);
        }).catch(err => {
            toast.error('Erro ao conectar a API para buscar os autores')
        })
    }

    const getStatus = () => {
        getData(URL_STATUS, {status_type: 'LIBRARY_ITEM'}).then(response => {
            setStatus(response.status)
        }).catch(err => {
            toast.error('Erro ao conectar a API para buscar os status')
        })
    }

    const onSubmit = (data: any) => {
        setFormData(data);
    };

    const body = () => {
        let html = (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                </form>
            </div>
        )

        return html
    }

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModalItem}
                title={'Item Beta'}
                fullscreen={true}
                body={body()}
            />
        </div>
    )
}

export default App;