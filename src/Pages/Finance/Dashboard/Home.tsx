import Card from "../../../Components/Card";
import PieChartCategoryExpenses from './Charts/ExpensesCategory'
import React, {useEffect, useState} from "react";
import {getData} from "../../../Services/Axios/Get";
import {URL_FINANCE_SUMMARY} from "../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";
import BillHistory from "./Charts/CreditCardBillHistory";
import {Summary} from "../Interfaces";

interface SummaryResponse {
    success: boolean
    message?: string
    summary: Summary
}

const Home = () => {
    const [summary, setSummary] = useState<Summary>()

    useEffect(() => {
        document.title = 'Dashboard';
    }, [])

    useEffect(() => {
        getData(URL_FINANCE_SUMMARY, {period: 202308}).then((response: SummaryResponse) => {
            setSummary(response.summary);
        }).catch(() => {
            toast.error('Erro ao buscar resumo')
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
                                R$ {summary?.periodBalance}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Entradas</p>
                                R$ {summary?.periodIncoming}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saídas</p>
                                R$ {summary?.periodOutgoing}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Crédito</p>
                                R$ {summary?.periodCreditCardBill} em {summary?.periodCreditCardPurchaseQuantity} compras
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
                                <BillHistory/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;