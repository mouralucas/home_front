import React, {useEffect, useState} from "react";
import {Author, Collection, Item, ItemModalProps, Language, LastStatus, Publisher, Serie} from "../../interfaces";
import {getLibraryData} from "../../../../Services/Axios/Get";
import {
    URL_AUTHOR,
    URL_ITEM_COLLECTION,
    URL_ITEM_SERIE, URL_LANGUAGE,
    URL_PUBLISHER,
    URL_STATUS
} from "../../../../Services/Axios/ApiUrls";
import Modal from "../../../../Components/Modal";
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "../../../../Components/Form/CurrencyNew";


const DefaultItem: Item = {
    itemId: null,
    lastStatusId: null,
    lastStatusDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    mainAuthorId: null,
    authorsId: [],
    translatorId: 0,
    title: '',
    subtitle: '',
    titleOriginal: '',
    subtitleOriginal: '',
    isbn: '',
    isbn10: '',
    itemType: 0,
    pages: 0,
    volume: 1,
    edition: 1,
    publicationDate: null,
    originalPublicationDate: null,
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

const itemTypes = [
    {
        value: 'book',
        label: 'Livro'
    },
    {
        value: 'manga',
        label: 'Mangá'
    }
]

const itemFormats = [
    {
        value: 'hardcover',
        label: 'Capa Dura'
    },
    {
        value: 'paperback',
        label: 'Capa comum'
    }
]

interface AuthorResponse {
    authors: Author[]
}

interface StatusResponse {
    statuses: LastStatus[]
}

interface SeriesResponse {
    series: Serie[]
}

interface CollectionResponse {
    collections: Collection[]
}

interface PublisherResponse {
    publishers: Publisher[]
}

interface LanguageResponse {
    languages: Language[]
}

const App = (props: ItemModalProps) => {
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields}, getValues} = useForm<Item>();

    const [authors, setAuthors] = useState<any[]>([]);
    const [status, setStatus] = useState<any[]>([])
    const [itemSeries, setItemSeries] = useState<any[]>([])
    const [itemCollections, setItemCollections] = useState<any[]>([])
    const [publishers, setPublishers] = useState<any[]>([])
    const [languages, setLanguages] = useState<any[]>([])

    useEffect(() => {
        // Set initial values
        if (props.modalState && props.item) {
            reset(props.item);
        } else if (props.modalState && !props.item) {
            reset(DefaultItem);
        }

        // Load necessary information
        if (props.modalState) {
            getAuthors();
            getStatus();
            getSeries();
            getCollections();
            getPublishers();
            getLanguages();
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultItem);
        }
    }, [props.modalState, props.item]);

    const getAuthors = () => {
        getLibraryData(URL_AUTHOR).then((response: AuthorResponse) => {
            let options = response.authors.map((i: Author) =>
                ({value: i.authorId, label: i.authorName})
            );
            setAuthors(options)
        }).catch(err => {
            toast.error('Erro ao conectar a API para buscar os autores')
        })
    }

    const getStatus = () => {
        getLibraryData(URL_STATUS, {itemType: 'ITEM.STATUS'}).then((response: StatusResponse) => {
            let options = response.statuses.map((i: LastStatus) =>
                ({value: i.statusId, label: i.name})
            );
            setStatus(options)
        }).catch(err => {
            toast.error('Erro ao conectar a API para buscar os status')
        })
    }

    const getSeries = () => {
        getLibraryData(URL_ITEM_SERIE).then((response: SeriesResponse) => {
            let options = response.series.map((i: Serie) =>
                ({value: i.serieId, label: i.serieName})
            );
            setItemSeries(options);
        })
    }

    const getCollections = () => {
        getLibraryData(URL_ITEM_COLLECTION).then((response: CollectionResponse) => {
            let options = response.collections.map((i: Collection) =>
                ({value: i.collectionId, label: i.collectionName})
            );
            setItemCollections(options);
        })
    }

    const getPublishers = () => {
        getLibraryData(URL_PUBLISHER).then((response: PublisherResponse) => {
            let options = response.publishers.map((i: Publisher) =>
                ({value: i.publisherId, label: i.publisherName})
            );
            setPublishers(options);
        })
    }

    const getLanguages = () => {
        getLibraryData(URL_LANGUAGE).then((response: LanguageResponse) => {
            let options = response.languages.map((i: Language) =>
                ({value: i.languageId, label: i.languageName})
            )
            setLanguages(options)
        })
    }

    const onSubmit = (data: Item, e: any) => {
        console.log(data);
    };

    const body = () => {
        let html = (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Autor</label>
                            <Controller
                                name={'mainAuthorId'}
                                control={control}
                                rules={{required: false}}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={authors}
                                        value={authors.find((c: any) => c.value === field.value)}
                                        onChange={(e: any) => field.onChange(e?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Outros autores</label>
                            <Controller
                                name={'authorsId'}
                                control={control}
                                rules={{required: false}}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        isMulti
                                        options={authors}
                                        value={authors.filter((author: any) => field.value?.includes(author.value) || false)}
                                        onChange={(selectedOptions: any) => {
                                            const values = selectedOptions?.map((option: any) => option.value) || [];
                                            field.onChange(values);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Status</label>
                            <Controller
                                name={'lastStatusId'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={status}
                                        value={authors.find((c: any) => c.value === field.value)}
                                        onChange={(e: any) => field.onChange(e?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Data do status</label>
                            <Controller
                                name={'lastStatusDate'}
                                control={control}
                                render={({field}) => (
                                    <DatePicker
                                        selected={parseISO(field.value)}
                                        onChange={(date) => {
                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                        }}
                                        dateFormat="dd/MM/yyyy" // Exibe no formato brasileiro
                                        className="form-control"
                                        placeholderText="Selecione uma data"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="">Título</label>
                            <Controller
                                name={'title'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type={"text"}
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Subtítulo</label>
                            <Controller
                                name={'subtitle'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="">Título original</label>
                            <Controller
                                name={'titleOriginal'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type={"text"}
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Subtítulo original</label>
                            <Controller
                                name={'subtitleOriginal'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3">
                            <label htmlFor="">ISBN</label>
                            <Controller
                                name={'isbn'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">ISBN 10</label>
                            <Controller
                                name={'isbn10'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Tipo</label>
                            <Controller
                                name={'itemType'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={itemTypes}
                                        value={itemTypes.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-1">
                            <label htmlFor="">Pages</label>
                            <Controller
                                name={'pages'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-1">
                            <label htmlFor="">Volume</label>
                            <Controller
                                name={'volume'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-1">
                            <label htmlFor="">Edição</label>
                            <Controller
                                name={'edition'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-2">
                            <label htmlFor="">Lançamento</label>
                            <Controller
                                name={'publicationDate'}
                                control={control}
                                render={({field}) => (
                                    <DatePicker
                                        selected={field.value ? parseISO(field.value) : null}
                                        onChange={(date) => {
                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                        placeholderText="__/__/____"
                                        isClearable
                                    />
                                )}
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Lançamento original</label>
                            <Controller
                                name={'originalPublicationDate'}
                                control={control}
                                render={({field}) => (
                                    <DatePicker
                                        selected={field.value ? parseISO(field.value) : null}
                                        onChange={(date) => {
                                            // Verifica se a data é `null`
                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                        }}
                                        dateFormat="dd/MM/yyyy" // Exibe no formato brasileiro
                                        className="form-control"
                                        placeholderText="__/__/____"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Série</label>
                            <Controller
                                name={'serieId'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={itemSeries}
                                        value={itemSeries.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Coleção</label>
                            <Controller
                                name={'collectionId'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={itemCollections}
                                        value={itemCollections.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-4">
                            <label htmlFor="">Editora</label>
                            <Controller
                                name={'publisherId'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={publishers}
                                        value={publishers.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Formato</label>
                            <Controller
                                name={'itemFormatId'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={itemFormats}
                                        value={itemFormats.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Idioma</label>
                            <Controller
                                name={'languageId'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={languages}
                                        value={languages.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3">
                            <label htmlFor="">Preço de capa</label>
                            <Controller
                                name={'coverPrice'}
                                control={control}
                                render={({field}) => (
                                    <CurrencyInput
                                        prefix="R$ "
                                        value={field.value}
                                        onValueChange={(values) => field.onChange(values.rawValue)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Preço pago</label>
                            <Controller
                                name={'paidPrice'}
                                control={control}
                                render={({field}) => (
                                    <CurrencyInput
                                        prefix="R$ "
                                        value={field.value}
                                        onValueChange={(values) => field.onChange(values.rawValue)}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3">
                            <label htmlFor="">Dimensões</label>
                            <Controller
                                name={'dimensions'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Altura</label>
                            <Controller
                                name={'height'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">largura</label>
                            <Controller
                                name={'width'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Profundidade</label>
                            <Controller
                                name={'thickness'}
                                control={control}
                                render={({field}) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="form-control input-default"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <Controller name={'summary'}
                                        control={control}
                                        rules={{required: false}}
                                        render={({field}) => (
                                            <textarea
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={field.onChange}
                                                className='form-control'></textarea>
                                        )}
                            />
                        </div>
                    </div>
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
                actionModal={handleSubmit(onSubmit)}
                disableAction={!isDirty}
            />
        </div>
    )
}

export default App;