import React, {useEffect, useState} from "react";
import {Account, AccountTransaction, Bank, Currency, Investment, InvestmentType} from "../../Interfaces";
import {Controller, useForm} from "react-hook-form";
import Modal from "../../../../Components/Modal";
import Select from "react-select";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {
    URL_CURRENCY,
    URL_FINANCE_ACCOUNT,
    URL_FINANCE_BANK,
    URL_FINANCE_INVESTMENT_TYPE
} from "../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";// TODO: remove and add in a global place
import {format, parseISO} from "date-fns";
import CurrencyInput from "../../../../Components/Form/CurrencyNew";


interface InvestmentProps {
    investment: Investment | undefined | null,
    modalState: boolean,
    hideModal: any
}

interface GetAccountResponse {
    quantity: number;
    accounts: Account[];
}

interface GetInvestmentTypesResponse {
    quantity: number;
    investmentTypes: InvestmentType[];
}

interface GetCurrenciesResponse {
    quantity: number;
    currencies: Currency[];
}

const DefaultInvestment: Investment = {
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    name: '',
    accountId: '',
    investmentTypeId: '',
    maturityDate: null,
    quantity: 0,
    price: 0,
    amount: 0,
    currencyId: 'BRL',
    indexerTypeId: ''
}

const App = (props: InvestmentProps): React.ReactElement => {
    const {
        handleSubmit,
        control,
        reset,
        formState: {isDirty, dirtyFields, errors},
        getValues,
        setValue
    } = useForm<Investment>()

    const [accounts, setAccounts] = useState<any[]>([])
    const [investmentTypes, setInvestmentTypes] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])


    useEffect(() => {
        // Set initial value if provided
        if (props.modalState && props.investment) {
            reset(props.investment);
        } else if (props.modalState && !props.investment) {
            reset(DefaultInvestment);
        }

        // Load necessary information
        if (props.modalState) {
            getAccounts();
            getInvestmentTypes();
            getCurrencies();
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultInvestment);
        }
    }, [props.modalState, props.investment]);

    const getAccounts = () => {
        getFinanceData(URL_FINANCE_ACCOUNT).then((response: GetAccountResponse) => {
            let options = response?.accounts.map((i: Account) => (
                {value: i.accountId, label: i.nickname}
            ));
            setAccounts(options);
        }).catch((error: Error) => {
            toast.error('Erro ao buscar contas' + error)
        })
    }

    const getInvestmentTypes = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_TYPE).then((response: GetInvestmentTypesResponse) => {
            let options = response?.investmentTypes.map((i: InvestmentType) => (
                {value: i.investmentTypeId, label: i.investmentTypeName}
            ));
            setInvestmentTypes(options);
        }).catch((error: Error) => {
            toast.error('Erro ao buscar tipos de investimento' + error)
        })
    }

    const getCurrencies = () => {
        getFinanceData(URL_CURRENCY).then((response: GetCurrenciesResponse) => {
            let options = response?.currencies.map((i: Currency) => (
                {value: i.currencyId, label: i.symbol}
            ))
            setCurrencies(options);
        }).catch((error: Error) => {
            toast.error('Erro ao buscar moedas' + error)
        })
    }

    const getIndexerTypes = () => {
        console.log('Under construction');
    }

    const calculateTotalAmount = () => {
        const quantity = getValues("quantity");
        const price = getValues("price");

        const amount = quantity * price
        setValue('amount', amount);
    }

    const onSubmit = (data: Investment) => {
        console.log(data);
    }

    const body = (): React.ReactElement => {
        let html: React.ReactElement = <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">Data</label>
                        <Controller
                            name={'transactionDate'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <DatePicker
                                    selected={parseISO(field.value)}
                                    onChange={(date: Date | null) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="Selecione uma data"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Nome do investimento</label>
                        <Controller
                            name={'name'}
                            control={control}
                            rules={{required: "Este campo é obrigatório"}}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className={`form-control input-default ${errors.name ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Conta</label>
                        <Controller
                            name={'accountId'}
                            control={control}
                            rules={{required: "Este campo é obrigatório"}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={accounts}
                                    value={accounts.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    className={`${errors.accountId ? "border border-danger" : ""}`}
                                />
                            )}
                        />
                        {errors.accountId && (
                            <div className="text-danger mt-1">{errors.accountId.message}</div>
                        )}
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Tipo de investimento</label>
                        <Controller
                            name={'investmentTypeId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={investmentTypes}
                                    value={investmentTypes.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    className={`${errors.investmentTypeId ? "border border-danger" : ""}`}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">Vencimento</label>
                        <Controller
                            name={'maturityDate'}
                            control={control}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value ? parseISO(field.value) : null}
                                    onChange={(date) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="__/__/____"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Quantidade</label>
                        <Controller
                            name={'quantity'}
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({field}) => (
                                <CurrencyInput
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.quantity ? 'input-error' : ''}`}
                                    onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                        {errors.quantity && (<div className="text-danger mt-1">{errors.quantity.message}</div>)}
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Preço</label>
                        <Controller
                            name={'price'}
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({field}) => (
                                <CurrencyInput
                                    prefix={'R$ '}
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.price ? 'input-error' : ''}`}
                                    onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Total</label>
                        <Controller
                            name={'amount'}
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({field}) => (
                                <CurrencyInput
                                    prefix={'R$ '}
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.amount ? 'input-error' : ''}`}
                                    disabled={true}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        <Controller
                            name={'currencyId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={currencies}
                                    value={currencies.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Tipo indexador</label>
                        <Controller
                            name={'indexerTypeId'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={currencies}
                                />
                            )}
                        />
                    </div>
                </div>
            </form>
        </div>

        return html
    }

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Investimento'}
            body={body()}
            actionModal={handleSubmit(onSubmit)}
            size={'lg'}
        />
    )
}

export default App;