import React, {useEffect, useState} from "react";

import Modal from '../../../../Components/Modal'
import {CreditCard, CreditCardTransaction} from "../../Interfaces";
import {Category, ReactSelectInterface} from "../../../Interfaces";
import {Controller, useForm} from "react-hook-form";
import {getData} from "../../../../Services/Axios/Get";
import {URL_CATEGORIES, URL_CREDIT_CARD, URL_CREDIT_CARD_BILL_CONSOLIDATED} from "../../../../Services/Axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import CurrencyInput from "../../../../Components/Form/Currency";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import Select from "react-select";
import {handleSubmit as submit} from "../../../../Services/Axios/Post";
import {CheckBox} from "devextreme-react/check-box";

interface CreditCardBillProps {
    creditCardBill: CreditCardTransaction | null
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

interface CreditCardBillValues {
    amountTotal: number
    transactionDate: string
    dueDate: string
    creditCard: ReactSelectInterface | null
    creditCardId: string | null | undefined
    creditCardName: string
    category: ReactSelectInterface | null
    categoryId: string | null | undefined
    categoryName: string | null
    description: string
    installments: number
}

const App = (props: CreditCardBillProps) => {
    const {handleSubmit, control, setValue, getValues} = useForm<CreditCardBillValues>()

    const [creditCards, setCreditCards] = useState<ReactSelectInterface[]>([])
    const [categories, setCategories] = useState<ReactSelectInterface[]>([])

    useEffect(() => {
        if (props.modalState) {
            getCreditCards();
            getCategory();
        }
    }, [props.modalState]);

    const getCreditCards = () => {
        getData(URL_CREDIT_CARD).then((response: GetCreditCardsResponse) => {
            let options: ReactSelectInterface[] = response.creditCards.map((i: CreditCard) =>
                ({value: i.creditCardId, label: i.nickname})
            );
            setCreditCards(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar os cartões de crédito');
        })
    }

    const getCategory = () => {
        getData(URL_CATEGORIES, {showMode: 'all', module: 'finance'}).then((response: GetCategoryResponse) => {
            let options: ReactSelectInterface[] = response.categories.map((i: Category) =>
                ({value: i.categoryId, label: i.name})
            );
            setCategories(options)
        }).catch((err: string | ToastOptions) => {
            toast.error('Houve um erro ao buscar as categorias');
        })
    }

    const checkChange = (value: any) => {
        if (value.value) {
            alert('Carai manolo, quanto tempo não uso React. Aqui coloco lógica de add novas linhas de parcelas')
        }


    }

    const onSubmit = (data: CreditCardBillValues, e: any) => {
        data.categoryId = data.category?.value
        data.creditCardId = data.creditCard?.value

        submit(e, URL_CREDIT_CARD_BILL_CONSOLIDATED, data, false, "Fatura salva").then(response => {

        }).catch((err: string | ToastOptions) => {
            toast.error('Erro ao salvar fatura beta');
        })
    }

    const body = (): React.ReactElement => {
        let html: React.ReactElement =
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Valor</label>
                            <Controller name={'amountTotal'}
                                        control={control}
                                        rules={{required: false}}
                                // defaultValue={} // add from props
                                        render={({field}) => (
                                            <CurrencyInput className='form-control input-default'
                                                           onFocus={(event: { target: { select: () => any; }; }) => event.target.select()}
                                                           currency={"BRL"} // add from props
                                                           onValueChange={(e: any) => field.onChange(e.value / 100)}
                                                           ref={null}
                                            />
                                        )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
                            <Controller name={'transactionDate'}
                                        control={control}
                                        render={({field}) => (
                                            <DateBox
                                                className='form-control input-default'
                                                useMaskBehavior={true}
                                                // value={selectedStatement.transactionDate} // get from props
                                                onValueChanged={(e) => field.onChange(Moment(e.value).format('YYYY-MM-DD'))}
                                                ref={null}
                                            />
                                        )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Cartão</label>
                            <Controller name={'creditCard'}
                                        control={control}
                                        render={({field}) => (
                                            <Select options={creditCards}
                                                    {...field}
                                            />
                                        )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Categoria</label>
                            <Controller name={'category'}
                                        control={control}
                                        render={({field}) => (
                                            <Select options={categories}
                                                    {...field}
                                            />
                                        )}
                            />
                        </div>
                        {/*<div className="col-4">*/}
                        {/*    <label htmlFor="">Data pagamento</label>*/}
                        {/*    <Controller name={'dueDate'}*/}
                        {/*                control={control}*/}
                        {/*                render={({field}) => (*/}
                        {/*                    <DateBox*/}
                        {/*                        className='form-control input-default'*/}
                        {/*                        useMaskBehavior={true}*/}
                        {/*                        // value={selectedStatement.transactionDate} // get from props*/}
                        {/*                        onValueChanged={(e) => field.onChange(Moment(e.value).format('YYYY-MM-DD'))}*/}
                        {/*                        ref={null}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <CheckBox
                                text="Transação parcelada"
                                hint="Parcelamento  "
                                iconSize="25"
                                onValueChanged={checkChange}
                            />
                        </div>
                        <div className="col-6 mt-2">
                            <Controller name={'installments'}
                                        control={control}
                                        render={({field}) => (
                                            <input className={'form-control'} {...field} />
                                        )}
                            />
                        </div>
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
               size={'lg'}
        />
    )
}

export default App;