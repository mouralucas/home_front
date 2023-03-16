import Card from "../../../Components/Card";
import PieChartCategoryExpenses from './Charts/ExpensesCategory'
import CreditCardBillHistoryChart from './Charts/CreditCardBillHistory'
import LineChart from '../../../Components/Charts/LineChart'
import Sidebar from '../../../Components/Sidebar/Base'
import {useEffect, useRef} from "react";
import React from "react";
import {getData} from "../../../Services/Axios/Get";
import {URL_FINANCE_SUMMARY} from "../../../Services/Axios/ApiUrls";


const Home = () => {
    const periodBalanceRef = useRef(0)
    const periodIncomingRef = useRef(0)
    const periodOutgoingRef = useRef(0)
    const periodCreditCardBillRef = useRef(0)

    useEffect(() => {
        getData(URL_FINANCE_SUMMARY).then(response => {
            periodBalanceRef.current = response.balance 
            periodIncomingRef.current = response.incoming
            periodOutgoingRef.current = response.outgoing
            periodCreditCardBillRef.current = response.balance
        })
    })

    return (
        <div className="page-with-menu">
            <Sidebar/>
            <div className='app'>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saldo em dd/mm/yy</p>
                                R$ {periodBalanceRef.current}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Entradas</p>
                                R$ {periodIncomingRef.current}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saídas</p>
                                R$ {periodOutgoingRef.current}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Crédito</p>
                                R$ {periodCreditCardBillRef.current} em X compras
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