import Modal from "../../../../Components/Modal";
import React, {useEffect, useState} from "react";
import {
    URL_AUTHOR,
    URL_ITEM,
    URL_ITEM_COLLECTION,
    URL_ITEM_FORMAT,
    URL_ITEM_SERIE,
    URL_ITEM_TYPES,
    URL_LANGUAGE,
    URL_PUBLISHER,
    URL_STATUS
} from "../../../../Services/Axios/ApiUrls";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import Currency from "../../../../Components/Currency";
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";
import handleSubmit from "../../../../Services/Axios/Post";
import {format as formatDate} from "../../../../Utils/DateTime";

const ModalItem = (props) => {
    // Combo boxes variables
    const [mainAuthor, setMainAuthor] = useState([]);
    const [selectedMainAuthor, setSelectedMainAuthor] = useState();

    const [selectedOtherAuthors, setSelectedOtherAuthors] = useState();

    const [itemType, setItemType] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState();

    const [serie, setSerie] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState();

    const [collection, setCollection] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState();

    const [publisher, setPublisher] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState();

    const [itemFormat, setItemFormat] = useState([]);
    const [selectedItemFormat, setSelectedItemFormat] = useState();

    const [language, setLanguage] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState();

    const [lastStatus, setLastStatus] = useState([])
    const [selectedLastStatus, setSelectedLastStatus] = useState()

    // Form variables
    const [items, setItems] = useState({})

    useEffect(() => {
        if (props.item) {
            setItems(props.item);
            console.log(props.item);
        }

        if (!props.modalState) {
            setItems({
                item_id: null,
                lastStatusId: null,
                lastStatusAt: new Date().getDate(),
                main_author_id: 0,
                authors_id: [],
                translator_id: 0,
                title: '',
                subtitle: '',
                title_original: '',
                subtitle_original: null,
                isbn_formatted: '',
                isbn10_formatted: '',
                itemType: 0,
                pages: 0,
                volume: 1,
                edition: 1,
                dat_published: null,
                dat_published_original: null,
                serie_id: 0,
                collection_id: 0,
                publisher_id: 0,
                itemFormatId: 0,
                language_id: 'PT',
                cover_price: 0,
                payed_price: 0,
                dimensions: '',
                height: '',
                width: '',
                thickness: '',
                summary: '',

                createdBy: null,
                datCreated: null,
                lastEditedBy: null,
                datLastEdited: null
            })

            setSelectedMainAuthor(null);
            setSelectedLastStatus(null);
            setSelectedItemType(null);
            setSelectedSerie(null);
            setSelectedCollection(null);
            setSelectedPublisher(null);
            setSelectedItemFormat(null);
            setSelectedLanguage(null);
        }
    }, [props.modalState, props.item])

    console.log(items);

    // Set combo boxes default
    useEffect(() => {
        if (props.item) {
            setSelectedMainAuthor(mainAuthor.filter(i => i.value === props.item.mainAuthorId)[0]);
        }
    }, [mainAuthor, props.item])

    useEffect(() => {
        if (props.item) {
            setSelectedLastStatus(lastStatus.filter(i => i.value === props.item.lastStatusId)[0])
        }
    }, [lastStatus, props.item])

    useEffect(() => {
        if (props.item) {
            setSelectedItemType(itemType.filter(i => i.value === props.item.itemType)[0])
        }
    }, [itemType, props.item])

    useEffect(() => {
        if (props.item) {
            setSelectedSerie(serie.filter(i => i.value === props.item.serieId)[0])
        }
    }, [serie, props.item])

    useEffect(() => {
        if (props.item) {
            setSelectedCollection(collection.filter(i => i.value === props.item.collectionId)[0])
        }
    }, [collection, props.item])

    useEffect(() => {
        if (props.item) {
            setSelectedPublisher(publisher.filter(i => i.value === props.item.publisherId)[0])
        }
    }, [publisher, props.item])

    useEffect(() => {
        if (props.item) {
            setSelectedItemFormat(itemFormat.filter(i => i.value === props.item.itemFormatId)[0])
        }
    }, [itemFormat, props.item])

    useEffect(() => {
        if (props.item) {
            setSelectedLanguage(language.filter(i => i.value === props.item.languageId)[0])
        }
    }, [language, props.item])

    // Get functions
    const getAuthors = (query, callback) => {
        if (query) {
            callback(filterSelect(mainAuthor, query));
        } else {
            getData(URL_AUTHOR).then(response => {
                let options = response?.authors.map(author => ({value: author.authorId, label: author.authorName}))
                callback(options);
                setMainAuthor(options);
                setSelectedMainAuthor(options.filter(i => i.value === items.mainAuthorId)[0])
            })

        }
    }

    const getItemTypes = (query, callback) => {
        if (query) {
            callback(filterSelect(itemType, query));
        }
        getData(URL_ITEM_TYPES).then(response => {
            let options = response.types.map(type => ({value: type.value, label: type.text}));
            callback(options);
            setItemType(options);
            setSelectedItemType(options.filter(i => i.value === items.itemType)[0]);
        });
    }

    const getSerie = (query, callback) => {
        if (query) {
            callback(filterSelect(serie, query));
        } else {
            getData(URL_ITEM_SERIE).then(response => {
                let options = response.series.map(serie => ({value: serie.id, label: serie.name}));
                callback(options);

                setSerie(options);
                setSelectedSerie(options.filter(i => i.value === items.serieId)[0])
            });
        }
    }

    const getCollection = (query, callback) => {
        if (query) {
            callback(filterSelect(collection, query));
        } else {
            getData(URL_ITEM_COLLECTION).then(response => {
                let options = response.collections.map(collection => ({value: collection.id, label: collection.name}));
                callback(options);

                setCollection(options);
                setSelectedCollection(options.filter(i => i.value === items.collectionId)[0]);
            });
        }
    }

    const getPublishers = (query, callback) => {
        if (query) {
            callback(filterSelect(publisher, query));
        } else {
            getData(URL_PUBLISHER).then(response => {
                let options = response.publishers.map(publisher => ({value: publisher.id, label: publisher.name}));
                callback(options);

                setPublisher(options);
                setSelectedPublisher(options.filter(i => i.value === items.publisherId)[0]);
            });
        }
    }

    const getItemFormat = (query, callback) => {
        if (query) {
            callback(filterSelect(itemFormat, query));
        } else {
            getData(URL_ITEM_FORMAT).then(response => {
                let options = response.formats.map(i => ({value: i.value, label: i.text}));
                callback(options);

                setItemFormat(options);
                setSelectedItemFormat(options.filter(i => i.value === items.itemFormatId)[0]);
            });
        }
    }

    const getLanguage = (query, callback) => {
        if (query) {
            callback(filterSelect(language, query));
        } else {
            getData(URL_LANGUAGE).then(response => {
                let options = response.languages.map(i => ({value: i.id, label: i.name}));
                callback(options);

                setLanguage(options);
                setSelectedLanguage(options.filter(i => i.value === items.languageId)[0]);
            });
        }
    }

    const getStatus = (query, callback) => {
        if (query) {
            callback(filterSelect(lastStatus, query))
        } else {
            getData(URL_STATUS, {status_type: 'LIBRARY_ITEM'}).then(response => {

                let options = response.status.map(i => ({value: i.id, label: i.name}))
                callback(options);

                setLastStatus(options);
                setSelectedLastStatus(options.filter(i => i.value === items.last_status_id)[0])
            })
        }
    }

    // Set functions for specific componentes
    const set = (name) => {
        return ({target: {value}}) => {
            setItems(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = (e, name, setFunction) => {
        if (e !== null) {
            if (Array.isArray(e)) {
                var list_values = [];
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

    const setDate = (e, name) => {
        if (e.value !== null) {
            return setItems(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
        } else {
            return setItems(oldValues => ({...oldValues, [name]: e.value}))
        }
    }

    const setCurrency = (e, name) => {
        return setItems(oldValues => ({...oldValues, [name]: e.value / 100}));
    }

    const body = () => {
        let body_html =
            <form>
                <div className="">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="{'combo_author'}">Autor principal: {items.mainAuthorId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getAuthors(query, callback)}
                                         onChange={(e) => setCombo(e, 'mainAuthorId', setSelectedMainAuthor)}
                                         defaultOptions
                                         value={selectedMainAuthor}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="{'combo_author'}">Outros autores: {items.authorsId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getAuthors(query, callback)}
                                         onChange={(e) => setCombo(e, 'authorsId', setSelectedOtherAuthors)}
                                         defaultOptions
                                         value={selectedOtherAuthors}
                                         isMulti={true}/>
                        </div>
                        <div className="col-2">
                            <label htmlFor="{'combo_status'}">Status: {items.lastStatusId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getStatus(query, callback)}
                                         onChange={(e) => setCombo(e, 'lastStatusId', setSelectedLastStatus)}
                                         defaultOptions
                                         value={selectedLastStatus}/>
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Data status:</label>
                            <DateBox value={items.lastStatusAt} type="date" className='form-control input-default'
                                     useMaskValue={true} useMaskBehavior={true}
                                     onValueChanged={(date) => setDate(date, 'lastStatusAt')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="{'nm_title'}">Título</label>
                            <input value={items.title} onChange={set('title')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="{'subtitle'}">Sub-título</label>
                            <input value={items.subtitle} onChange={set('subtitle')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="{'titleOriginal'}">Título original</label>
                            <input value={items.titleOriginal} onChange={set('titleOriginal')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="{'subtitle'}">Sub-título original</label>
                            <input value={items.subtitleOriginal} onChange={set('subtitleOriginal')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">ISBN</label>
                            <input value={items.isbnFormatted} onChange={set('isbnFormatted')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'subtitle'}">ISBN-10</label>
                            <input value={items.isbn10Formatted} onChange={set('isbn10Formatted')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Tipo: {items.itemType}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getItemTypes(query, callback)}
                                         onChange={(e) => setCombo(e, 'itemType', setSelectedItemType)}
                                         defaultOptions
                                         value={selectedItemType}/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'pages'}">Páginas</label>
                            <input value={items.pages} onChange={set('pages')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{volume'}">Volume</label>
                            <input value={items.volume} onChange={set('volume')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'edition'}">Edição</label>
                            <input value={items.edition} onChange={set('edition')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="">Lançamento: {items.publishedAt}</label>
                            <DateBox value={items.publishedAt} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date) => setDate(date, 'publishedAt')}/>
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Lançamento original: {items.publishedOriginalAt}</label>
                            <DateBox value={items.publishedOriginalAt} type="date"
                                     className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date) => setDate(date, 'publishedOriginalAt')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Serie: {items.serieId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getSerie(query, callback)}
                                         onChange={(e) => setCombo(e, 'serieId', setSelectedSerie)}
                                         defaultOptions
                                         value={selectedSerie}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Coleção: {items.collectionId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCollection(query, callback)}
                                         onChange={(e) => setCombo(e, 'collectionId', setSelectedCollection)}
                                         defaultOptions
                                         value={selectedCollection}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Editora: {items.publisherId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getPublishers(query, callback)}
                                         onChange={(e) => setCombo(e, 'publisherId', setSelectedPublisher)}
                                         defaultOptions
                                         value={selectedPublisher}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Formato: {items.itemFormatId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getItemFormat(query, callback)}
                                         onChange={(e) => setCombo(e, 'itemFormatId', setSelectedItemFormat)}
                                         defaultOptions
                                         value={selectedItemFormat}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Idioma: {items.languageId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getLanguage(query, callback)}
                                         onChange={(e) => setCombo(e, 'languageId', setSelectedLanguage)}
                                         defaultOptions
                                         value={selectedLanguage}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor capa: {items.coverPrice}</label>
                            <Currency className='form-control input-default'
                                      value={items.coverPrice * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values) => {
                                          setCurrency(values, 'coverPrice')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor pago: {items.paidPrice}</label>
                            <Currency className='form-control input-default'
                                      value={items.paidPrice * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values) => {
                                          setCurrency(values, 'paidPrice')
                                      }}/>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Dimensões: {items.dimensions}</label>
                            <input value={items.dimensions} onChange={set('dimensions')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Altura: {items.height}</label>
                            <input value={items.height} onChange={set('height')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Largura: {items.width}</label>
                            <input value={items.width} onChange={set('width')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Profundidade: {items.thickness}</label>
                            <input value={items.thickness} onChange={set('thickness')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Resumo</label>
                            <textarea className='form-control' value={items.summary} id="" cols="30" rows="10"
                                      onChange={set('summary')}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <span className='text-small text-muted'>
                            Criado em: {formatDate(items.createdAt)}
                        </span>
                        <span className="text-small text-muted">
                            Editado em: {formatDate(items.lastEditedAt)}
                        </span>
                    </div>
                </div>
            </form>;

        return body_html
    }

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModalItem}
                title={'Item'}
                body={body()}
                fullscreen={true}
                actionModal={(e) => handleSubmit(e, URL_ITEM, items, false, 'Item cadastrado com sucesso')}
            />
        </div>
    );
}

export default ModalItem