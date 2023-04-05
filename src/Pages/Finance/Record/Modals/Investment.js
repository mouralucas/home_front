import Modal from '../../../../Components/Modal'
import {useEffect, useState} from "react";
import {
    URL_CREDIT_CARD_BILL,
    URL_CATEGORIES,
    URL_CREDIT_CARD,
    URL_ACCOUNT_STATEMENT,
    URL_INVESTMENT
} from "../../../../Services/Axios/ApiUrls";
import axios from "../../../../Services/Axios/Axios";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Currency'
import AsyncSelect from "react-select/async";
import {getData} from "../../../../Services/Axios/Get";
import filterSelect from "../../../../Utils/DataHandling";
import {format as formatDate} from "../../../../Utils/DateTime";
import handleSubmit from "../../../../Services/Axios/Post";

/**
 * Modal to create new entry for the credit card bill
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const App = (props) => {
    // Combo boxes
    const [card, setCard] = useState([]);
    const [selectedCard, setSelectedCard] = useState();
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const [values, setValues] = useState({})

    useEffect(() => {
        if (props.bill && props.modalState) {
            setValues(props.bill);
        }

        if (!props.modalState) {
            setValues({
                credit_card_id: null,
                category_id: null,
                amount: 0,
                dat_payment: new Date(),
                dat_purchase: new Date(),
                description: '',
                datCreated: null,
                datLastEdited: null
            });
            setSelectedCategory(null);
            setSelectedCard(null);
        }
    }, [props.modalState, props.bill])

    useEffect(() => {
        if (props.bill) {
            setSelectedCategory(category.filter(i => i.value === props.bill.category_id)[0]);
        }
    }, [category, props.bill])

    useEffect(() => {
        if (props.bill) {
            setSelectedCard(card.filter(i => i.value === props.bill.credit_card_id)[0]);
        }
    }, [card, props.bill])

    const getCreditCard = (query, callback) => {
        if (query) {
            callback(filterSelect(card, query));
        } else {
            getData(URL_CREDIT_CARD).then(response => {
                let options = response === null ? {} : response.credit_cards.map(i => ({value: i.id, label: i.name}));
                callback(options);
                setSelectedCard(options.filter(card => card.value === values.credit_card_id)[0]);
                setCard(options);
            });
        }
    }
    const set = name => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = (e, name, setFunction) => {
        if (e !== null) {
            setFunction(e);
            return setValues(oldValues => ({...oldValues, [name]: e.value}));

        }
        return setValues(oldValues => ({...oldValues, [name]: e.value}));
    }

    const setDate = (e, name) => {
        if (e.value !== null) {
            return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
        } else {
            return setValues(oldValues => ({...oldValues, [name]: e.value}))
        }
    }

    const setCurrency = (values, name) => {
        return setValues(oldValues => ({...oldValues, [name]: values.value / 100}));
    }
    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Valor: {values.amount}</label>
                            <Currency className='form-control input-default'
                                      value={values.amount * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrency(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.dat_purchase} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data pagamento</label>
                            <DateBox value={values.dat_payment} className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date) => setDate(date, 'dat_payment')}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4">
                            <label htmlFor="">Cartão: {values.card_id}</label>
                            <AsyncSelect id={'combo_cards'} formTarget={true}
                                         loadOptions={(query, callback) => getCreditCard(query, callback)}
                                         onChange={(e) => setCombo(e, 'card_id', setSelectedCard)} defaultOptions
                                         value={selectedCard}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Categoria: {values.category_id}</label>
                            <AsyncSelect id={'combo_categories'} formTarget={true}
                                         loadOptions={(query, callback) => getCategory(query, callback)}
                                         onChange={(e) => setCombo(e, 'category_id', setSelectedCategory)}
                                         defaultOptions value={selectedCategory}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' value={values.description} id="" cols="30" rows="10"
                                      onChange={set('description')}></textarea>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <span className='text-small text-muted'>
                            Criado em: {formatDate(values.datCreated)}
                        </span>
                        <span className="text-small text-muted">
                            Editado em: {formatDate(values.datLastEdited)}
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
                hideModal={props.hideModal}
                title={'Investimento'}
                body={body()}
                fullscreen={false}
                actionModal={(e) => handleSubmit(e, URL_INVESTMENT, values, false, "Item de investimento salvo")}
                size={'lg'}
            />
        </div>
    );
}

export default App