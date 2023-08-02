import Card from '../../../Components/Card'
import CreditCardBillTable from './Tables/CreditCardBill'
import BankStatementTable from './Tables/AccountStatement'
import InvestmentTable from './Tables/Investment'
import {useEffect} from "react";

const App = () => {
    useEffect(() => {
        document.title = 'Registro de informações';
    }, [])

    return (
        <div className="page-with-menu">
            {/*<Sidebar/>*/}
            <div className="App">
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <div className="row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100">
                                    <div className="col-10">Investimentos</div>
                                    <div className="col-2"></div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <InvestmentTable/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <div className="row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100">
                                    <div className="col-10">Fatura</div>
                                    <div className="col-2"></div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <CreditCardBillTable/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>Extrato</Card.Header>
                            <Card.Body>
                                <BankStatementTable/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>



                {/* <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <div
                                    className="row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100">
                                    <div className="col-10">
                                        Extrato Investimento
                                    </div>
                                    <div className="col-2">
                                        <Select formTarget={true}
                                                options={getListPeriods(201801, +getCurrentPeriod())}/>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <InvestmentStatementTable/>
                            </Card.Body>
                        </Card>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default App;