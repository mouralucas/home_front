import Modal from "../../../Components/Modal";
import {useState} from "react";
import axios from "../../../Services/Axios/Axios";
import {Button as Btn} from "devextreme-react/button";
import {URL_AUTHORS, URL_ITEM, URL_PUBLISHERS} from "../../../Services/Axios/ApiUrls";
import Select from "react-select";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import Currency from "../../../Components/Currency";


const ModalItem = (props) => {
    const [modalState, setModalState] = useState(false);

    // Combo boxes variables
    const [authors, setAuthorsList] = useState([]);
    const [publishers, setPublisher] = useState();

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
        dat_published: new Date(),
        dat_published_original: new Date(),
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

    const getAuthors = () => {
        axios.get(URL_AUTHORS).then(response => {
                setAuthorsList(response.data.authors.map(author => ({value: author.id, label: author.nm_full})));
            }
        )
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

    const setCombo = (e, name) => {
        console.log(values["authors_id"]);
        if (Array.isArray(e)) {
            var list_values = [];
            e.forEach(key => list_values.push(key.value));
            return setValues(oldValues => ({...oldValues, [name]: list_values}));
        }

        if (e !== null) {
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

    const showModalItem = () => {
        getPublishers();
        getAuthors();
        setModalState(true);
    }

    const hideModalItem = () => {
        setModalState(false);
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
                            <Select formTarget={true} options={authors}
                                    onChange={(e) => setCombo(e, 'main_author_id')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="{'combo_author'}">Outros autores: {values.authors_id}</label>
                            <Select formTarget={true} options={authors} onChange={(e) => setCombo(e, 'authors_id')}
                                    isMulti={true}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="{'combo_author'}">Tradutor: {values.translator_id}</label>
                            <Select formTarget={true} options={authors} onChange={(e) => setCombo(e, 'authors_id')}
                                    isMulti={true}/>
                        </div>
                        {/*<div className="col-3">*/}
                        {/*    <label htmlFor="">Editora: {values.publisher_id}</label>*/}
                        {/*    <Select formTarget={true} options={publishers} onChange={(e) => setCombo(e, 'publisher_id')}/>*/}
                        {/*</div>*/}
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="{'nm_author'}">Título</label>
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
                            <Select formTarget={true} options={publishers}
                                    onChange={(e) => setCombo(e, 'item_type_id')}/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'pages'}">Páginas</label>
                            <input value={values.pages} onChange={set('pages')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'pages'}">Volume</label>
                            <input value={values.volume} onChange={set('volume')} type="text"
                                   className='form-control input-default'/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="{'pages'}">Edição</label>
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
                            <Select formTarget={true} options={publishers}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Coleção: {values.collection_id}</label>
                            <Select formTarget={true} options={publishers}
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
                            <Select formTarget={true} options={publishers}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Idioma: {values.language_id}</label>
                            <Select formTarget={true} options={publishers}
                                    onChange={(e) => setCombo(e, 'publisher_id')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor capa: {values.cover_price}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.amount * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrency(values, 'cover_price')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor pago: {values.payed_price}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.amount * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values, sourceInfo) => {
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
                showModal={modalState}
                hideModal={hideModalItem}
                title={'Item'}
                body={body()}
                fullscreen={true}
                actionModal={setItem}
            />
            <Btn text={'Adicionar Item'} icon={'add'} onClick={showModalItem}></Btn>
        </div>
    );
}

export default ModalItem