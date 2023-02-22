import Card from "../../../Components/Card";
import PieChartFixedExpenses from './Charts/FixedExpenses'
import PieChartVariableExpenses from './Charts/VariableExpenses'
import LineChart from '../../../Components/Charts/LineChart'
import Sidebar from '../../../Components/Sidebar/Base'
import CreditCardBillTable from "../Record/Tables/CreditCardBill";


const Home = () => {

    return (
        <div className="page-with-menu">
            <Sidebar/>
            <div className='app'>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saldo em dd/mm/yy</p>
                                R$ 17,30
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Entradas</p>
                                R$ 6000.00
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saídas</p>
                                R$ -5000.00
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Crédito</p>
                                R$ -6000.00
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-sm-12">
                        <Card>
                            {/*<Card.Header>Despesas Fixas</Card.Header>*/}
                            <Card.Body>
                                <PieChartFixedExpenses/>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-sm-12">
                        <Card>
                            {/*<Card.Header>Despesas Variáveis</Card.Header>*/}
                            <Card.Body>
                                <PieChartVariableExpenses/>
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