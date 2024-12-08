import React, {useEffect, useState} from "react";

import Modal from '../../../../Components/Modal'
import {CreditCard, CreditCardTransaction} from "../../Interfaces";
import {Category} from "../../../Interfaces";
import {Controller, useForm} from "react-hook-form";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {URL_CATEGORIES, URL_CREDIT_CARD} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import CurrencyInput from "../../../../Components/Form/CurrencyNew";
import DatePicker from "react-datepicker"
import Select from "react-select";
import {format, parseISO} from "date-fns";
import {getCurrentPeriod} from "../../../../Utils/DateTime";

interface CreditCardBillProps {
    creditCardTransaction: CreditCardTransaction | null
    modalState: boolean
    hideModal: any
}

interface GetCreditCardsResponse {
    success: boolean
    message: string
    statusCode: number
    quantity: number
    creditCards: CreditCard[]
}

interface GetCategoryResponse {
    success: boolean
    message: string
    statusCode: number
    quantity: number
    categories: Category[]
}

const DefaultCreditCardTransaction: CreditCardTransaction = {
    transactionId: null,
    creditCardId: null,
    period: getCurrentPeriod(),
    categoryId: '',
    amount: 0,
    currencyId: '',
    transactionCurrencyId: '',
    transactionAmount: 0,
    dueDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    description: '',
    isInstallment: false,
    currentInstallment: 1,
    installments: 1,
    totalAmount: 0,
    parentId: null,
    createdAt: undefined,
    lastEditedAt: undefined
}

const App = (props: CreditCardBillProps): React.ReactElement => {
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields}, getValues} = useForm<CreditCardTransaction>()

    const [creditCards, setCreditCards] = useState<any>([])
    const [categories, setCategories] = useState<any[]>([])

    const installmentsArray = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: i + 1 }));

    useEffect(() => {
        if (props.modalState && props.creditCardTransaction) {
            reset(props.creditCardTransaction);
        } else if (props.modalState && !props.creditCardTransaction) {
            reset(DefaultCreditCardTransaction)
        }

        if (props.modalState) {
            getCreditCards();
            getCategory();
        }

        if (!props.modalState) {
            reset(DefaultCreditCardTransaction);
        }
    }, [props.modalState, props.creditCardTransaction]);

    const getCreditCards = () => {
        getFinanceData(URL_CREDIT_CARD).then((response: GetCreditCardsResponse) => {
            let options: any = response.creditCards.map((i: CreditCard) =>
                ({value: i.creditCardId, label: i.nickname})
            );
            setCreditCards(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar os cartões de crédito');
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

    const onSubmit = (data: CreditCardTransaction, e: any) => {
        let method;
        let submit_data;

        console.log(data);
        if (data.transactionId !== null) {
            method = 'patch'

            const currentValues: CreditCardTransaction = getValues();
            const modifiedFields: Partial<Record<keyof CreditCardTransaction, CreditCardTransaction[keyof CreditCardTransaction]>> = {
                transactionId: data.transactionId
            };


            (Object.keys(dirtyFields) as Array<keyof CreditCardTransaction>).forEach((key: keyof CreditCardTransaction) => {
                modifiedFields[key] = currentValues[key];
            });

            submit_data = modifiedFields
        } else {
            method = 'post'
            submit_data = data
        }

        console.log(submit_data);
    }

    const body = (): React.ReactElement => {
        let html: React.ReactElement =
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor total</label>
                            <Controller name={'totalAmount'}
                                        control={control}
                                        rules={{required: false}}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={'form-control input-default'}
                                            />
                                        )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
                            <Controller
                                name={'transactionDate'}
                                control={control}
                                rules={{required: false}}
                                render={({field}) => (
                                    <DatePicker
                                        selected={parseISO(field.value)}
                                        onChange={(date) => {
                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                        }}
                                        dateFormat="dd/MM/yyyy" // Exibe no formato brasileiro
                                        className="form-control input-default"
                                        placeholderText="Selecione uma data"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Cartão</label>
                            <Controller name={'creditCardId'}
                                        control={control}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={creditCards}
                                                value={creditCards.find((c: any) => c.value === field.value)}
                                                onChange={(val) => field.onChange(val?.value)}
                                                placeholder={'Selecione'}
                                            />
                                        )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Categoria</label>
                            <Controller name={'categoryId'}
                                        control={control}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={categories}
                                                value={categories.find((c: any) => c.value === field.value)}
                                                onChange={(val: any) => field.onChange(val?.value)}
                                                placeholder={'Selecione'}
                                            />
                                        )}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="">Total</label>
                            <Controller
                                name={'installments'}
                                control={control}
                                render={(field) => (
                                    <Select
                                        {...field}
                                        options={installmentsArray}
                                        placeholder={'Selecione'}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <hr></hr>

                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="">Parcela</label>
                            <Controller
                                name={'currentInstallment'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={installmentsArray}
                                        value={installmentsArray.find((c: any) => c.value === field.value)}
                                        onChange={(val: any) => field.onChange(val?.value)}
                                        placeholder={'Selecione'}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-2">

                        </div>
                    </div>
                    <div className="row">
                        {/*<div className="col-3">*/}
                        {/*    <label htmlFor="">Data pagamento</label>*/}
                        {/*    <Controller name={'dueDate'}*/}
                        {/*                control={control}*/}
                        {/*                defaultValue={selectedTransaction.dueDate}*/}
                        {/*                render={({field}) => (*/}
                        {/*                    <DatePicker*/}
                        {/*                        selected={parseISO(field.value)}*/}
                        {/*                        onChange={(date) => {*/}
                        {/*                            field.onChange(date ? format(date, 'yyyy-MM-dd') : selectedTransaction.dueDate);*/}
                        {/*                        }}*/}
                        {/*                        className={'form-control input-default'}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-6 mt-2">*/}
                        {/*    <CheckBox*/}
                        {/*        text="Transação parcelada"*/}
                        {/*        hint="Parcelamento  "*/}
                        {/*        iconSize="25"*/}
                        {/*        onValueChanged={checkChange}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-6 mt-2">*/}
                        {/*    <Controller name={'installments'}*/}
                        {/*                control={control}*/}
                        {/*                render={({field}) => (*/}
                        {/*                    <input className={'form-control'} {...field} />*/}
                        {/*                )}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <Controller name={'description'}
                                        control={control}
                                        render={({field}) => (
                                            <textarea className='form-control' {...field}></textarea>
                                        )}/>
                        </div>
                    </div>
                </form>
            </div>

        return html
    }

    return (
        <Modal showModal={props.modalState}
               hideModal={props.hideModal}
               title={'Fatura com parcelas'}
               body={body()}
               fullscreen={false}
               actionModal={handleSubmit(onSubmit)}
               disableAction={isDirty}
               size={'lg'}
        />
    )
}

export default App;