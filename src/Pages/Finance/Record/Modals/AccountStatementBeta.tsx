import React, {useEffect, useState} from "react";
import {Account, Currency} from "../../Interfaces";
import {Category} from "../../../Interfaces";
import {getData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_ACCOUNTS, URL_CATEGORIES, URL_CURRENCY, URL_FINANCE_ACCOUNT_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {Controller, useForm} from "react-hook-form";
import DropdownList from 'react-widgets/DropdownList'
import Modal from "../../../../Components/Modal";
import submit from "../../../../Services/Axios/Post";
import CurrencyInput from "../../../../Components/Form/Currency";

/**
 *
 * @constructor
 *
 * Account Statement Modal With React Hook Form
 */
interface AccountStatementProps {
    statement: any,
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

const App = (props: AccountStatementProps) => {
    const {handleSubmit, control, setValue} = useForm()

    const [accounts, setAccounts] = useState<Account[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [currencies, setCurrencies] = useState<Currency[]>([])
    const [cashFlow, setCashFlow] = useState()

    useEffect(() => {
        if (props.modalState) {
            getCurrency();
        }
    }, [props.modalState]);

    const getAccount = () => {
        getData(URL_FINANCE_ACCOUNTS, {accountType: "checking"}).then((response: GetAccountResponse) => {
            setAccounts(response.accounts);
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as contas bancárias');
        })
    }

    const getCategory = () => {
        getData(URL_CATEGORIES, {show_mode: 'all', module: 'finance'}).then((response: GetCategoryResponse) => {
            setCategories(response.categories);
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as categorias');
        })
    }

    const getCurrency = () => {
        getData(URL_CURRENCY).then((response: GetCurrencyResponse) => {
            setCurrencies(response.currencies)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as moedas disponíveis');
        })
    }

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const body = (): React.ReactElement => {
        let html: React.ReactElement =
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor=""></label>
                            <Controller
                                name={'currencyId'}
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <DropdownList id={'currencyId'}
                                                  data={currencies}
                                                  dataKey={'currencyId'}
                                                  textField={'symbol'}
                                                  {...field}
                                                  ref={null}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Valor</label>
                            <Controller name={'amount'}
                                        control={control}
                                        rules={{required: true}}
                                        render={({field}) => (
                                            <CurrencyInput className='form-control input-default'
                                                           value={500}
                                                           onFocus={(event: { target: { select: () => any; }; }) => event.target.select()}
                                                           currency={"BRL"}
                                                           onValueChange={(values: any, sourceInfo: any) => {
                                                               alert('asdas');
                                                           }}/>
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