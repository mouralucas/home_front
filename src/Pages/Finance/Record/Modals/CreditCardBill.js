import Modal from '../../../../Components/Modal'
import {useState, forwardRef, useImperativeHandle} from "react";
import {Button} from "devextreme-react/button";
import {URL_BILLS, URL_CATEGORIES, URL_CREDIT_CARDS} from "../../../../Services/Axios/ApiUrls";
import axios from "../../../../Services/Axios/Axios";
import Select from "react-select";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Currency'
import {NumericFormat} from "react-number-format";

const App = (props) => {

    // Combo boxes
    const [cards, setCards] = useState();
    const [categories, setCategories] = useState();

    // Form variables
    const [values, setValues] = useState({
        card_id: '',
        category_id: '',
        amount: 0,
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

    const setCurrency = (values, name) => {
        return setValues(oldValues => ({...oldValues, [name]: values.value/100}));
    }

    // const showModal = () => {
    //     getCategories();
    //     getCards();
    //     setModalState(true);
    // }
    //
    // const hideModal = () => {
    //     setModalState(false);
    // }

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
                            <label htmlFor="">Valor: {values.amount}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.amount*100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrency(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.dat_purchase} type="date" className='form-control input-default' onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data pagamento</label>
                            <DateBox value={values.dat_payment} className='form-control input-default' onValueChanged={(date) => setDate(date, 'dat_payment')}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4">
                            <label htmlFor="">Cartão</label>
                            <Select formTarget={true} options={cards} onChange={setCombo}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Categoria</label>
                            <Select formTarget={true} options={categories} onChange={setCombo}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' value={values.description} id="" cols="30" rows="10" onChange={set('description')}></textarea>
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
                hideModal={props.hideModal}
                title={'Fatura'}
                body={body()}
                fullscreen={false}
                actionModal={setBill}
                size={'lg'}
            />
        </div>
    );
}

export default App