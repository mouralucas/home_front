import React from "react";
import Modal from "../../../../Components/Modal";
import {Controller, useForm} from "react-hook-form";
import {Investment, InvestmentLiquidate} from "../../Interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format, parseISO} from "date-fns"; // TODO: remove and add in a global place


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
    taxDetails: [],
    feeDetails: [],
}

const App = (props: InvestmentLiquidateProps) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: {isDirty, dirtyFields, errors},
        getValues,
        setValue
    } = useForm<InvestmentLiquidate>({defaultValues: DefaultInvestmentLiquidate})

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
                                render={({ field }) => (
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
                </form>
            </div>;

        return html
    }

    const onSubmit = (data: InvestmentLiquidate, e: any) => {
        console.log(data)
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