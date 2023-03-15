import Modal from "../../../../Components/Modal";
import {useEffect, useState} from "react";
import {URL_ACCOUNTS, URL_CATEGORIES, URL_ACCOUNT_STATEMENT, URL_CURRENCY} from "../../../../Services/Axios/ApiUrls";
import Currency from "../../../../Components/Currency";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import handleSubmit from '../../../../Services/Axios/Post'
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";
import {format as formatDate} from "../../../../Utils/DateTime";
import Select from "react-select";




const App = (props) => {
    const [account, setAccount] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState();

    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const [currency, setCurrency] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState([])

    const [cashFlow, setCashFlow] = useState([])
    const [selectedCashFlow, setSelectedCashFlow] = useState();

    const [values, setValues] = useState({});

    useEffect(() => {
        if (props.statement && props.modalState) {
            setValues(props.statement);
        }

        if (!props.modalState) {
            setValues({
                amount: 0,
                account_id: null,
                category_id: null,
                currencyId: "BRL",
                dat_purchase: new Date(),
                description: '',
                datCreated: null,
                datLastEdited: null,
                cashFlowId: 'outgoing'
            });
            setSelectedCategory(null);
            setSelectedAccount(null);
        }
    }, [props.modalState, props.statement])

    useEffect(() => {
        if (props.statement) {
            setSelectedCategory(category.filter(i => i.value === props.statement.category_id)[0]);
        }
    }, [category, props.statement])

    useEffect(() => {
        if (props.statement) {
            setSelectedAccount(account.filter(i => i.value === props.statement.account_id)[0]);
        }
    }, [account, props.statement])

    // useEffect(() => {
    //     if (values.cashFlowId === 'outcoming' || values.cashFlowId === 'undefined'){
    //         let name = 'amount'
    //         let newValue = values.amount * -1
    //         setValues(oldValues => ({...oldValues, [name]: newValue}));
    //     } else {
    //         console.log('in')
    //     }
    // }, [values.cashFlowId])

    const getCurrency = (query, callback) => {
        if (query) {
            callback(filterSelect(currency, query));
        } else {
            getData(URL_CURRENCY).then(response => {
                let options = response == null ? {} : response.currency.map(i => ({value: i.id, label:i.symbol}))
                callback(options);
                setSelectedCurrency(options.filter(currency => currency.value === values.currencyId))
                setCurrency(options)
            })
        }
    }

    const getCategory = (query, callback) => {
        if (query) {
            callback(filterSelect(category, query));
        } else {
            getData(URL_CATEGORIES, {show_mode: 'all', module: 'finance'}).then(response => {
                let options = response == null ? {} : response.categories.map(i => ({value: i.id, label: i.name}))

                callback(options);
                setSelectedCategory(options.filter(category => category.value === values.category_id)[0]);
                setCategory(options);
            });
        }
    }

    const getAccounts = (query, callback) => {
        if (query) {
            callback(filterSelect(account, query));
        } else {
            getData(URL_ACCOUNTS).then(response => {
                let options = response.bank_accounts.map(i => ({value: i.id, label: i.nm_bank}))
                callback(options);
                setSelectedAccount(options?.filter(account => account.value === values.account_id)[0])
                setAccount(options)
            });
        }
    }

    const getCashFlow = (query, callback) => {
        if (query){
            callback(filterSelect(cashFlow, query));
        }else {
            let options = [
                { value: 'INCOMING', label: 'Entrada' },
                { value: 'OUTGOING', label: 'Saída' }
            ]
            callback(options)
            setSelectedCashFlow(options?.filter(cashFlow => cashFlow.value === values.cashFlowId)[0])
            setCashFlow(options)
        }
    }

    const set = name => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setComboValues = (e, name, setFunction) => {
        if (e !== null) {
            setFunction(e);
            return setValues(oldValues => ({...oldValues, [name]: e.value}));
        }
        return setValues(oldValues => ({...oldValues, [name]: e.value}));
    }

    const setDateValues = (e, name) => {
        if (e.value !== null) {
            return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
        } else {
            return setValues(oldValues => ({...oldValues, [name]: e.value}))
        }
    }

    const setCurrencyValues = (values, name) => {
        return setValues(oldValues => ({...oldValues, [name]: values.value / 100}));
    }



    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor=""></label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCurrency(query, callback)}
                                         onChange={(e) => setComboValues(e, 'currencyId', setSelectedCurrency)}
                                         defaultOptions
                                         value={selectedCurrency}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor: {values.amount}</label>
                            <Currency className='form-control input-default'
                                      value={values.amount * 100}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrencyValues(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.dat_purchase} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date) => setDateValues(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Conta {values.account_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getAccounts(query, callback)}
                                         onChange={(e) => setComboValues(e, 'account_id', setSelectedAccount)} defaultOptions
                                         value={selectedAccount}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Operação {values.cashFlowId}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCashFlow(query, callback)}
                                         onChange={(e) => setComboValues(e, 'cashFlowId', setSelectedCashFlow)}
                                         defaultOptions
                                         value={selectedCashFlow}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Categoria {values.category_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCategory(query, callback)}
                                         onChange={(e) => setComboValues(e, 'category_id', setSelectedCategory)}
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
                title={'Extrato'}
                body={body()}
                fullscreen={false}
                actionModal={(e) => handleSubmit(e, URL_ACCOUNT_STATEMENT, values, false, "Item de extrato salvo")}
                size={'lg'}
            />
        </div>
    );
}

export default App;