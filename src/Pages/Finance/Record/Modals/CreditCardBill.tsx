import Modal from '../../../../Components/Modal'
import {useEffect, useState} from "react";
import {URL_CATEGORIES, URL_CREDIT_CARD, URL_CREDIT_CARD_BILL} from "../../../../Services/Axios/ApiUrls";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Currency'
import AsyncSelect from "react-select/async";
import {getData} from "../../../../Services/Axios/Get";
import filterSelect from "../../../../Utils/DataHandling";
import {format as formatDate} from "../../../../Utils/DateTime";
import handleSubmit from "../../../../Services/Axios/Post";


interface CreditCardValues {
    creditCardId: null,
    category_id?: null,
    amount: 0,
    dat_payment: Date,
    dat_purchase: Date,
    description: '',
    datCreated: null,
    datLastEdited: null
}

/**
 * Modal to create new entry for the credit card bill
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const App = (props: any) => {
    // Combo boxes
    const [card, setCard] = useState<any | null>([]);
    const [selectedCard, setSelectedCard] = useState<any | null>();
    const [category, setCategory] = useState<any | null>([]);
    const [selectedCategory, setSelectedCategory] = useState<any | null>();

    const [values, setValues] = useState<CreditCardValues>({
        creditCardId: null,
        category_id: null,
        amount: 0,
        dat_payment: new Date(),
        dat_purchase: new Date(),
        description: '',
        datCreated: null,
        datLastEdited: null
    })

    useEffect(() => {
        if (props.bill && props.modalState) {
            setValues(props.bill);
        }

        if (!props.modalState) {
            setValues({
                creditCardId: null,
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
            setSelectedCategory(category.filter((i: { value: any; }) => i.value === props.bill.category_id)[0]);
        }
    }, [category, props.bill])

    useEffect(() => {
        if (props.bill) {
            setSelectedCard(card.filter((i: { value: any; }) => i.value === props.bill.credit_card_id)[0]);
        }
    }, [card, props.bill])

    const getCreditCard = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(card, query));
        } else {
            getData(URL_CREDIT_CARD).then(response => {
                let options = response === null ? {} : response?.credit_cards.map((i: { id: any; name: any; }) => ({value: i.id, label: i.name}));
                callback(options);
                setSelectedCard(options.filter((card: { value: any; }) => card.value === values?.creditCardId)[0]);
                setCard(options);
            });
        }
    }

    const getCategory = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(category, query))
        } else {
            getData(URL_CATEGORIES, {show_mode: 'all', module: 'finance'}).then(response => {
                let options = response == null ? {} : response.categories.map((i: { id: any; name: any; }) => ({value: i.id, label: i.name}))
                callback(options);
                setSelectedCategory(options.filter((category: { value: any; }) => category.value === values?.category_id)[0]);
                setCategory(options);
            });
        }
    }

    const set = (name: any) => {
        return ({target: {value}}: any) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = (e: any, name: any, setFunction: any) => {
        if (e !== null) {
            setFunction(e);
            return setValues(oldValues => ({...oldValues, [name]: e.value}));

        }
        return setValues(oldValues => ({...oldValues, [name]: e.value}));
    }

    const setDate = (e: any, name: any) => {
        if (e.value !== null) {
            return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
        } else {
            return setValues(oldValues => ({...oldValues, [name]: e.value}))
        }
    }

    const setCurrency = (values: any, name: any) => {
        return setValues(oldValues => ({...oldValues, [name]: values.value / 100}));
    }

    const getPaymentDate = (e: any, purchaseDate: any) => {
        e.preventDefault()
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
                                      onFocus={(event: { target: { select: () => any; }; }) => event.target.select()}
                                      onValueChange={(values: any, sourceInfo: any) => {
                                          setCurrency(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.dat_purchase} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date: any) => setDate(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data pagamento</label>
                            <DateBox value={values.dat_payment} className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date: any) => setDate(date, 'dat_payment')}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4">
                            <label htmlFor="">Cartão: {values.creditCardId}</label>
                            <AsyncSelect id={'combo_cards'}
                                         loadOptions={(query, callback) => getCreditCard(query, callback)}
                                         onChange={(e) => setCombo(e, 'card_id', setSelectedCard)} defaultOptions
                                         value={selectedCard}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Categoria: {values.category_id}</label>
                            <AsyncSelect id={'combo_categories'}
                                         loadOptions={(query, callback) => getCategory(query, callback)}
                                         onChange={(e) => setCombo(e, 'category_id', setSelectedCategory)}
                                         defaultOptions value={selectedCategory}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' value={values.description} id=""
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
                title={'Fatura'}
                body={body()}
                fullscreen={false}
                actionModal={(e: any) => handleSubmit(e, URL_CREDIT_CARD_BILL, values, false, "Item de fatura salvo")}
                size={'lg'}
            />
        </div>
    );
}

export default App