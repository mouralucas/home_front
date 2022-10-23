import Modal from "../../../../Components/Modal";
import {useEffect, useState} from "react";
import {URL_ACCOUNTS, URL_CATEGORIES, URL_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import Currency from "../../../../Components/Currency";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import handleSubmit from '../../../../Services/Axios/Post'
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";


const App = (props) => {
    const [account, setAccount] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState();
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

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
                dat_purchase: new Date(),
                description: '',
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
                setSelectedAccount(options?.filter(account => account.value === values.account_id))
                setAccount(options)
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
        return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
    }

    const setCurrency = (values, name) => {
        return setValues(oldValues => ({...oldValues, [name]: values.value / 100}));
    }

    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor: {values.amount}</label>
                            <Currency className='form-control input-default'
                                      value={values.amount * 100}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrency(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.dat_purchase} type="date" className='form-control input-default'
                                     onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Conta {values.account_id}</label>
                            <AsyncSelect formTarget={true} loadOptions={(query, callback) => getAccounts(query, callback)} onChange={(e) => setCombo(e, 'account_id', setSelectedAccount)} defaultOptions value={selectedAccount}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Categoria {values.category_id}</label>
                            <AsyncSelect formTarget={true} loadOptions={(query, callback) => getCategory(query, callback)} onChange={(e) => setCombo(e, 'category_id', setSelectedCategory)} defaultOptions value={selectedCategory}/>
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
                title={'Extrato'}
                body={body()}
                fullscreen={false}
                actionModal={(e) => handleSubmit(e, URL_STATEMENT, values)}
                size={'lg'}
            />
        </div>
    );
}

export default App;