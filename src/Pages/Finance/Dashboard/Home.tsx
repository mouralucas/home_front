import Card from "../../../Components/Card";
import PieChartCategoryExpenses from './Charts/ExpensesCategory'
import CreditCardBillHistoryChart from './Charts/CreditCardBillHistory'
import LineChart from './Charts/Profit'
import InvestmentProportion from "./Charts/InvestmentProportion";
import React, {useEffect, useState} from "react";
import {getData} from "../../../Services/Axios/Get";
import {URL_FINANCE_SUMMARY} from "../../../Services/Axios/ApiUrls";


const Home = () => {
    const [periodBalance, setPeriodBalance] = useState(0)
    const [periodIncoming, setPeriodIncoming] = useState(0)
    const [periodOutgoing, setPeriodOutgoing] = useState(0)
    const [periodCreditCardBill, setPeriodCreditCardBill] = useState(0)
    const [periodCreditCardBillQtd, setPeriodCreditCardBillQtd] = useState(0)

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
                    <div className="col-6">
                        <Card>
                            {/*<Card.Header>Outra evolução</Card.Header>*/}
                            <Card.Body>
                                <CreditCardBillHistoryChart/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            {/*<Card.Header>Outra evolução</Card.Header>*/}
                            <Card.Body>
                                <CreditCardBillHistoryChart/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Card>
                            {/*<Card.Header>Outra evolução</Card.Header>*/}
                            <Card.Body>
                                <InvestmentProportion/>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-6">
                        <Card>
                            {/*<Card.Header>Outra evolução</Card.Header>*/}
                            <Card.Body>
                                {/*<RealDollarChart*/}
                                {/*title={'Proporção Investment'}/>*/}
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>Evolução</Card.Header>
                            <Card.Body>
                                <LineChart/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;