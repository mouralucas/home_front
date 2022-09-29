import Modal from "../../../Components/Modal";
import {useEffect, useState} from "react";
import axios from "../../../Services/Axios/Axios";
import {URL_AUTHORS, URL_ITEM, URL_ITEM_COLLECTION, URL_ITEM_SERIE, URL_ITEM_TYPES, URL_PUBLISHERS} from "../../../Services/Axios/ApiUrls";
import Select from "react-select";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import Currency from "../../../Components/Currency";
import AsyncSelect from "react-select/async";
import filterSelect from "../Util";

const ModalItem = (props) => {
    // Combo boxes variables
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [series, setSeries] = useState([]);
    const [collections, setCollections] = useState([]);
    const [publishers, setPublisher] = useState([]);
    const [itemFormats, setItemFormats] = useState([]);
    const [languages, setLanguages] = useState([]);

    // Form variables
    const [values, setValues] = useState({
        item_id: 0,
        status_id: '',
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
        item_type: 0,
        pages: 0,
        volume: 1,
        edition: 1,
        dat_published: null,
        dat_published_original: null,
        serie_id: 0,
        collection_id: 0,
        publisher_id: '',
        format_id: 0,
        language_id: 0,
        cover_price: 0,
        payed_price: 0,
        dimensions: '',
        height: '',
        width: '',
        thickness: '',
        resumo: '',
    })

    useEffect(() => {
        if (props.modalState) {
            getAuthors();
            getItemTypes();
            getSerie();
            getCollection();
            getPublishers();
        }
    }, [props.modalState])

    const getAuthors = (query, callback) => {
        if (query) {
            callback(filterSelect(authors, query));
        } else {
            axios.get(URL_AUTHORS).then(response => {
                let options = response.data.authors.map(author => ({value: author.id, label: author.nm_full}));
                setAuthors(options);

                const selected = authors.filter(category => category.value === values.main_author_id);
                setSelectedAuthor(selected[0]);
                callback(options);
                // setAuthorsList(response.data.authors.map(author => ({value: author.id, label: author.nm_full})));
            });
        }
    }

    const getItemTypes = () => {
        axios.get(URL_ITEM_TYPES).then(response => {
            setItemTypes(response.data.types.map(type => ({value: type.id, label: type.text})))
        });
    }

    const getSerie = () => {
        axios.get(URL_ITEM_SERIE).then(response => {
            setSeries(response.data.series.map(serie => ({value: serie.id, label: serie.name})))
        });
    }

    const getCollection = () => {
        axios.get(URL_ITEM_COLLECTION).then(response => {
            setCollections(response.data.collections.map(collection => ({value: collection.id, label: collection.name})))
        });
    }

    const getPublishers = () => {
        axios.get(URL_PUBLISHERS).then(response => {
            setPublisher(response.data.publishers.map(publisher => ({value: publisher.id, label: publisher.name})))
        });
    }

    const set = (name) => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    // const setCombo = (e, name) => {
    //     console.log(values["authors_id"]);
    //     if (Array.isArray(e)) {
    //         var list_values = [];
    //         e.forEach(key => list_values.push(key.value));
    //         return setValues(oldValues => ({...oldValues, [name]: list_values}));
    //     }
    //
    //     if (e !== null) {
    //         return setValues(oldValues => ({...oldValues, [name]: e.value}));
    //
    //     }
    //     return setValues(oldValues => ({...oldValues, [name]: e.value}));
    // }
    const setCombo = (e, name, setFunction) => {
        if (e !== null) {
            setFunction(e);
            return setValues(oldValues => ({...oldValues, [name]: e.value}));

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
    const setItem = async e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, JSON.stringify(values[key])));

        await axios({
            method: 'post',
            url: URL_ITEM,
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            return response.data
        }).catch(response => {
            return {'error': response}
        })
    }

    const body = () => {
        let body_html =
            <form onSubmit={setItem}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="{'combo_author'}">Autor principal: {values.main_author_id}</label>
                            <AsyncSelect formTarget={true} loadOptions={(query, callback) => getAuthors(query, callback)} onChange={(e) => setCombo(e, 'main_author_id', setSelectedAuthor)} defaultOptions value={selectedAuthor}/>
                        </div>
                        {/*<div className="col-4">*/}
                        {/*    <label htmlFor="{'combo_author'}">Outros autores: {values.authors_id}</label>*/}
                        {/*    <Select formTarget={true} options={authors} onChange={(e) => setCombo(e, 'authors_id')}*/}
                        {/*            isMulti={true}/>*/}
                        {/*</div>*/}
                        {/*<div className="col-4">*/}
                        {/*    <label htmlFor="{'combo_translator'}">Tradutor: {values.translator_id}</label>*/}
                        {/*    <Select formTarget={true} options={authors} onChange={(e) => setCombo(e, 'authors_id')}*/}
                        {/*            isMulti={true}/>*/}
                        {/*</div>*/}
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="{'nm_title'}">Título</label>
                            <input value={values.title} onChange={set('title')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="{'subtitle'}">Sub-título</label>
                            <input value={values.subtitle} onChange={set('subtitle')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="{'nm_author'}">Título original</label>
                            <input value={values.title_original} onChange={set('title_original')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="{'subtitle'}">Sub-título original</label>
                            <input value={values.subtitle_original} onChange={set('subtitle_original')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="{'nm_author'}">ISBN</label>
                            <input value={values.isbn} onChange={set('isbn')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="{'subtitle'}">ISBN-10</label>
                            <input value={values.isbn10} onChange={set('isbn10')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Tipo: {values.item_type}</label>
                            <Select formTarget={true} options={itemTypes}
                                    onChange={(e) => setCombo(e, 'item_type_id')}/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'pages'}">Páginas</label>
                            <input value={values.pages} onChange={set('pages')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{volume'}">Volume</label>
                            <input value={values.volume} onChange={set('volume')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'edition'}">Edição</label>
                            <input value={values.edition} onChange={set('edition')} type="text"
                                   className='form-control input-default'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="">Lançamento</label>
                            <DateBox value={values.dat_published} type="date" className='form-control input-default'
                                     onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-2">
                            <label htmlFor="">Lançamento original</label>
                            <DateBox value={values.dat_published_original} type="date"
                                     className='form-control input-default'
                                     onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Serie: {values.serie_id}</label>
                            <Select formTarget={true} options={series}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Coleção: {values.collection_id}</label>
                            <Select formTarget={true} options={collections}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Editora: {values.publisher_id}</label>
                            <Select formTarget={true} options={publishers}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Formato: {values.format_id}</label>
                            <Select formTarget={true} options={itemFormats}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Idioma: {values.language_id}</label>
                            <Select formTarget={true} options={languages}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor capa: {values.cover_price}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.amount * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values) => {
                                          setCurrency(values, 'cover_price')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor pago: {values.payed_price}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.amount * 100}
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
                actionModal={setItem}
            />
        </div>
    );
}

export default ModalItem