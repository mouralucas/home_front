import React, {useEffect, useState} from "react";
import {Account, AccountTransaction, Currency} from "../../Interfaces";
import {Category} from "../../../Interfaces";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {URL_CATEGORIES, URL_CURRENCY, URL_FINANCE_ACCOUNT} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import { format, parseISO } from 'date-fns';
import {Controller, useForm} from "react-hook-form";
import Modal from "../../../../Components/Modal";
import CurrencyInput from "../../../../Components/Form/CurrencyNew";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import Moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

/**
 *
 * @constructor
 *
 * Account Statement Modal With React Hook Form
 */
interface AccountStatementProps {
    transaction: AccountTransaction | undefined | null,
    modalState: boolean,
    hideModal: any
}

interface GetAccountResponse {
    success: boolean
    message: string
    statusCode: number
    quantity: number
    accounts: Account[]
}

interface GetCategoryResponse {
    success: boolean
    message: string
    statusCode: number
    quantity: number
    categories: Category[]
}

interface GetCurrencyResponse {
    success: boolean
    message: string
    statusCode: number
    quantity: number
    currencies: Currency[]
}

const DefaultTransaction: AccountTransaction = {
    transactionId: null,
    amount: 0,
    accountId: '',
    categoryId: '',
    currencyId: 'BRL',
    transactionCurrencyId: '',
    period: 0,
    exchangeRate: 0,
    taxPerc: 0,
    tax: 0,
    spreadPerc: 0,
    spread: 0,
    effectiveRate: 0,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    description: undefined,
    ownerId: '',
    createdAt: null,
    lastEditedAt: null,
}

const App = (props: AccountStatementProps) => {
    const {handleSubmit, control, reset} = useForm<AccountTransaction>()

    const [accounts, setAccounts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])
    const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction>(DefaultTransaction);

    useEffect(() => {
        // Set initial value if provided
        if (props.modalState && props.transaction) {
            reset(props.transaction);
        } else if (props.modalState && !props.transaction) {
            reset(DefaultTransaction);
        }


        // Load necessary information
        if (props.modalState) {
            getCurrency();
            getAccount();
            getCategory();
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultTransaction);
        }
    }, [props.modalState, props.transaction]);

    useEffect(() => {
        if (props.transaction) {
            setSelectedTransaction(props.transaction);
        }
    }, [currencies, categories, accounts]);

    const getAccount = () => {
        getFinanceData(URL_FINANCE_ACCOUNT).then((response: GetAccountResponse) => {
            let options = response.accounts.map((i: Account) =>
                ({value: i.accountId, label: i.nickname})
            );
            setAccounts(options);
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as contas bancárias');
        })
    }

    const getCategory = () => {
        getFinanceData(URL_CATEGORIES).then((response: GetCategoryResponse) => {
            let options = response.categories.map((i: Category) =>
                ({value: i.categoryId, label: i.name})
            );
            setCategories(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as categorias');
        })
    }

    const getCurrency = () => {
        getFinanceData(URL_CURRENCY).then((response: GetCurrencyResponse) => {
            let options = response.currencies.map((i: Currency) =>
                ({value: i.currencyId, label: i.symbol})
            );
            setCurrencies(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as moedas disponíveis');
        })
    }

    const onSubmit = (data: AccountTransaction, e: any) => {
        console.log(data)
        // postFinanceData(e, URL_FINANCE_ACCOUNT_TRANSACTION, data, false, "Item de extrato beta salvo").then(response => {
        //     // TODO: handle return here
        // }).catch((err: string | ToastOptions) => {
        //     toast.error('Erro ao salvar extrato beta')
        // })
    };

    const body = (): React.ReactElement => {
        let html: React.ReactElement =
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor=""></label>
                            <Controller
                                name="currencyId"
                                control={control}
                                rules={{required: false}}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={currencies}
                                        defaultValue={selectedTransaction?.currencyId}
                                        value={currencies.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor</label>
                            <Controller name={'amount'}
                                        control={control}
                                        rules={{required: false}}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values) => field.onChange(values.rawValue)} 
                                            />
                                        )}

                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data da compra</label>
                            <Controller
                                name={'transactionDate'}
                                control={control}
                                rules={{ required: false }}
                                defaultValue={selectedTransaction.transactionDate}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={parseISO(field.value)}
                                        onChange={(date) => {
                                            // Verifica se a data é `null`
                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : selectedTransaction.transactionDate);
                                        }}
                                        dateFormat="dd/MM/yyyy" // Exibe no formato brasileiro
                                        className="form-control"
                                        placeholderText="Selecione uma data"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Conta</label>
                            <Controller name={'accountId'}
                                        control={control}
                                        rules={{required: false}}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={accounts}
                                                value={accounts.find((c: any) => c.value === field.value)}
                                                onChange={(value: any) => field.onChange(value?.value)}
                                            />
                                        )}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Categoria</label>
                            <Controller name={'categoryId'}
                                        control={control}
                                        rules={{required: false}}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={categories}
                                                value={categories.find((c: any) => c.value === field.value)}
                                                onChange={(val) => field.onChange(val?.value)}
                                            />
                                        )}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <Controller name={'description'}
                                        control={control}
                                        rules={{required: false}}
                                        render={({field}) => (
                                            <textarea
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={field.onChange}
                                                className='form-control' ></textarea>
                                        )}
                            />
                        </div>
                    </div>
                </form>
            </div>

        return html
    }

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Extrato'}
                body={body()}
                fullscreen={false}
                actionModal={handleSubmit(onSubmit)}
                size={'lg'}
            />
        </div>
    );
}

export default App;