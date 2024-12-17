import React, {useEffect, useState} from "react";
import Modal from "../../../../Components/Modal";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {InvestmentLiquidate} from "../../Interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format, parseISO} from "date-fns";
import Select from "react-select";
import {getCurrencies, getTaxFee} from "../../../../Services/CommonFunctions/Finance";
import CurrencyInput from "../../../../Components/Form/CurrencyNew"; // TODO: remove and add in a global place


interface InvestmentLiquidateProps {
    modalState: boolean;
    hideModal: any
}

const DefaultInvestmentLiquidate: InvestmentLiquidate = {
    investmentId: '',
    liquidationDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    grossAmount: 0,
    netAmount: 0,
    liquidationAmount: 0,
    taxDetails: [{currencyId: 'BRL', taxId: '', amount: 0}],
    feeDetails: [{currencyId: 'BRL', feeId: '', amount: 0}],
}

const App = (props: InvestmentLiquidateProps) => {
    const [currencies, setCurrencies] = useState<any[]>([]);
    const [taxes, setTaxes] = useState<any[]>([]);
    const [fees, setFees] = useState<any[]>([])

    const {
        handleSubmit,
        control,
        reset,
        formState: {isDirty, dirtyFields, errors},
        getValues,
        setValue
    } = useForm<InvestmentLiquidate>({defaultValues: DefaultInvestmentLiquidate});

    const {fields: taxFields, append: appendTax, remove: removeTax} = useFieldArray({
        control,
        name: 'taxDetails',
    });

    const {fields: feeFields, append: appendFee, remove: removeFee} = useFieldArray({
        control,
        name: 'feeDetails',
    });

    const fetchTransactionData: () => Promise<void> = async () => {
        setCurrencies(await getCurrencies());
        setTaxes(await getTaxFee('BR', 'tax'))
        setFees(await getTaxFee('BR', 'fee'))
    };

    useEffect(() => {
        reset(DefaultInvestmentLiquidate);

        if (props.modalState) {
            fetchTransactionData().then();
        }
    }, [props.modalState])

    const onSubmit = (data: InvestmentLiquidate, e: any) => {
        console.log(data)
    }

    const body = () => {
        let html: React.ReactNode =
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Data</label>
                            <Controller
                                name={'liquidationDate'}
                                control={control}
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
                    </div>
                    {taxFields.map((field, index) => (
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor=""></label>
                                <Controller
                                    name={`taxDetails.${index}.currencyId`}
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
                            <div className="col-4">
                                <label htmlFor="">Imposto</label>
                                <Controller
                                    name={`taxDetails.${index}.taxId`}
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            options={taxes}
                                            value={taxes.find((c: any) => c.value === field.value)}
                                            onChange={(val) => field.onChange(val?.value)}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="">Valor</label>
                                <Controller
                                    name={`taxDetails.${index}.amount`}
                                    control={control}
                                    render={({field}) => (
                                        <CurrencyInput
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                    {feeFields.map((field, index) => (
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor=""></label>
                                <Controller
                                    name={`feeDetails.${index}.currencyId`}
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
                            <div className="col-4">
                                <label htmlFor="">Taxa</label>
                                <Controller
                                    name={`feeDetails.${index}.feeId`}
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            options={fees}
                                            value={fees.find((c: any) => c.value === field.value)}
                                            onChange={(val) => field.onChange(val?.value)}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="">Valor</label>
                                <Controller
                                    name={`feeDetails.${index}.amount`}
                                    control={control}
                                    render={({field}) => (
                                        <CurrencyInput
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </form>
            </div>;

        return html
    }

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Liquidar investimento'}
            body={body()}
            actionModal={handleSubmit(onSubmit)}
            disableAction={!isDirty}
            size={'lg'}
        />
    )
}

export default App;