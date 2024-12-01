import React, {useEffect, useState} from "react";
import {Account, AccountTransaction, Bank, Investment, InvestmentType} from "../../Interfaces";
import {Controller, useForm} from "react-hook-form";
import Modal from "../../../../Components/Modal";
import Select from "react-select";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_ACCOUNT, URL_FINANCE_BANK, URL_FINANCE_INVESTMENT_TYPE} from "../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format, parseISO} from "date-fns"; // TODO: remove and add in a global place

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

const DefaultInvestment: Investment = {
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    name: '',
    accountId: '',
    investmentTypeId: ''
}

const App = (props: InvestmentProps): React.ReactElement => {
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields, errors}, getValues} = useForm<Investment>()

    const [accounts, setAccounts] = useState<any[]>([])
    const [investmentTypes, setInvestmentTypes] = useState<any[]>([])


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