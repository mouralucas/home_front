import Modal from "../../../../Components/Modal";
import {useEffect, useState} from "react";
import {URL_AUTHORS, URL_ITEM, URL_ITEM_COLLECTION, URL_ITEM_FORMAT, URL_ITEM_SERIE, URL_ITEM_TYPES, URL_LANGUAGE, URL_PUBLISHERS, URL_STATUS} from "../../../../Services/Axios/ApiUrls";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import Currency from "../../../../Components/Currency";
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";
import handleSubmit from "../../../../Services/Axios/Post";

const ModalItem = (props) => {
    // Combo boxes variables
    const [mainAuthor, setMainAuthor] = useState([]);
    const [selectedMainAuthor, setSelectedMainAuthor] = useState();

    const [otherAuthors, setOtherAuthors] = useState([]);
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

    const [status, setStatus] = useState([])
    const [selectedStatus, setSelectedStatus] = useState()

    // Form variables
    const [values, setValues] = useState({})

    useEffect(() => {
        if (props.item) {
            setValues(props.item);
        }

        if (!props.modalState){
            setValues({
                item_id: null,
                status_id: 'comprado',
                dat_status: new Date(),
                main_author_id: 0,
                authors_id: [],
                translator_id: 0,
                title: '',
                subtitle: '',
                title_original: '',
                subtitle_original: '',
                isbn: '',
                isbn10: '',
                itemType: 0,
                pages: 0,
                volume: 1,
                edition: 1,
                // dat_published: '',
                // dat_published_original: '',
                serie_id: 0,
                collection_id: 0,
                publisher_id: 0,
                format_id: 0,
                language_id: 'PT',
                cover_price: 0,
                payed_price: 0,
                dimensions: '',
                height: '',
                width: '',
                thickness: '',
                resumo: '',
            })
        }
    }, [props.modalState, props.item])

    const getAuthors = (query, callback) => {
        if (query) {
            callback(filterSelect(mainAuthor, query));
        } else {
            getData(URL_AUTHORS).then(response => {
                let options = response?.authors.map(author => ({value: author.id, label: author.nm_full}))
                callback(options);
                setMainAuthor(options);
                setSelectedMainAuthor(options.filter(category => category.value === values.main_author_id)[0])
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
            setSelectedItemType(options.filter(i => i.value === values.itemType)[0]);
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
                setSelectedSerie(options.filter(i => i.value === values.serie_id)[0])
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
                setSelectedCollection(options.filter(i => i.value === values.collection_id)[0]);
            });
        }
    }

    const getPublishers = (query, callback) => {
        if (query) {
            callback(filterSelect(publisher, query));
        } else {
            getData(URL_PUBLISHERS).then(response => {
                let options = response.publishers.map(publisher => ({value: publisher.id, label: publisher.name}));
                callback(options);

                setPublisher(options);
                setSelectedPublisher(options.filter(i => i.value === values.publisher_id)[0]);
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
                setSelectedItemFormat(options.filter(i => i.value === values.format_id)[0]);
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
                setSelectedLanguage(options.filter(i => i.value === values.language_id)[0]);
            });
        }
    }

    const getStatus = (query, callback) => {
        if (query) {
            callback(filterSelect(status, query))
        } else {
            getData(URL_STATUS, {status_type: 'LIBRARY_ITEM'}).then(response => {

                let options = response.status.map(i => ({value: i.id, label: i.name}))
                callback(options);

                setStatus(options);
                setSelectedStatus(options.filter(i => i.value === values.status_id)[0])
            })
        }
    }

    const set = (name) => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = (e, name, setFunction) => {
        if (e !== null) {
            if (Array.isArray(e)) {
                var list_values = [];
                e.forEach(key => list_values.push(key.value));
                setFunction(e);
                return setValues(oldValues => ({...oldValues, [name]: list_values}));
            } else {
                setFunction(e);
                return setValues(oldValues => ({...oldValues, [name]: e.value}));
            }
        }
        return setValues(oldValues => ({...oldValues, [name]: e.value}));
    }

    const setDate = (e, name) => {
        return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
    }

    const setCurrency = (values, name) => {
        return setValues(oldValues => ({...oldValues, [name]: values.value / 100}));
    }

    // Form submit
    // const setItem = async e => {
    //     e.preventDefault();
    //
    //     const formData = new FormData();
    //     Object.keys(values).forEach(key => formData.append(key, JSON.stringify(values[key])));
    //
    //     await axios({
    //         method: 'post',
    //         url: URL_ITEM,
    //         data: formData,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }).then(response => {
    //         return response.data
    //     }).catch(response => {
    //         return {'error': response}
    //     })
    // }

    const body = () => {
        let body_html =
            <form>
                <div className="">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="{'combo_author'}">Autor principal: {values.main_author_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getAuthors(query, callback)}
                                         onChange={(e) => setCombo(e, 'main_author_id', setSelectedMainAuthor)}
                                         defaultOptions
                                         value={selectedMainAuthor}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="{'combo_author'}">Outros autores: {values.authors_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getAuthors(query, callback)}
                                         onChange={(e) => setCombo(e, 'authors_id', setSelectedOtherAuthors)}
                                         defaultOptions
                                         value={selectedOtherAuthors}
                                         isMulti={true}/>
                        </div>
                        <div className="col-2">
                            <label htmlFor="{'combo_status'}">Status: {values.status_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getStatus(query, callback)}
                                         onChange={(e) => setCombo(e, 'status_id', setSelectedStatus)}
                                         defaultOptions
                                         value={selectedStatus}/>
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Data status:</label>
                            <DateBox value={values.dat_status} type="date" className='form-control input-default'
                                     onValueChanged={(date) => setDate(date, 'dat_status')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="{'nm_title'}">Título</label>
                            <input value={values.title} onChange={set('title')} type="text" className='form-control input-default'/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="{'subtitle'}">Sub-título</label>
                            <input value={values.subtitle} onChange={set('subtitle')} type="text" className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="{'nm_author'}">Título original</label>
                            <input value={values.title_original} onChange={set('title_original')} type="text" className='form-control input-default'/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="{'subtitle'}">Sub-título original</label>
                            <input value={values.subtitle_original} onChange={set('subtitle_original')} type="text" className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">ISBN</label>
                            <input value={values.isbn} onChange={set('isbn')} type="text" className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'subtitle'}">ISBN-10</label>
                            <input value={values.isbn10} onChange={set('isbn10')} type="text" className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Tipo: {values.itemType}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getItemTypes(query, callback)}
                                         onChange={(e) => setCombo(e, 'itemType', setSelectedItemType)}
                                         defaultOptions
                                         value={selectedItemType} />
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'pages'}">Páginas</label>
                            <input value={values.pages} onChange={set('pages')} type="text" className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{volume'}">Volume</label>
                            <input value={values.volume} onChange={set('volume')} type="text" className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'edition'}">Edição</label>
                            <input value={values.edition} onChange={set('edition')} type="text" className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="">Lançamento: {values.dat_published}</label>
                            <DateBox value={values.dat_published} type="date" className='form-control input-default'
                                     onValueChanged={(date) => setDate(date, 'dat_published')}/>
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Lançamento original: {values.dat_published_original}</label>
                            <DateBox value={values.dat_published_original} type="date" className='form-control input-default'
                                     onValueChanged={(date) => setDate(date, 'dat_published_original')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Serie: {values.serie_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getSerie(query, callback)}
                                         onChange={(e) => setCombo(e, 'serie_id', setSelectedSerie)}
                                         defaultOptions
                                         value={selectedSerie} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Coleção: {values.collection_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCollection(query, callback)}
                                         onChange={(e) => setCombo(e, 'collection_id', setSelectedCollection)}
                                         defaultOptions
                                         value={selectedCollection} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Editora: {values.publisher_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getPublishers(query, callback)}
                                         onChange={(e) => setCombo(e, 'publisher_id', setSelectedPublisher)}
                                         defaultOptions
                                         value={selectedPublisher} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Formato: {values.format_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getItemFormat(query, callback)}
                                         onChange={(e) => setCombo(e, 'format_id', setSelectedItemFormat)}
                                         defaultOptions
                                         value={selectedItemFormat} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Idioma: {values.language_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getLanguage(query, callback)}
                                         onChange={(e) => setCombo(e, 'language_id', setSelectedLanguage)}
                                         defaultOptions
                                         value={selectedLanguage} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor capa: {values.cover_price}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.cover_price * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values) => {
                                          setCurrency(values, 'cover_price')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor pago: {values.payed_price}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.payed_price * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values) => {
                                          setCurrency(values, 'payed_price')
                                      }}/>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Dimensões</label>
                            <input value={values.dimensions} onChange={set('dimensions')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Altura</label>
                            <input value={values.height} onChange={set('height')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Largura</label>
                            <input value={values.width} onChange={set('width')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">Profundidade</label>
                            <input value={values.thickness} onChange={set('thickness')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Resumo</label>
                            <textarea className='form-control' value={values.resumo} id="" cols="30" rows="10" onChange={set('resumo')}></textarea>
                        </div>
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
                actionModal={(e) => handleSubmit(e, URL_ITEM, values)}
            />
        </div>
    );
}

export default ModalItem