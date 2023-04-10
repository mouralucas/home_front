import Modal from '../../../../Components/Modal'
import React, {useEffect, useState} from "react";
import {URL_INVESTMENT} from "../../../../Services/Axios/ApiUrls";
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
const App = (props): JSX.Element => {
    const [investment, setInvestment] = useState([])
    const [selectedInvestment, setSelectedInvestment] = useState([])

    const [values, setValues] = useState({
        investmentId: undefined,
        amount: undefined,
        dat_payment: undefined,
        dat_purchase: undefined,
        datLastEdited: undefined,
        datCreated: "",
        description: undefined
    })

    useEffect(() => {
        if (props.investment && props.modalState) {
            setValues(props.investment);
        }

        if (!props.modalState) {
            // TODO: ajustar campos
            setValues({
                investmentId: null,
                amount: 0,
                dat_payment: new Date(),
                dat_purchase: new Date(),
                description: '',
                datCreated: null,
                datLastEdited: null
            });
            setSelectedInvestment(null);
        }
    }, [props.modalState, props.investment])


    useEffect(() => {
        if (props.investment) {
            setSelectedInvestment(investment.filter(i => i.value === props.investment.investmentId)[0]);
        }
    }, [investment, props.investment])

    const getInvestments = (query, callback) => {
        if (query) {
            callback(filterSelect(investment, query));
        } else {
            getData(URL_INVESTMENT).then(response => {
                console.log(response)
                let options = response === null ? {} : response?.investment.map(i => ({value: i.id, label: i.name}));
                callback(options);
                setInvestment(options)
            })
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
                        <div className="col-12">
                            <label htmlFor="">Investimento</label>
                            <AsyncSelect id={'combo_cards'}
                                         loadOptions={(query, callback) => getInvestments(query, callback)}
                                         onChange={(e) => setCombo(e, 'investmentId', setSelectedInvestment)}
                                         defaultOptions
                                         value={selectedInvestment}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <label htmlFor="">Título/descrição</label>
                            <input className='form-control input-default'/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.dat_purchase} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date) => setDate(date, 'dat_purchase')}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4">
                            <label htmlFor="">Quantidade</label>
                            <input type="text" className={'form-control input-default'}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Valor: {values.amount}</label>
                            <Currency className='form-control input-default'
                                      value={values.amount * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrency(values, 'amount')
                                      }}/>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' value={values.description} id="" cols={30} rows={10}
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
                size={"lg"}
            />
        </div>
    );
}

export default App;