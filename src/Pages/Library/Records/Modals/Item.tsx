import React, {useState} from "react";
import {Author, Item, ItemModalProps} from "../../interfaces";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";
import {URL_AUTHOR} from "../../../../Services/Axios/ApiUrls";
import {getDefaultDate} from "../../../../Utils/DateTime";
import Modal from "../../../../Components/Modal";
import AsyncSelect from "react-select/async";
import { useForm, Controller } from 'react-hook-form';

const ItemDefault: Item = {
    itemId: null,
    lastStatusId: null,
    lastStatusDate: getDefaultDate(),
    mainAuthorId: 0,
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
    const [mainAuthor, setMainAuthor] = useState<Author[]>();
    const [selectedMainAuthor, setSelectedMainAuthor] = useState<Author | null>();

    const [otherAuthors, setOtherAuthors] = useState<Author[]>();
    const [selectedOtherAuthors, setSelectedOtherAuthors] = useState<Author | null>();

    const [itemType, setItemType] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState();

    const [items, setItems] = useState<Item>(ItemDefault)

    const { handleSubmit, control, register } = useForm();
    const [formData, setFormData] = useState({ nome: '', opcao: {'label': '', 'value': ''} });

    const getAuthors = (query: string, callback: any) => {
        if (query) {
            callback(filterSelect(mainAuthor, query));
        } else {
            getData(URL_AUTHOR).then(response => {
                let options = response?.authors.map((author: Author) => ({value: author.authorId, label: author.authorName}))
                callback(options);
                // setMainAuthor(options);
                // setSelectedMainAuthor(options.filter((i: { value: number; }) => i.value === items.mainAuthorId)[0])
            })

        }
    }

    const onSubmit = (data: any) => {
        setFormData(data);
        console.log(data);
    };

    const body = () => {
        let html = (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nome:</label>
                        <input {...register('nome')} />
                    </div>
                    <div>
                        <label>Opção:</label>
                        <Controller
                            name="opcao"
                            control={control}
                            render={({field}) => (
                                <AsyncSelect
                                    {...field}
                                    loadOptions={(query, callback) => getAuthors(query, callback)}
                                    defaultOptions
                                    value={field.value || null}
                                    onChange={(selectedOption) => field.onChange(selectedOption)}
                                    placeholder="Selecione uma opção"
                                />
                            )}
                        />
                    </div>
                    {/*<button type="submit">Enviar</button>*/}
                </form>

                <div>
                    <h2>Valores do Formulário</h2>
                    <p>Nome: {formData.nome}</p>
                    <p>Opção: {formData.opcao ? formData.opcao.value : 'Nenhuma opção selecionada'}</p>
                </div>
            </div>
        )

        return html
    }

    const setCombo = (e: any, name: string, setFunction: any) => {
        if (e !== null) {
            if (Array.isArray(e)) {
                let list_values: any[] = [];
                e.forEach(key => list_values.push(key.value));
                setFunction(e);
                return setItems(oldValues => ({...oldValues, [name]: list_values}));
            } else {
                setFunction(e);
                return setItems(oldValues => ({...oldValues, [name]: e.value}));
            }
        }
        return setItems(oldValues => ({...oldValues, [name]: e.value}));
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