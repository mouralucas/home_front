import Card from "../../../Components/Card";
import CreditCardBillByCardTable from "./Tables/CreditCardBillHistoryByCard";
import React from "react";


const App = () => {


    return (
        <div className={'page-with-menu'}>
            <div className={'app'}>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <CreditCardBillByCardTable/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;