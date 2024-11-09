import React, {useEffect, useState} from "react";
import {Account, AccountTransaction, Currency} from "../../Interfaces";
import {Category} from "../../../Interfaces";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {URL_CATEGORIES, URL_CURRENCY, URL_FINANCE_ACCOUNT} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {Controller, useForm} from "react-hook-form";
import Modal from "../../../../Components/Modal";
import CurrencyInput from "../../../../Components/Form/CurrencyNew";
import DateBox from "devextreme-react/date-box";
import Select from 'react-select';
import Moment from "moment";

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
    transactionDate: new Date(),
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
        // Load necessary information
        if (props.modalState) {
            getCurrency();
            getAccount();
            getCategory();
        }

        // Set initial value if provided
        if (props.modalState && props.transaction) {
            console.log(props.transaction);
            setSelectedTransaction(props.transaction);
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultTransaction);
        }
    }, [props.modalState, props.transaction]);

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
                                defaultValue={selectedTransaction.currencyId}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={currencies}
                                        value={currencies.find((c: any) => c.value === field.value)}  // usa field.value para o valor atual
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
                                                value={field.value} // use o valor do field
                                                onValueChange={(values) => field.onChange(values.rawValue)} // atualize apenas com `rawValue` ou `formattedValue`
                                                defaultValue={selectedTransaction.amount} // valor inicial, se houver
                                            />
                                        )}

                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data da compra</label>
                            <Controller name={'transactionDate'}
                                        control={control}
                                        rules={{required: false}}
                                        defaultValue={selectedTransaction.transactionDate}
                                        render={({field}) => (
                                            <DateBox
                                                className='form-control input-default'
                                                useMaskBehavior={true}
                                                value={selectedTransaction.transactionDate}
                                                displayFormat={'dd/MM/yyyy'}
                                                onValueChanged={(e) => field.onChange(Moment(e.value).format('YYYY-MM-DD'))}
                                                ref={null}
                                            />
                                        )}

                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Conta</label>
                            <Controller name={'accountId'}
                                        control={control}
                                        rules={{required: false}}
                                        defaultValue={selectedTransaction.accountId}
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
                                        defaultValue={selectedTransaction.categoryId}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={categories}
                                                value={currencies.find((c: any) => c.value === field.value)}
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
                                                value={field.value ?? selectedTransaction.description}
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