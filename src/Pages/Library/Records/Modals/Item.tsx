import React, {useEffect, useState} from "react";
import {Author, Item, ItemModalProps, LastStatus} from "../../interfaces";
import {getData} from "../../../../Services/Axios/Get";
import {URL_AUTHOR, URL_STATUS} from "../../../../Services/Axios/ApiUrls";
import {getDefaultDate} from "../../../../Utils/DateTime";
import Modal from "../../../../Components/Modal";
import {Controller, useForm} from 'react-hook-form';
import MainAuthorSelect from '../../../../Components/Select'
import OtherAuthorsSelect from '../../../../Components/MultiSelect'
import StatusSelect from '../../../../Components/Select'


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

const App = (props: ItemModalProps) => {
    const [authors, setAuthors] = useState<Author[]>();
    const [status, setStatus] = useState<LastStatus[]>()

    // Verificar como usar o formData pra controlar o form e os dados de entrada
    const [items, setItems] = useState<Item>(ItemDefault)

    const {handleSubmit, control, setValue} = useForm();
    const [formData, setFormData] = useState<Item>(ItemDefault);

    const getAuthors = () => {
        getData(URL_AUTHOR).then(response => {
            // Tratar retorno, caso necessário, add toastr
            setAuthors(response.authors);
        })
    }

    const getStatus = () => {
        getData(URL_STATUS, {status_type: 'LIBRARY_ITEM'}).then(response => {
            setStatus(response.status)
        })
    }

    useEffect(() => {
        getAuthors();
        getStatus();
    }, []);

    const onSubmit = (data: any) => {
        setFormData(data);
    };

    const body = () => {
        let html = (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className="col-4">
                            <label>Autor:</label>
                            <Controller
                                name="mainAuthorId"
                                control={control}
                                defaultValue={items.mainAuthorId}
                                rules={{ required: true }}
                                render={({field}) => (
                                    <MainAuthorSelect
                                        dataSource={authors}
                                        displayExpr="authorName"
                                        valueExpr="authorId"
                                        searchMode={'contains'}
                                        searchExpr={'AuthorName'}
                                        onValueChanged={(e: {
                                            value: any;
                                        }) => setValue('mainAuthorId', e.value)}
                                        placeholder={'Selecione um autor'}
                                        {...field}
                                        ref={null}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label>Outros autores:</label>
                            <Controller
                                name="authorsId"
                                control={control}
                                defaultValue={items.mainAuthorId}
                                render={({field}) => (
                                    <OtherAuthorsSelect
                                        dataSource={authors}
                                        displayExpr="authorName"
                                        valueExpr="authorId"
                                        searchMode={'contains'}
                                        searchExpr={'AuthorName'}
                                        onValueChanged={(e: {
                                            value: any;
                                        }) => setValue('authorsId', e.value)}
                                        placeholder={'Selecione um autor'}
                                        {...field}
                                        ref={null}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-2">
                            <label>Status atual</label>
                            <Controller
                                name="lastStatusId"
                                control={control}
                                defaultValue={items.lastStatusId}
                                render={({field}) => (
                                    <StatusSelect
                                        dataSource={status}
                                        displayExpr="statusName"
                                        valueExpr="statusId"
                                        searchMode={'contains'}
                                        searchExpr={'statusName'}
                                        onValueChanged={(e: {
                                            value: any;
                                        }) => setValue('lastStatusId', e.value)}
                                        placeholder={'Selecione um status'}
                                        {...field}
                                        ref={null}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <button type="submit">Enviar</button>
                </form>

                {/*Div para validação do formulário*/}
                <div>
                    <h2>Valores do Formulário</h2>
                    <p>Main author: {formData.mainAuthorId ? formData.mainAuthorId : 'Nenhuma opção selecionada'}</p>
                    <p>Other Authors: {formData.authorsId ?
                        <ul>
                            {formData.authorsId.map(selectedItem => (
                                <li key={selectedItem}>{selectedItem}</li>
                            ))}
                        </ul> : 'Nenhuma opção selecionada'}
                    </p>
                    <p>Last status: {formData.lastStatusId ? formData.lastStatusId : 'Status não selecionado'}</p>

                </div>
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