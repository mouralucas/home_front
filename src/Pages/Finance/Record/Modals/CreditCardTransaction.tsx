import React, {useEffect, useState} from "react";

import Modal from '../../../../Components/Modal'
import {CreditCard, CreditCardTransaction, Currency} from "../../Interfaces";
import {Category} from "../../../Interfaces";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {getFinanceData} from "../../../../Services/Axios/Get";
import {URL_CATEGORIES, URL_CREDIT_CARD, URL_CREDIT_CARD_INSTALLMENT_DUE_DATES, URL_CURRENCY} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import CurrencyInput from "../../../../Components/Form/CurrencyNew";
import DatePicker from "react-datepicker"
import Select from "react-select";
import {format, parseISO} from "date-fns";

interface CreditCardBillProps {
    creditCardTransaction: CreditCardTransaction | null;
    modalState: boolean;
    hideModal: any;
}

interface GetCreditCardsResponse {
    quantity: number;
    creditCards: CreditCard[];
}

interface GetCategoryResponse {
    quantity: number;
    categories: Category[];
}

interface GetCurrencyResponse {
    quantity: number;
    currencies: Currency[];
}

// TODO: Adjust to CamelCase after backend adjust
interface GetDueDatesResponse {
    dueDates: [{
        currentInstallment: number;
        dueDate: string;
    }];
}

const DefaultCreditCardTransaction: CreditCardTransaction = {
    transactionId: null,
    creditCardId: '',
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    categoryId: '',
    amount: 0,
    currencyId: 'BRL',

    isInternationalTransaction: false,
    transactionCurrencyId: 'BRL',
    transactionAmount: 0,
    dollarExchangeRate: 0,
    currencyDollarExchangeRate: 0,
    totalTax: 0,

    description: '',
    isInstallment: false,
    installments: [{currentInstallment: 1, amount: 0, dueDate: format(new Date().toDateString(), 'yyyy-MM-dd')}],
    totInstallments: 1,
    totalAmount: 0,
    parentId: null,
    createdAt: undefined,
    lastEditedAt: undefined
}

