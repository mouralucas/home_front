import Modal from '../../../../Components/Modal'
import {useEffect, useState} from "react";
import {URL_BILLS, URL_CATEGORIES, URL_CREDIT_CARDS} from "../../../../Services/Axios/ApiUrls";
import axios from "../../../../Services/Axios/Axios";
import Select from "react-select";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Currency'
import AsyncSelect from "react-select/async";

const App = (props) => {

    // Combo boxes
    const [cards, setCards] = useState([]);
    const [categories, setCategories] = useState();

    // Form variables
    const val_inicial = {
        card_id: 'nubank',
        category_id: 1,
        amount: 17.32,
        dat_payment: '2022-01-01',
        dat_purchase: '2022-02-01',
        description: 'Eh um cu mesmo'
    }


    const [values, setValues] = useState(val_inicial)

    useEffect(() => {
        if (props.modalState) {
            getCards();
            getCategories();
        }
        // setValues(oldValues => ({...oldValues, [values.card_id]: 'nubank'}));

    }, [props.modalState])

    const getCards = () => {
        axios.get(URL_CREDIT_CARDS).then(response => {
                setCards(response.data.credit_cards.map(card => ({name: 'card_id', value: card.id, label: card.name})));
                console.log(cards);
            }
        )
    }

    const getCategories = () => {
        axios.get(URL_CATEGORIES, {params: {show_mode: 'all', module: 'finance'}}).then(response => {
            setCategories(response.data.categories.map(category => ({name: 'category_id', value: category.id, label: category.name})))
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
        return setValues(oldValues => ({...oldValues, [name]: values.value / 100}));
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

    const loadOptions = (query, callback) => {
        if (query) {
            console.log('sadasd');
        }
        else {
            // var customerID = queryString.parse(location.search).customer;
            axios.get(URL_CREDIT_CARDS)
                .then(response => {
                    // response.data.categories.map(category => ({name: 'category_id', value: category.id, label: category.name}))
                    const items = response.data.credit_cards;
                    console.log(response.data);
                    let options = items.map(function (item) {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    });
                    callback(options);
                    this.setState({selectValue: options[0]});
                });
        }
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
                            <label htmlFor="">Cartão</label>
                            <AsyncSelect formTarget={true} loadOptions={(query, callback) => loadOptions(query, callback)} onChange={setCombo} defaultOptions={false} value={values.card_id}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Categoria</label>
                            <Select formTarget={true} options={categories} onChange={setCombo} />
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