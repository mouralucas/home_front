import Modal from "../../../../Components/Modal";
import {useEffect, useState} from "react";
import {URL_ACCOUNT_STATEMENT, URL_ACCOUNTS, URL_CATEGORIES, URL_CURRENCY} from "../../../../Services/Axios/ApiUrls";
import Currency from "../../../../Components/Currency";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import handleSubmit from '../../../../Services/Axios/Post'
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";
import {format as formatDate} from "../../../../Utils/DateTime";


interface BankStatementProps {
    statement: any,
    modalState: boolean,
    hideModal: any
}

interface BankStatementValues {
    amount: number,
    accountId: string | null,
    categoryId: string | null,
    currencyId: "BRL",
    purchasedAt: Date,
    description: string,
    createdAt: null,
    lastEditedAt: null,
    cashFlowId: string
}

const App = (props: BankStatementProps) => {
    const [account, setAccount] = useState<any[] | null>([]);
    const [selectedAccount, setSelectedAccount] = useState<any | null>();

    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<any[] | null>([]);

    const [currency, setCurrency] = useState<any[] | null>([])
    const [selectedCurrency, setSelectedCurrency] = useState<any[] | null>([])

    const [cashFlow, setCashFlow] = useState<any[] | null>([])
    const [selectedCashFlow, setSelectedCashFlow] = useState<any[] | null>([]);

    const [values, setValues] = useState<BankStatementValues>({
        amount: 0,
        accountId: null,
        categoryId: null,
        currencyId: "BRL",
        purchasedAt: new Date(),
        description: "",
        createdAt: null,
        lastEditedAt: null,
        cashFlowId: "OUTGOING"
    });

    useEffect(() => {
        if (props.statement && props.modalState) {
            setValues(props.statement);
        }

        if (!props.modalState) {
            setValues({
                amount: 0,
                accountId: null,
                categoryId: null,
                currencyId: "BRL",
                purchasedAt: new Date(),
                description: '',
                createdAt: null,
                lastEditedAt: null,
                cashFlowId: 'OUTGOING'
            });
            setSelectedCategory(null);
            setSelectedAccount(null);
        }
    }, [props.modalState, props.statement])

    useEffect(() => {
        if (props.statement) {
            // @ts-ignore
            setSelectedCategory(category.filter(i => i.value === props.statement.categoryId)[0]);
        }
    }, [category, props.statement])

    useEffect(() => {
        if (props.statement) {
            setSelectedAccount(account?.filter(i => i.value === props.statement.accountId)[0]);
        }
    }, [account, props.statement])

    useEffect(() => {
        if (props.statement) {
            setSelectedCurrency(currency?.filter(i => i.value === props.statement.currencyId)[0])
        }
    }, [currency, props.statement])

    useEffect(() => {
        if (props.statement) {
            setSelectedCashFlow(cashFlow?.filter(i => i.value === props.statement.cashFlowId)[0])
        }
    }, [cashFlow, props.statement])

    const getCurrency = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(currency, query));
        } else {
            getData(URL_CURRENCY).then(response => {
                let options = response == null ? {} : response.currency.map((i: { id: any; symbol: any; }) => ({value: i.id, label: i.symbol}))
                callback(options);
                setSelectedCurrency(options.filter((currency: { value: string; }) => currency.value === values.currencyId))
                setCurrency(options)
            })
        }
    }

    const getCategory = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(category, query));
        } else {
            getData(URL_CATEGORIES, {show_mode: 'all', module: 'finance'}).then(response => {
                let options = response == null ? {} : response.categories.map((i: { id: any; name: string; }) => ({value: i.id, label: i.name}))

                callback(options);
                setSelectedCategory(options.filter((category: { value: any; }) => category.value === values.categoryId)[0]);
                setCategory(options);
            });
        }
    }

    const getAccounts = (query: any, callback: any) => {
        if (query) {
            callback(filterSelect(account, query));
        } else {
            getData(URL_ACCOUNTS).then(response => {
                let options = response.accounts.map((i: { id: any; nickname: string; }) => ({value: i.id, label: i.nickname}))
                callback(options);
                setSelectedAccount(options?.filter((account: { value: any; }) => account.value === values.accountId)[0])
                setAccount(options)
            });
        }
    }

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

    const set = (name: any) => {
        return ({target: {value}}: any) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setComboValues = (e: any, name: any, setFunction: any) => {
        if (e !== null) {
            setFunction(e);
            return setValues(oldValues => ({...oldValues, [name]: e.value}));
        }
        return setValues(oldValues => ({...oldValues, [name]: e.value}));
    }

    const setDateValues = (e: any, name: any) => {
        if (e.value !== null) {
            return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
        } else {
            return setValues(oldValues => ({...oldValues, [name]: e.value}))
        }
    }

    const setCurrencyValues = (values: any, name: any) => {
        return setValues(oldValues => ({...oldValues, [name]: values.value / 100}));
    }


    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor=""></label>
                            <AsyncSelect
                                loadOptions={(query, callback) => getCurrency(query, callback)}
                                onChange={(e) => setComboValues(e, 'currencyId', setSelectedCurrency)}
                                defaultOptions
                                value={selectedCurrency}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor</label>
                            <Currency className='form-control input-default'
                                      value={values.amount * 100}
                                      onFocus={(event: { target: { select: () => any; }; }) => event.target.select()}
                                      currency={values.currencyId}
                                      onValueChange={(values: any, sourceInfo: any) => {
                                          setCurrencyValues(values, 'amount')
                                      }}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
                            <DateBox value={values.purchasedAt} type="date" className='form-control input-default'
                                     useMaskBehavior={true}
                                     onValueChanged={(date: any) => setDateValues(date, 'purchasedAt')}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Conta</label>
                            <AsyncSelect
                                loadOptions={(query, callback) => getAccounts(query, callback)}
                                onChange={(e) => setComboValues(e, 'accountId', setSelectedAccount)} defaultOptions
                                value={selectedAccount}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Operação {values.cashFlowId}</label>
                            <AsyncSelect
                                loadOptions={(query, callback) => getCashFlow(query, callback)}
                                onChange={(e) => setComboValues(e, 'cashFlowId', setSelectedCashFlow)}
                                defaultOptions
                                value={selectedCashFlow}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Categoria</label>
                            <AsyncSelect loadOptions={(query, callback) => getCategory(query, callback)}
                                         onChange={(e) => setComboValues(e, 'categoryId', setSelectedCategory)}
                                         defaultOptions value={selectedCategory}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' value={values.description} id="" rows={10}
                                      onChange={set('description')}></textarea>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <span className='text-small text-muted'>
                            Criado em: {formatDate(values.createdAt)}
                        </span>
                        <span className="text-small text-muted">
                            Editado em: {formatDate(values.lastEditedAt)}
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
                actionModal={(e: any) => handleSubmit(e, URL_ACCOUNT_STATEMENT, values, false, "Item de extrato salvo")}
                size={'lg'}
            />
        </div>
    );
}

export default App;