import React, {useEffect, useState} from "react";
import {Account, CashFlow, Currency, AccountTransaction} from "../../Interfaces";
import {Category, ReactSelectInterface} from "../../../Interfaces";
import {getData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_ACCOUNT, URL_CATEGORIES, URL_CURRENCY, URL_FINANCE_ACCOUNT_TRANSACTION, URL_FINANCE_CASH_FLOW} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {Controller, useForm} from "react-hook-form";
import DropdownList from 'react-widgets/DropdownList'
import Modal from "../../../../Components/Modal";
import submit from "../../../../Services/Axios/Post";
// import CurrencyInput from "../../../../Components/Form/Currency";
// import CurrencyInputNew2 from "../../../../Components/Form/CurrencyNew2";
// import CurrencyInputNew from "../../../../Components/Form/CurrencyNew";
import CurrencyInput from '@ericblade/react-currency-input';
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
    statement: AccountTransaction | undefined | null,
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

interface AccountStatementValues {
    amount: number,
    account: ReactSelectInterface | null
    accountId: string | null | undefined
    accountNickname: string | null | undefined
    category: ReactSelectInterface | null
    categoryId: string | null | undefined
    categoryName: string | null
    currency: ReactSelectInterface
    currencyId: string | null | undefined
    currencySymbol: string
    transactionDate: string
    description: string
    createdAt: null
    lastEditedAt: null
    cashFlow: ReactSelectInterface
    cashFlowId: string | null | undefined
    cashFlowName: string
}

const App = (props: AccountStatementProps) => {
    const {handleSubmit, control, setValue, getValues} = useForm<AccountStatementValues>()

    const [accounts, setAccounts] = useState<ReactSelectInterface[]>([])
    const [categories, setCategories] = useState<ReactSelectInterface[]>([])
    const [currencies, setCurrencies] = useState<ReactSelectInterface[]>([])
    const [cashFlow, setCashFlow] = useState<ReactSelectInterface[]>([])
    const [selectedTransactions, setSelectedTransactions] = useState<AccountStatementValues>({
        amount: 0,
        account: null,
        accountId: null,
        accountNickname: null,
        category: null,
        categoryId: null,
        categoryName: null,
        currency: {value: "BRL", label: "R$"},
        currencyId: "BRL",
        currencySymbol: "R$",
        transactionDate: Moment(new Date()).format('YYYY-MM-DD'),
        description: "",
        createdAt: null,
        lastEditedAt: null,
        cashFlow: {value: 'OUTGOING', label: 'Saída'},
        cashFlowId: "OUTGOING",
        cashFlowName: 'Saída'
    });

    useEffect(() => {
        if (props.modalState) {
            getCurrency();
            getAccount();
            getCategory();
        }
    }, [props.modalState]);

    const getAccount = () => {
        getData(URL_FINANCE_ACCOUNT, {accountType: "checking"}).then((response: GetAccountResponse) => {
            let options = response.accounts.map((i: Account) =>
                ({value: i.accountId, label: i.nickname})
            );
            setAccounts(options);
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as contas bancárias');
        })
    }

    const getCategory = () => {
        getData(URL_CATEGORIES, {showMode: 'all', module: 'finance'}).then((response: GetCategoryResponse) => {
            let options = response.categories.map((i: Category) =>
                ({value: i.categoryId, label: i.categoryName})
            );
            setCategories(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as categorias');
        })
    }

    const getCurrency = () => {
        getData(URL_CURRENCY).then((response: GetCurrencyResponse) => {
            let options = response.currencies.map((i: Currency) =>
                ({value: i.currencyId, label: i.symbol})
            );
            setCurrencies(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as moedas disponíveis');
        })
    }

    const getCashFlow= () => {
        getData(URL_FINANCE_CASH_FLOW).then((response: GetCashFlowResponse) => {
            let options = response.cashFlow.map((i: CashFlow) =>
                ({value: i.cashFlowId, label: i.cashFlowName})
            );
            setCashFlow(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as moedas disponíveis');
        })
    }

    const onSubmit = (data: AccountStatementValues, e: any) => {
        // Transform select objects to ID only
        data.currencyId = data.currency.value
        data.accountId = data.account?.value
        data.categoryId = data.category?.value
        data.cashFlowId = data.cashFlow.value

        alert(data.amount)
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
                                name={'currency'}
                                control={control}
                                rules={{required: false}}
                                defaultValue={{value: selectedTransactions.currencyId, label: selectedTransactions.currencySymbol}}
                                render={({field}) => (
                                    <Select
                                        options={currencies}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor</label>
                            <Controller name={'amount'}
                                        control={control}
                                        rules={{required: false}}
                                        defaultValue={selectedTransactions.amount * 100}
                                        render={({field}) => (
                                            // <CurrencyInput className='form-control input-default'
                                            //                onFocus={(event: { target: { select: () => any; }; }) => event.target.select()}
                                            //                currency={selectedStatement.currencyId}
                                            //                onValueChange={(e: any) => field.onChange(e.value / 100)}
                                            //                ref={null}
                                            // />
                                            <CurrencyInput className={'form-control'} value={selectedTransactions.amount} allowNegative={true} />
                                            // <CurrencyInput initialValue={selectedTransactions.amount} />
                                            // <CurrencyInput />
                                        )}

                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data da compra</label>
                            <Controller name={'transactionDate'}
                                        control={control}
                                        rules={{required: false}}
                                        defaultValue={selectedTransactions.transactionDate}
                                        render={({field}) => (
                                            <DateBox
                                                className='form-control input-default'
                                                useMaskBehavior={true}
                                                value={selectedTransactions.transactionDate}
                                                displayFormat={'dd/MM/yyyy'}
                                                onValueChanged={(e) => field.onChange(Moment(e.value).format('YYYY-MM-DD'))}
                                                ref={null}
                                            />
                                        )}

                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Conta</label>
                            <Controller name={'account'}
                                        control={control}
                                        rules={{required: true}}
                                        defaultValue={{value: selectedTransactions.accountId, label: selectedTransactions.accountNickname}}
                                        render={({field}) => (
                                            <Select options={accounts}
                                                    {...field}
                                            />
                                        )}
                            />
                        </div>
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
                        <div className="col-6">
                            <label htmlFor="">Categoria</label>
                            <Controller name={'category'}
                                        control={control}
                                        rules={{required: false}}
                                        defaultValue={{value: selectedTransactions.categoryId, label: selectedTransactions.categoryName}}
                                        render={({field}) => (
                                            <Select options={categories}
                                                    {...field}
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
                                            <textarea className='form-control' {...field}></textarea>
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