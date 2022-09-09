import Modal from "../../../../Components/Modal";
import {Button} from "devextreme-react/button";
import {useState} from "react";
import axios from "../../../../Services/Axios/Axios";
import {URL_CATEGORIES, URL_ACCOUNTS, URL_BILLS, URL_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import Currency from "../../../../Components/Currency";
import DateBox from "devextreme-react/date-box";
import Select from "react-select";
import Moment from "moment/moment";
import handleSubmit from '../../../../Services/Axios/Post'


const App = () => {
    const [modalState, setModalState] = useState(false);

    // Combo boxes
    const [accounts, setAccounts] = useState();
    const [categories, setCategories] = useState();

    const [values, setValues] = useState({
        amount: 0,
        dat_purchase: new Date(),
        account_id: 0,
        description: ''
    })

    const showModal = () => {
        getCategories();
        getAccounts();
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
    }

    const getCategories = () => {
        axios.get(URL_CATEGORIES, {params: {show_mode: 'all', module: 'finance'}}).then(response => {
            setCategories(response.data.categories.map(publisher => ({name: 'category_id', value: publisher.id, label: publisher.name})))
        });
    }

    const getAccounts = () => {
        axios.get(URL_ACCOUNTS, {params: {show_mode: 'all', module: 'finance'}}).then(response => {
            setAccounts(response.data.bank_accounts.map(publisher => ({name: 'category_id', value: publisher.id, label: publisher.nm_bank})))
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

    // const setStatement = e => {
    //     // User state from father to update table, if possible
    //     let response = HandleSubmit(e, URL_STATEMENT, values);
    // }

    const body = () => {
        let body_html =
            <form >
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
                            <label htmlFor="">Conta</label>
                            <Select formTarget={true} options={accounts} onChange={setCombo}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Categoria</label>
                            <Select formTarget={true} options={categories} onChange={setCombo}/>
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
                showModal={modalState}
                hideModal={hideModal}
                title={'Fatura'}
                body={body()}
                fullscreen={false}
                actionModal={(e) => handleSubmit(e, URL_STATEMENT, values)}
                size={'lg'}
            />
            <Button text={'Adicionar extrato'} icon={'add'} onClick={showModal}></Button>
        </div>
    );
}

export default App;