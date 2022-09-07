import Card from '../../../Components/Card'
import CreditCardBillTable from './Tables/CreditCardBill'
import {useEffect} from "react";

const App = () => {
    useEffect(() => {
        document.title = 'My Page Title';
    }, [])

    return (
        <div className="App">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>Faturas</Card.Header>
                        <Card.Body>
                            <CreditCardBillTable />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default App;