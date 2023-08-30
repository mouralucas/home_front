import Modal from '../../../../Components/Modal'
import {ReactElement, useEffect, useState} from "react";
import {URL_CATEGORIES, URL_CREDIT_CARD, URL_CREDIT_CARD_BILL} from "../../../../Services/Axios/ApiUrls";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Form/Currency'
import AsyncSelect from "react-select/async";
import {getData} from "../../../../Services/Axios/Get";
import filterSelect from "../../../../Utils/DataHandling";
import {format as formatDate, getDefaultDate} from "../../../../Utils/DateTime";
import handleSubmit from "../../../../Services/Axios/Post";
import {CreditCardBill} from "../../Interfaces";


const DefaultCreditCardBill: CreditCardBill = {
    creditCardId: null,
    creditCardName: null,
    categoryId: null,
    categoryName: null,
    amount: 0,
    paymentAt: getDefaultDate(),
    purchaseAt: getDefaultDate(),
    description: '',
    createdAt: undefined,
    lastEditedAt: undefined
}

interface CreditCardBillProps {
    creditCardBill: CreditCardBill | null
    modalState: boolean
    hideModal: any
}

/**
 * Modal to create new entry for the credit card bill
 * @param props
 * @returns {React.ReactElement}
 * @constructor
 */
const App = (props: CreditCardBillProps): ReactElement => {
    // Combo boxes
    const [creditCard, setCreditCard] = useState<any | null>([]);
    const [selectedCreditCard, setSelectedCreditCard] = useState<any | null>();
    const [category, setCategory] = useState<any | null>([]);
    const [selectedCategory, setSelectedCategory] = useState<any | null>();

    const [creditCardBill, setCreditCardBill] = useState<CreditCardBill>(DefaultCreditCardBill)

    useEffect(() => {
        if (props.creditCardBill && props.modalState) {
            setCreditCardBill(props.creditCardBill);
        }

        if (!props.modalState) {
            setCreditCardBill(DefaultCreditCardBill);
            setSelectedCategory(null);
            setSelectedCreditCard(null);
        }
    }, [props.modalState, props.creditCardBill])

    useEffect(() => {
        if (props.creditCardBill) {
            setSelectedCategory(category.filter((i: { value: any; }) => i.value === props.creditCardBill?.categoryId)[0]);
        }
    }, [category, props.creditCardBill])

    useEffect(() => {
        if (props.creditCardBill) {
            setSelectedCreditCard(creditCard.filter((i: { value: any; }) => i.value === props.creditCardBill?.creditCardId)[0]);
        }
    }, [creditCard, props.creditCardBill])

    const getCreditCard = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(creditCard, query));
        } else {
            getData(URL_CREDIT_CARD).then(response => {
                let options = response === null ? {} : response?.creditCards.map((i: { id: string; name: string; }) => ({value: i.id, label: i.name}));
                callback(options);
                setSelectedCreditCard(options.filter((card: { value: any; }) => card.value === creditCardBill?.creditCardId)[0]);
                setCreditCard(options);
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
                setSelectedCategory(options.filter((category: { value: any; }) => category.value === creditCardBill?.categoryId)[0]);
                setCategory(options);
            });
        }
    }

    const set = (name: any) => {
        return ({target: {value}}: any) => {
            setCreditCardBill(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = (e: any, name: any, setFunction: any) => {
        if (e !== null) {
            setFunction(e);
            return setCreditCardBill(oldValues => ({...oldValues, [name]: e.value}));

        }
        return setCreditCardBill(oldValues => ({...oldValues, [name]: e.value}));
    }

    const setDate = (e: any, name: any) => {
        if (e.value !== null) {
            return setCreditCardBill(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
        } else {
            return setCreditCardBill(oldValues => ({...oldValues, [name]: e.value}))
        }
    }

    const setCurrency = (values: any, name: any) => {
        return setCreditCardBill(oldValues => ({...oldValues, [name]: values.value / 100}));
    }

    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Valor: {creditCardBill.amount}</label>
                            <Currency className='form-control input-default'
                                      value={creditCardBill.amount * 100}
                                      onFocus={(event: { target: { select: () => any; }; }) => event.target.select()}
                                      onValueChange={(values: any, sourceInfo: any) => {
                                          setCurrency(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={creditCardBill.purchaseAt} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date: any) => setDate(date, 'purchaseAt')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data pagamento</label>
                            <DateBox value={creditCardBill.paymentAt} className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date: any) => setDate(date, 'paymentAt')}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4">
                            <label htmlFor="">Cartão: {creditCardBill.creditCardId}</label>
                            <AsyncSelect id={'combo_cards'}
                                         loadOptions={(query, callback) => getCreditCard(query, callback)}
                                         onChange={(e) => setCombo(e, 'card_id', setSelectedCreditCard)} defaultOptions
                                         value={selectedCreditCard}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Categoria</label>
                            <AsyncSelect id={'combo_categories'}
                                         loadOptions={(query, callback) => getCategory(query, callback)}
                                         onChange={(e) => setCombo(e, 'category_id', setSelectedCategory)}
                                         defaultOptions value={selectedCategory}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' value={creditCardBill.description} id=""
                                      onChange={set('description')}></textarea>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <span className='text-small text-muted'>
                            Criado em: {formatDate(creditCardBill.createdAt)}
                        </span>
                        <span className="text-small text-muted">
                            Editado em: {formatDate(creditCardBill.lastEditedAt)}
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
                actionModal={(e: any) => handleSubmit(e, URL_CREDIT_CARD_BILL, creditCardBill, false, "Item de fatura salvo")}
                size={'lg'}
            />
        </div>
    );
}

export default App