import Modal from '../../../../Components/Modal'
import {useState} from "react";
import {Button as Btn} from "devextreme-react/button";
import {URL_AUTHORS, URL_BILLS, URL_CATEGORIES, URL_CREDIT_CARDS, URL_ITEM} from "../../../../Services/Axios/ApiUrls";
import axios from "../../../../Services/Axios/Axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import DatPurchase from 'devextreme-react/date-box';
import DatPayment from 'devextreme-react/date-box';
import Moment from 'moment';

const App = () => {
    const [modalState, setModalState] = useState(false);

    // Combo boxes variables
    const [cards, setCards] = useState();
    const [categories, setCategories] = useState();
    // const [startDate, setStartDate] = useState(new Date());

    // Form variables
    const [values, setValues] = useState({
        card_id: '',
        category_id: '',
        amount: '',
        dat_payment: Moment(new Date()).format('YYYY-MM-DD'),
        dat_purchase: Moment(new Date()).format('YYYY-MM-DD'),
        description: '',
    })

    const getCards = () => {
        axios.get(URL_CREDIT_CARDS).then(response => {
                setCards(response.data.credit_cards.map(author => ({name: 'card_id', value: author.id, label: author.name})));
            }
        )
    }

    const getCategories = () => {
        axios.get(URL_CATEGORIES, {params: {show_mode: 'all', module: 'finance'}}).then(response => {
            setCategories(response.data.categories.map(publisher => ({name: 'category_id', value: publisher.id, label: publisher.name})))
        });
    }

    const set = name => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = object => {
        if (object !== null) {
            return setValues(oldValues => ({...oldValues, [object.name]: object.value}));
        }
        return setValues(oldValues => ({...oldValues, [object.name]: object.value}));
    }

    const setDate = (e, name) => {
        return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
    }

    const showModal = () => {
        getCategories();
        getCards();
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    // Form submit
    const setBill = async e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));

        await axios({
            method: 'post',
            url: URL_BILLS,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        }).catch(response => {
            return {'error': response}
        })
    }

    const body = () => {
        let body_html =
            <form onSubmit={setBill}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Valor</label>
                            <input type="text" onChange={set('amount')} value={values.amount} className='form-control input-default'/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data compra</label>
                            <DatPurchase value={values.dat_purchase} className='form-control input-default' onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data pagamento</label>
                            <DatPayment value={values.dat_payment} className='form-control input-default' onValueChanged={(date) => setDate(date, 'dat_payment')}/>
                        </div>
                    </div>
                    <div class='row'>
                        <div className="col-4">
                            <label htmlFor="">Cartão: {values.card_id}</label>
                            <Select formTarget={true} options={cards} onChange={setCombo}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Categoria: {values.author_id}</label>
                            <Select formTarget={true} options={categories} onChange={setCombo}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição {values.description}</label>
                            <textarea className='form-control' value={values.description} id="" cols="30" rows="10" onChange={set('description')}></textarea>
                        </div>
                        {/*<div className="col-2">*/}
                        {/*    <label htmlFor="{'combo_author'}">Cartão: {values.author_id}</label>*/}
                        {/*    <Select formTarget={true} options={cards} onChange={setCombo}/>*/}
                        {/*</div>*/}
                        {/*<div className="col-2">*/}
                        {/*    <label htmlFor="">Categoria: {values.author_id}</label>*/}
                        {/*    <Select formTarget={true} options={categories} onChange={setCombo}/>*/}
                        {/*</div>*/}
                        {/*<div className="col-2">*/}
                        {/*    <label htmlFor="{'nm_author'}">Título</label>*/}
                        {/*    <input value={values.title} onChange={set('title')} type="text" className='form-control input-default'/>*/}
                        {/*</div>*/}
                        {/*<div className="col-2">*/}
                        {/*    <label htmlFor="{'subtitle'}">Outra coisa</label>*/}
                        {/*    <input value={values.subtitle} onChange={set('subtitle')} type="text" className='form-control input-default'/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </form>;

        return body_html

    }

    return (
        <div>
            <Modal
                showModal={modalState}
                hideModal={hideModal}
                title={'Fatura'}
                body={body()}
                fullscreen={false}
                actionModal={setBill}
                size={'lg'}
            />
            <Btn text={'Adicionar Fatura'} icon={'add'} onClick={showModal}></Btn>
        </div>
    );
}

export default App