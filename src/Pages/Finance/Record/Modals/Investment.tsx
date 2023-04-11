import Modal from '../../../../Components/Modal'
import React, {useEffect, useState} from "react";
import {URL_FINANCE_BANK, URL_FINANCE_INVESTMENT_TYPE, URL_INVESTMENT} from "../../../../Services/Axios/ApiUrls";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Currency'
import AsyncSelect from "react-select/async";
import {getData} from "../../../../Services/Axios/Get";
import filterSelect from "../../../../Utils/DataHandling";
import {format as formatDate} from "../../../../Utils/DateTime";
import handleSubmit from "../../../../Services/Axios/Post";
import {toast} from "react-toastify";


/**
 * Modal to create new entry for the credit card bill
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const App = (props): JSX.Element => {
    /*
    * A ideia do investimento é registrar qualquer novo investimento feito
    *  Deve apenas conter o valor investido, a evolução vai ser salva na tabela investment_statement
    * O "parente" indica o primeiro depósito naquele investimento (normalmente só terá um por investimento,
    *       porém em casos como cofrinhos e ultravioleta os investimentos são recorrentes no mesmo registro) qualquer
    *       outro depósito será registrado com o id da referência e essa referência tem o valor somado. O primeiro
    *       registro sempre vai ter duas linhas, o "parente" e o depósito realizado (pensar melhor nisso)
    * Em investimentos com liquidez antes do vencimento podem haver retiradas parciais, serão novos registros com o parent
    *       respectivo, subitraindo do total do parent
    *
    * */

    const [investment, setInvestment] = useState([])
    const [selectedInvestment, setSelectedInvestment] = useState([])

    const [investmentType, setInvestmentType] = useState([])
    const [selectedInvestmentType, setSelectedInvestmentType] = useState([])

    const [custodian, setCustodian] = useState([])
    const [selectedCustodian, setSelectedCustodian] = useState([])

    const [cashFlow, setCashFlow] = useState([])
    const [selectedCashFlow, setSelectedCashFlow] = useState([])

    const [interestRate, setInterestRate] = useState([])
    const [selectedInterestRate, setSelectedInterestRate] = useState([])

    const [values, setValues] = useState({
        investmentId: undefined,
        date: null,

        price: undefined,
        amount: undefined,

        datMaturity: undefined,
        dat_purchase: undefined,
        datLastEdited: undefined,

        investmentTypeId: undefined,
        custodianId: undefined,

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
                date: new Date(),

                price: 0,
                amount: 0,

                datMaturity: new Date(),
                dat_purchase: new Date(),

                description: '',

                investmentTypeId: null,
                custodianId: null,

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
                let options = response === null ? {} : response?.investment.map(i => ({value: i.id, label: i.name}));
                callback(options);
                setInvestment(options)
            })
        }
    }

    const getInvestmentType = (query, callback) => {
        if (query) {
            callback(filterSelect(investmentType, query));
        } else {
            getData(URL_FINANCE_INVESTMENT_TYPE, {show_mode: 'child'}).then(response => {
                let options = response === null ? {} : response?.investment_type.map(i => ({
                    value: i.id,
                    label: i.name
                }));
                callback(options);
                setInvestmentType(options)
            }).catch(err => {
                toast.error('Houve um erro ao buscar os tipos de investimentos')
            })
        }
    }

    const getCustodian = (query, callback) => {
        if (query) {
            callback(filterSelect(custodian, query));
        } else {
            getData(URL_FINANCE_BANK).then(response => {
                let options = response === null ? {} : response?.bank.map(i => ({value: i.id, label: i.name}));
                callback(options);
                setCustodian(options)
            }).catch(err => {
                toast.error('Houve um erro ao buscar os agentes de custódia')
            })
        }
    }

    const getCashFlow = (query, callback) => {
        if (query) {
            callback(filterSelect(cashFlow, query));
        } else {
            let options = [
                {value: 'INCOMING', label: 'Entrada'},
                {value: 'OUTGOING', label: 'Saída'}
            ]
            callback(options)
            // @ts-ignore
            setSelectedCashFlow(options?.filter(cashFlow => cashFlow.value === values.cashFlowId)[0])
            setCashFlow(options)
        }
    }

    const getInterestRate = (query, callback) => {
        if (query) {
            callback(filterSelect(interestRate, query));
        } else {
            let options = [
                {value: 'FLOATING', label: 'Variável'},
                {value: 'FIXED', label: 'Fixo'}
            ]
            callback(options)
            // @ts-ignore
            setSelectedInterestRate(options?.filter(interestRate => interestRate.value === values.interestrateId)[0])
            setInterestRate(options)
        }
    }

    const setInvestmentCombo = (e, name, setFunction) => {
        if (e != null) {
            setFunction(e)
            getData(URL_INVESTMENT).then(response => {
                setValues(response.investment)
            }).catch(err => {
                toast.error('Houve um erro ao buscar detalhes do investimento')
            })
            return
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
                            <AsyncSelect id={'combo_investments'}
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
                                     onValueChanged={(date) => setDate(date, 'date')}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-4">
                            <label htmlFor="">Quantidade</label>
                            <input type={'number'} className={'form-control input-default'}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Preço {values.price}</label>
                            <Currency className='form-control input-default'
                                      value={values.amount * 100}
                                      onFocus={event => event.target.select()}
                                      onValueChange={(values, sourceInfo) => {
                                          setCurrency(values, 'price')
                                      }}/>
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
                        <div className="col-3">
                            <label htmlFor="">Operação</label>
                            <AsyncSelect id={'combo_cash_flow'}
                                         loadOptions={(query, callback) => getCashFlow(query, callback)}
                                         onChange={(e) => setCombo(e, 'cashFlowId', setSelectedCashFlow)}
                                         defaultOptions
                                         value={selectedCashFlow}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Indexação</label>
                            <AsyncSelect id={'combo_interest_rate'}
                                         loadOptions={(query, callback) => getInterestRate(query, callback)}
                                         onChange={(e) => setCombo(e, 'interestRateId', setSelectedInterestRate)}
                                         defaultOptions
                                         value={selectedInterestRate}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Índice</label>
                            <input type="text" className='form-control input-default'/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Tipo</label>
                            <AsyncSelect id={'combo_investment_type'}
                                         loadOptions={(query, callback) => getInvestmentType(query, callback)}
                                         onChange={(e) => setCombo(e, 'investmentTypeId', setSelectedInvestmentType)}
                                         defaultOptions
                                         value={selectedInvestmentType}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Data vencimento</label>
                            <DateBox value={values.datMaturity} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date) => setDate(date, 'datMaturity')}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Agente de custódia</label>
                            <AsyncSelect id={'combo_custodian'}
                                         loadOptions={(query, callback) => getCustodian(query, callback)}
                                         onChange={(e) => setCombo(e, 'custodianId', setSelectedCustodian)}
                                         defaultOptions
                                         value={selectedCustodian}/>
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