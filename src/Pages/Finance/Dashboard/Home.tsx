import Card from "../../../Components/Card";
import PieChartCategoryExpenses from './Charts/ExpensesCategory'
import React, {useEffect, useState} from "react";
import {getData} from "../../../Services/Axios/Get";
import {URL_FINANCE_SUMMARY} from "../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";
import BillHistory from "./Charts/CreditCardBillHistory";
import {Summary} from "../Interfaces";


const Home = () => {
    // TODO: create one state/interface with all summary variables
    const [periodBalance, setPeriodBalance] = useState<number>(0)
    const [periodIncoming, setPeriodIncoming] = useState<number>(0)
    const [periodOutgoing, setPeriodOutgoing] = useState<number>(0)
    const [periodCreditCardBill, setPeriodCreditCardBill] = useState<number>(0)
    const [periodCreditCardBillQtd, setPeriodCreditCardBillQtd] = useState<number>(0)

    const [summary, setSummary] = useState<Summary>()

    useEffect(() => {
        document.title = 'Dashboard';
    }, [])

    useEffect(() => {
        getData(URL_FINANCE_SUMMARY).then(response => {
            setPeriodBalance(response.balance)
            setPeriodIncoming(response.incoming)
            setPeriodOutgoing(response.outgoing)
            setPeriodCreditCardBill(response.credit)
            setPeriodCreditCardBillQtd(response.credit_qtd)
        }).catch(err => {
            toast.error('Erro')
        })
    }, [])

    return (
        <div className="page-with-menu">
            <div className='app'>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saldo em dd/mm/yy</p>
                                R$ {periodBalance}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Entradas</p>
                                R$ {periodIncoming}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saídas</p>
                                R$ {periodOutgoing}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Crédito</p>
                                R$ {periodCreditCardBill} em {periodCreditCardBillQtd} compras
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <Card>
                            <Card.Body>
                                <PieChartCategoryExpenses/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <BillHistory />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;