const App = (props: CreditCardBillProps): React.ReactElement => {
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields, errors}, getValues, setValue} = useForm<CreditCardTransaction>({defaultValues: DefaultCreditCardTransaction})

    const [creditCards, setCreditCards] = useState<any>([])
    const [categories, setCategories] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])
    const [qtdInstallments, setQtdInstallments] = useState<any[]>(Array.from({length: 12}, (_, i) => ({value: i + 1, label: i + 1})))

    const [showInternationalTransaction, setShowInternationalTransaction] = useState<boolean>(false);

    // Create the list of installments in form
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: "installments",
    });

    useEffect(() => {
        if (props.modalState && props.creditCardTransaction) {
            reset(props.creditCardTransaction);
        } else if (props.modalState && !props.creditCardTransaction) {
            reset(DefaultCreditCardTransaction);
        }

        if (props.modalState) {
            getCreditCards();
            getCategory();
            getCurrency();

            // Set the basic installment
            // append({currentInstallment: 1, amount: 0, dueDate: format(new Date().toDateString(), 'yyyy-MM-dd')});
        }

        if (!props.modalState) {
            reset(DefaultCreditCardTransaction);
        }
    }, [props.modalState, props.creditCardTransaction]);

    const updateInstallmentList = () => {
        const totInstallment: number = getValues('totInstallments');
        const totAmount: number = getValues('totalAmount')
        const creditCardId: string = getValues('creditCardId')
        const transactionDate: string = getValues('transactionDate')

        if (creditCardId !== "" && totAmount !== 0) {
            console.log('chamou a função de parcelas');
            // The minimum information needed to calculate the due date is the credit card.
            const installmentAmount = totAmount / totInstallment

            const currentLength = fields.length;

            getFinanceData(URL_CREDIT_CARD_INSTALLMENT_DUE_DATES, {
                creditCardId: creditCardId,
                totInstallments: totInstallment,
                transactionDate: transactionDate
            }).then((response: GetDueDatesResponse) => {
                fields.forEach((_, index) => {
                    const dueDate = response.dueDates.find(d => d.currentInstallment === index + 1)?.dueDate || format(new Date().toDateString(), 'yyyy-MM-dd');
                    update(index, {
                        ...fields[index],
                        amount: installmentAmount,
                        dueDate: dueDate
                    });
                });

                if (totInstallment > currentLength) {
                    for (let i = currentLength; i < totInstallment; i++) {
                        append({currentInstallment: i + 1, amount: installmentAmount, dueDate: response.dueDates.find(d => d.currentInstallment === i + 1)?.dueDate || format(new Date().toDateString(), 'yyyy-MM-dd')});
                    }
                } else if (totInstallment < currentLength) {
                    for (let i = currentLength - 1; i >= totInstallment; i--) {
                        remove(i);
                    }
                }
            });
        }
    }

    const handleInternationalTransactionVisibility = () => {
        setShowInternationalTransaction(!showInternationalTransaction);
    };

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

    const getCurrency = () => {
        getFinanceData(URL_CURRENCY).then((response: GetCurrencyResponse) => {
            let options = response.currencies.map((i: Currency) =>
                ({value: i.currencyId, label: i.symbol})
            );
            setCurrencies(options)
        }).catch(() => {
            toast.error('Houve um erro ao buscar as moedas disponíveis');
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
                        <div className="col-6">
                            <label htmlFor="">Cartão</label>
                            <Controller
                                name={'creditCardId'}
                                control={control}
                                rules={{required: 'Esse campo é obrigatório'}}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={creditCards}
                                        value={creditCards.find((c: any) => c.value === field.value)}
                                        onChange={(val) => {
                                            field.onChange(val?.value);
                                            updateInstallmentList();
                                        }}
                                        placeholder={'Selecione'}
                                        className={`${errors.creditCardId ? "input-error" : ""}`}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor=""></label>
                            <Controller
                                name="currencyId"
                                control={control}
                                rules={{required: 'Esse campo é obrigatório'}}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={currencies}
                                        value={currencies.find((c: any) => c.value === field.value)}
                                        onChange={(val) => field.onChange(val?.value)}
                                        className={`${errors.currencyId ? "input-error" : ""}`}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Valor total</label>
                            <Controller name={'totalAmount'}
                                        control={control}
                                        rules={{
                                            validate: (value) => value !== 0 || "Este campo não deve ser zero",
                                        }}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                onBlur={updateInstallmentList}
                                                className={`form-control input-default ${errors.totalAmount ? "input-error" : ""}`}
                                            />
                                        )}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
                            <Controller
                                name={'transactionDate'}
                                control={control}
                                rules={{required: 'Esse campo é obrigatório'}}
                                render={({field}) => (
                                    <DatePicker
                                        selected={parseISO(field.value)}
                                        onChange={(date) => {
                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        onBlur={updateInstallmentList}
                                        className={`form-control input-default ${errors.transactionDate ? "input-error" : ""}`}
                                        placeholderText="Selecione uma data"
                                    />
                                )}
                            />
                        </div>
                        <div className="col-6">
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
                        <div className="col-3">
                            <label htmlFor="">Parcelas</label>
                            <Controller
                                name={'totInstallments'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={qtdInstallments}
                                        value={qtdInstallments.find((c: any) => c.value === field.value)}
                                        onChange={(val: any) => {
                                            field.onChange(val?.value);
                                            updateInstallmentList();
                                        }}
                                        placeholder={'Selecione'}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <hr/>
                    <h4><input
                        type="checkbox"
                        checked={showInternationalTransaction}
                        onChange={handleInternationalTransactionVisibility}
                    /> Compra internacional</h4>

                    {showInternationalTransaction && (
                        <div>
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="">Moeda original</label>
                                    <Controller
                                        name={'transactionCurrencyId'}
                                        control={control}
                                        render={({field}) => (
                                            <Select
                                                options={currencies}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Valor original</label>
                                    <Controller
                                        name={'transactionAmount'}
                                        control={control}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default`}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Dólar</label>
                                    <Controller
                                        name={'dollarExchangeRate'}
                                        control={control}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default`}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Moéda para Dólar</label>
                                    <Controller
                                        name={'currencyDollarExchangeRate'}
                                        control={control}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default`}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="">Total de imposto</label>
                                    <Controller
                                        name={'totalTax'}
                                        control={control}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix={"R$ "}
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default`}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <hr/>
                    <h4>Parcelas</h4>
                    {/*// TODO: only show this block if it is a installment purchase, otherwise just send the basic list with one element*/}
                    {fields.map((field, index) => (
                        <div className="row" key={field.id}>
                            <div className={'col-3'}>
                                <label>Nº parcela</label>
                                <Controller
                                    name={`installments.${index}.currentInstallment`}
                                    control={control}
                                    render={({field}) => (
                                        <input type={'text'}
                                               {...field}
                                               disabled={true}
                                               className={'form-control'}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Valor</label>
                                <Controller
                                    name={`installments.${index}.amount`}
                                    control={control}
                                    render={({field}) => (
                                        <CurrencyInput
                                            prefix="R$ "
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                            className={`form-control input-default ${errors.totalAmount ? "input-error" : ""}`}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Pagamento</label>
                                <Controller
                                    name={`installments.${index}.dueDate`}
                                    control={control}
                                    render={({field}) => (
                                        <DatePicker
                                            selected={parseISO(field.value)}
                                            onChange={(date) => {
                                                field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            className={'form-control'}
                                        />
                                    )}
                                />
                            </div>

                        </div>
                    ))}

                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <Controller name={'description'}
                                        control={control}
                                        render={({field}) => (
                                            <textarea
                                                {...field}
                                                rows={5}
                                                className='form-control'
                                            />
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
               title={'Transação'}
               body={body()}
               fullscreen={false}
               actionModal={handleSubmit(onSubmit)}
               disableAction={!isDirty}
               size={'lg'}
        />
    )
}

export default App;