import Modal from '../../../../Components/Modal'
import {useState} from "react";
import {URL_BILLS, URL_CATEGORIES, URL_CREDIT_CARDS} from "../../../../Services/Axios/ApiUrls";
import axios from "../../../../Services/Axios/Axios";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Currency'
import AsyncSelect from "react-select/async";

const App = (props) => {

    // Combo boxes
    const [selectedCard, setSelectedCard] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    // Form variables
    const val_inicial = {
        card_id: null,
        category_id: 'aluguel',
        amount: 17.32,
        dat_payment: '2022-01-01',
        dat_purchase: '2022-02-01',
        description: 'Eh um cu mesmo'
    }


    const [values, setValues] = useState(val_inicial)

    const getCreditCard = (query, callback) => {
        if (query) {
        }
        else {
            axios.get(URL_CREDIT_CARDS).then(response => {
                    let options = response.data.credit_cards.map(function (item) {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    });
                    callback(options);
                    const selected = options.filter(card => card.value === values.card_id)
                    setSelectedCard(selected[0]);
                });
        }
    }

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
                                      defaultValue={values.amount * 100}
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
                            <label htmlFor="">Cartão: {values.card_id}</label>
                            <AsyncSelect id={'combo_cards'} formTarget={true} loadOptions={(query, callback) => getCreditCard(query, callback)} onChange={(e) => setCombo(e, 'card_id', setSelectedCard)} defaultOptions value={selectedCard}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Categoria: {values.category_id}</label>
                            <AsyncSelect id={'combo_categories'} formTarget={true} loadOptions={(query, callback) => getCategory(query, callback)} onChange={(e) => setCombo(e, 'category_id', setSelectedCategory)} defaultOptions value={selectedCategory} />
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