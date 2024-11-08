import React, {useEffect, useState} from "react";
import {Account, AccountTransaction, CashFlow, Currency} from "../../Interfaces";
import {Category, ReactSelectInterface} from "../../../Interfaces";
import {getData, getFinanceData} from "../../../../Services/Axios/Get";
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

interface GetCashFlowResponse {
    success: boolean
    message: string
    statusCode: number
    quantity: number
    cashFlow: CashFlow[]
}

const DefaultTransaction: AccountTransaction = {
    transactionId: null,
    amount: 0,
    // account: ReactSelectInterface | null
    accountId: '',
    nickname: '',
    // category: ReactSelectInterface | null
    categoryId: '',
    categoryName: '',
    // currency: ReactSelectInterface
    currencyId: 'BRL',
    currencySymbol: 'R$',
    transactionCurrencyId: '',
    transactionCurrencySymbol: 'R$',
    period: 0,
    exchangeRate: 0,
    taxPerc: 0,
    tax: 0,
    spreadPerc: 0,
    spread: 0,
    effectiveRate: 0,
    cashFlowId: 'OUTGOING', //Deprecated
    transactionDate: new Date(),
    description: '',
    ownerId: '',
    createdAt: null,
    lastEditedAt: null,
}

const App = (props: AccountStatementProps) => {
    const {handleSubmit, control, reset, setValue, getValues} = useForm<AccountTransaction>()

    const [accounts, setAccounts] = useState<ReactSelectInterface[]>([])
    const [categories, setCategories] = useState<ReactSelectInterface[]>([])
    const [currencies, setCurrencies] = useState<any>([])
    const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction>(DefaultTransaction);

    useEffect(() => {
        if (props.modalState) {
            getCurrency();
            getAccount();
            getCategory();
        }
    }, [props.modalState]);

    useEffect(() => {
        if (props.modalState && props.transaction) {
            setSelectedTransaction(props.transaction);
        }

        if (!props.modalState) {
            console.log('fechou')
            reset(DefaultTransaction);
        }
    }, [props.modalState]);

    const getAccount = () => {
        getFinanceData(URL_FINANCE_ACCOUNT, {accountType: "checking"}).then((response: GetAccountResponse) => {
            let options = response.accounts.map((i: Account) =>
                ({value: i.accountId, label: i.nickname})
            );
            setAccounts(options);
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as contas bancárias');
        })
    }

    const getCategory = () => {
        getFinanceData(URL_CATEGORIES, {showMode: 'all', module: 'finance'}).then((response: GetCategoryResponse) => {
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
            toast.error('Houve um erro ao buscar as moedas disponíveis ' + err);
        })
    }

    const onSubmit = (data: AccountTransaction, e: any) => {
        // Transform select objects to ID only
        // data.currencyId = data.currency.value
        // data.accountId = data.account?.value
        // data.categoryId = data.category?.value
        // data.cashFlowId = data.cashFlow.value

        console.log(data)
        // submit(e, URL_FINANCE_ACCOUNT_TRANSACTION, data, false, "Item de extrato beta salvo").then(response => {
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
                                rules={{ required: false }}
                                defaultValue={selectedTransaction.currencyId}
                                render={({ field }) => (
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
                        {/*<div className="col-4">*/}
                        {/*    <label htmlFor="">Conta</label>*/}
                        {/*    <Controller name={'account'}*/}
                        {/*                control={control}*/}
                        {/*                rules={{required: true}}*/}
                        {/*                defaultValue={{value: selectedTransaction.accountId, label: selectedTransaction.accountNickname}}*/}
                        {/*                render={({field}) => (*/}
                        {/*                    <Select options={accounts}*/}
                        {/*                            {...field}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div className="row">
                        {/*<div className="col-6">*/}
                        {/*    <label htmlFor="">Operação</label>*/}
                        {/*    <Controller name={'cashFlow'}*/}
                        {/*                control={control}*/}
                        {/*                rules={{required: false}}*/}
                        {/*                defaultValue={{value: selectedTransactions.cashFlowId, label: selectedTransactions.cashFlowId}}*/}
                        {/*                render={({field}) => (*/}
                        {/*                    <Select options={cashFlow}*/}
                        {/*                            {...field}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-6">*/}
                        {/*    <label htmlFor="">Categoria</label>*/}
                        {/*    <Controller name={'category'}*/}
                        {/*                control={control}*/}
                        {/*                rules={{required: false}}*/}
                        {/*                defaultValue={{value: selectedTransaction.categoryId, label: selectedTransaction.categoryName}}*/}
                        {/*                render={({field}) => (*/}
                        {/*                    <Select options={categories}*/}
                        {/*                            {...field}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div className="row">
                        {/*<div className="col-12">*/}
                        {/*    <label htmlFor="">Descrição</label>*/}
                        {/*    <Controller name={'description'}*/}
                        {/*                control={control}*/}
                        {/*                rules={{required: false}}*/}
                        {/*                render={({field}) => (*/}
                        {/*                    <textarea className='form-control' {...field}></textarea>*/}
                        {/*                )}*/}
                        {/*    />*/}
                        {/*</div>*/}
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