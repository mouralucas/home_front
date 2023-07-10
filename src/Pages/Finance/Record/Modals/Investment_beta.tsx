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
import Card from '../../../../Components/Card'
import {any} from "prop-types";

interface InvestmentValues {
    investmentId: any,
    parentId: any,
    name: any,

    date: any,

    price: any,
    amount: any,
    quantity: any,
    maturityDate: any,
    investmentTypeId: any,
    interestRate: any,
    interestIndex: any,
    custodianId: any,
    cashFlowId: any,
    createDate: any,
    lastEditDate: any,
}
/**
 * Modal to create new entry for the credit card bill
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const App = (props: any): JSX.Element => {
    /*
    * A ideia do investimento é registrar qualquer novo investimento feito
    *  Deve apenas conter o valor investido, a evolução vai ser salva na tabela investment_statement
    * O "parente" indica o primeiro depósito naquele investimento (normalmente só terá um por investimento,
    *       porém em casos como cofrinhos e ultravioleta os investimentos são recorrentes no mesmo registro) qualquer
    *       outro depósito será registrado com o id da referência e essa referência tem o valor somado. O primeiro
    *       registro sempre vai ter duas linhas, o "parente" e o depósito realizado (pensar melhor nisso)
    * Em investimentos com liquidez antes do vencimento podem haver retiradas parciais, serão novos registros com o parent
    *       respectivo, subtraindo do total do parent
    *
    * */

    const [parentObj, setParentObj] = useState<any|null>([])
    const [parent, setParent] = useState<any|null>([])
    const [selectedParent, setSelectedParent] = useState<any|null>([])

    const [investmentType, setInvestmentType] = useState<any|null>([])
    const [selectedInvestmentType, setSelectedInvestmentType] = useState<any|null>([])

    const [custodian, setCustodian] = useState<any|null>([])
    const [selectedCustodian, setSelectedCustodian] = useState<any|null>([])

    const [cashFlow, setCashFlow] = useState<any|null>([])
    const [selectedCashFlow, setSelectedCashFlow] = useState<any|null>([])

    const [interestRate, setInterestRate] = useState<any|null>([])
    const [selectedInterestRate, setSelectedInterestRate] = useState<any|null>([])

    const [values, setValues] = useState<InvestmentValues>({
        investmentId: undefined,
        parentId: undefined,
        name: undefined,


        date: undefined,

        price: undefined,
        amount: undefined,
        quantity: undefined,
        maturityDate: any,
        investmentTypeId: undefined,
        interestRate: undefined,
        interestIndex: undefined,
        custodianId: undefined,
        cashFlowId: undefined,
        createDate: undefined,
        lastEditDate: undefined,
    })

    useEffect(() => {
        if (props.investment && props.modalState) {
            setValues(props.investment);
        }

        if (!props.modalState) {
            // TODO: ajustar campos
            setValues({
                investmentId: null,
                parentId: null,
                name: null,
                date: new Date().getDate(),
                price: 0,
                amount: 0,
                quantity: 0,
                maturityDate: null,
                investmentTypeId: null,
                interestRate: null,
                interestIndex: null,
                custodianId: null,
                cashFlowId: 'INCOMING',
                createDate: null,
                lastEditDate: null
            });
            setSelectedParent(null);
            setSelectedInterestRate(null);
        }
    }, [props.modalState, props.investment])


    const getParentInvestments = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(parent, query));
        } else {
            getData(URL_INVESTMENT, {'show_mode': 'father'}).then(response => {
                let options = response === null ? {} : response?.investment.map((i: { id: any; name: any; }) => ({value: i.id, label: i.name}));
                callback(options);
                setSelectedParent(options?.filter((i: { value: any; }) => i.value === values.parentId)[0])
                setParentObj(response?.investment)
                setParent(options)
            })
        }
    }
    // useEffect to set the combo when it has default value
    useEffect(() => {
        if (props.investment) {
            setSelectedParent(parent.filter((i: { value: any; }) => i.value === props.investment.parentId)[0]);
        }
    }, [parent, props.investment])

    const getInvestmentType = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(investmentType, query));
        } else {
            getData(URL_FINANCE_INVESTMENT_TYPE, {show_mode: 'child'}).then(response => {
                let options = response === null ? {} : response?.investment_type.map((i: { id: any; name: string; }) => ({
                    value: i.id,
                    label: i.name
                }));
                callback(options);
                setSelectedInvestmentType(options?.filter((i: { value: any; }) => i.value === values.investmentTypeId)[0])
                setInvestmentType(options)
            }).catch(err => {
                toast.error('Houve um erro ao buscar os tipos de investimentos')
            })
        }
    }

    // useEffect to set the combo when it has default value
    useEffect(() => {
        if (props.investment) {
            setSelectedInvestmentType(investmentType.filter((i: { value: any; }) => i.value === props.investment.investmentTypeId)[0]);
        }
    }, [investmentType, props.investment])

    const getCustodian = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(custodian, query));
        } else {
            getData(URL_FINANCE_BANK).then(response => {
                let options = response === null ? {} : response?.bank.map((i: { id: any; name: string; }) => ({value: i.id, label: i.name}));
                callback(options);
                setSelectedCustodian(options?.filter((i: { value: any; }) => i.value === values.custodianId))
                setCustodian(options)
            }).catch(err => {
                toast.error('Houve um erro ao buscar os agentes de custódia')
            })
        }
    }

    // useEffect to set the combo when it has default value
    useEffect(() => {
        if (props.investment) {
            setSelectedCustodian(custodian.filter((i: { value: any; }) => i.value === props.investment.custodianId)[0]);
        }
    }, [custodian, props.investment])

    const getCashFlow = (query: any, callback: any) => {
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

    // useEffect to set the combo when it has default value
    useEffect(() => {
        if (props.investment) {
            setSelectedCashFlow(cashFlow.filter((i: { value: any; }) => i.value === props.investment.cashFlowId)[0]);
        }
    }, [cashFlow, props.investment])

    const getInterestRate = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(interestRate, query));
        } else {
            let options = [
                {value: 'FLOATING', label: 'Variável'},
                {value: 'FIXED', label: 'Fixo'}
            ]
            callback(options)
            setSelectedInterestRate(options?.filter(interestRata => interestRata.value === values.interestRate))
            setInterestRate(options)
        }
    }
    // useEffect to set the combo when it has default value
    useEffect(() => {
        if (props.investment) {
            setSelectedInterestRate(interestRate.filter((i: { value: any; }) => i.value === props.investment.interestRate)[0]);
        }
    }, [interestRate, props.investment])

    const setParentInvestment = (e: any, name: any, setFunction: any) => {
        // if (e !== null)
        let parent_investment = e !== null ? parentObj.filter((i: { id: any; }) => i.id === e.value)[0] : null
        setCombo(e, name, setFunction);
        setSelectedInterestRate(interestRate.filter((i: { value: any; }) => i.value === parent_investment?.interestRate)[0]);
        setValues(oldValues => ({...oldValues, 'interestRate': parent_investment?.interestRate}))
        setSelectedInvestmentType(investmentType.filter((i: { value: any; }) => i.value === parent_investment?.investmentTypeId)[0]);
        setValues(oldValues => ({...oldValues, 'investmentTypeId': parent_investment?.investmentTypeId}))
        setSelectedCustodian(custodian.filter((i: { value: any; }) => i.value === parent_investment?.custodianId)[0]);
        setValues(oldValues => ({...oldValues, 'custodianId': parent_investment?.custodianId}))
        setValues(oldValues => ({...oldValues, 'name': e!== null ? parent_investment.name : ''}))
        setValues(oldValues => ({...oldValues, 'maturityDate': parent_investment?.maturityDate}))
        setValues(oldValues => ({...oldValues, 'interestIndex': parent_investment?.interestIndex}))
    }

    const body = (): JSX.Element => {
        let body_html =
            <>
                <Card marginTop={'mt-0'}>
                    <Card.Body>
                        <div className="conteiner-fluid">
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Investimento</label>
                                    <AsyncSelect id={'combo_parent'}
                                                 loadOptions={(query, callback) => getParentInvestments(query, callback)}
                                                 onChange={(e) => setParentInvestment(e, 'parentId', setSelectedParent)}
                                                 defaultOptions
                                                 isClearable={true}
                                                 escapeClearsValue={true}
                                                 value={selectedParent}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Título/descrição</label>
                                    <input className='form-control input-default'
                                           onChange={set('name')}
                                           value={values.name}/>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-3">
                                    <label htmlFor="">Tipo</label>
                                    <AsyncSelect id={'combo_investment_type'}
                                                 loadOptions={(query, callback) => getInvestmentType(query, callback)}
                                                 onChange={(e) => setCombo(e, 'investmentTypeId', setSelectedInvestmentType)}
                                                 defaultOptions
                                                 value={selectedInvestmentType}/>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Indexação {values.interestRate}</label>
                                    <AsyncSelect id={'combo_interest_rate'}
                                                 loadOptions={(query, callback) => getInterestRate(query, callback)}
                                                 onChange={(e) => setCombo(e, 'interestRate', setSelectedInterestRate)}
                                                 defaultOptions
                                                 value={selectedInterestRate}/>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Data vencimento</label>
                                    <DateBox value={values.maturityDate} type="date"
                                             className='form-control input-default'
                                             useMaskBehavior={true}
                                             showClearButton={true}
                                             onValueChanged={(date) => setDate(date, 'maturityDate')}/>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Agente de custódia</label>
                                    <AsyncSelect id={'combo_custodian'}
                                                 loadOptions={(query, callback) => getCustodian(query, callback)}
                                                 onChange={(e) => setCombo(e, 'custodianId', setSelectedCustodian)}
                                                 defaultOptions
                                                 value={selectedCustodian}/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <div className="container-fluid">
                            <div className='row'>
                                <div className="col-3">
                                    <label htmlFor="">Operação {values.cashFlowId}</label>
                                    <AsyncSelect id={'combo_cash_flow'}
                                                 loadOptions={(query, callback) => getCashFlow(query, callback)}
                                                 onChange={(e) => setCombo(e, 'cashFlow', setSelectedCashFlow)}
                                                 defaultOptions
                                                 value={selectedCashFlow}/>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Data compra</label>
                                    <DateBox value={values.date} type="date" className='form-control input-default'
                                             useMaskBehavior={true}
                                             onValueChanged={(date) => setDate(date, 'date')}/>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Quantidade</label>
                                    <input type={'number'} className={'form-control input-default'}
                                           onChange={set('quantity')}
                                           value={values.quantity}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Preço {values.price}</label>
                                    <Currency className='form-control input-default'
                                              value={values.price * 100}
                                              onFocus={(event: { target: { select: () => any; }; }) => event.target.select()}
                                              onValueChange={(values: any, sourceInfo: any) => {
                                                  setCurrency(values, 'price')
                                              }}/>
                                </div>

                            </div>

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
                                    <label htmlFor="">Índice</label>
                                    <input type="text" className='form-control input-default'
                                           onChange={set('interestIndex')}
                                           value={values.interestIndex}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <span className='text-small text-muted'>
                                    Criado em: {formatDate(values.createDate)}
                                </span>
                                <span className="text-small text-muted">
                                    Editado em: {formatDate(values.lastEditDate)}
                                </span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <form>

                </form>
            </>;

        return body_html

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

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Investimento beta'}
                body={body()}
                fullscreen={false}
                actionModal={(e: any) => handleSubmit(e, URL_INVESTMENT, values, false, "Item de investimento salvo")}
                size={"lg"}
            />
        </div>
    );
}

export default App;