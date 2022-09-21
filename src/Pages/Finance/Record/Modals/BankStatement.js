import Modal from "../../../../Components/Modal";
import {useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_ACCOUNTS, URL_CATEGORIES, URL_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import Currency from "../../../../Components/Currency";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import handleSubmit from '../../../../Services/Axios/Post'
import AsyncSelect from "react-select/async";


const App = (props) => {
    const defaultValues = {
        amount: 17.30,
        account_id: null,
        category_id: null,
        dat_purchase: new Date(),
        description: '',
    }

    const [values, setValues] = useState(defaultValues)

    const [selectedAccount, setSelectedAccount] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    // const showModal = () => {
    //     getCategories();
    //     getAccounts();
    //     setModalState(true);
    // }
    //
    // const hideModal = () => {
    //     setModalState(false);
    // }

    const getCategory = (query, callback) => {
        axios.get(URL_CATEGORIES, {params: {show_mode: 'all', module: 'finance'}}).then(response => {
            let options = response.data.categories.map(function (item) {
                return {
                    value: item.id,
                    label: item.name,
                }
            });
            callback(options)
            const selected = options.filter(category => category.value === values.category_id);
            setSelectedCategory(selected[0]);
        });
    }

    const getAccounts = (query, callback) => {
        // axios.get(URL_ACCOUNTS, {params: {show_mode: 'all', module: 'finance'}}).then(response => {
        //     setAccounts(response.data.bank_accounts.map(publisher => ({name: 'account_id', value: publisher.id, label: publisher.nm_bank})))
        // });

        axios.get(URL_ACCOUNTS).then(response => {
            let options = response.data.bank_accounts.map(function (item) {
                return {
                    value: item.id,
                    label: item.nm_bank,
                }
            });
            callback(options)
            const selected = options.filter(category => category.value === values.category_id);
            setSelectedAccount(selected[0]);
        });
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
    // const setStatement = e => {
    //     // User state from father to update table, if possible
    //     let response = HandleSubmit(e, URL_STATEMENT, values);
    // }

    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor: {values.amount}</label>
                            <Currency className='form-control input-default'
                                      defaultValue={values.amount * 100}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrency(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.dat_purchase} type="date" className='form-control input-default' onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
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
                    <div class='row'>

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