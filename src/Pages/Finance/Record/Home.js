import Card from '../../../Components/Card'
import CreditCardBillTable from './Tables/CreditCardBill'
import BankStatementTable from './Tables/BankStatement'
import {useEffect} from "react";
import AsyncSelect from "react-select/async";

const App = () => {
    useEffect(() => {
        document.title = 'Registro de informações';
    }, [])

    return (
        <div className="App">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <div className="col-6">Fatura</div>
                            <div className="col-4"></div>
                            <div className="col-2">
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
        </div>
    );
}

export default App;