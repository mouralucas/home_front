import React from "react";
import Card from "../../../Components/Card";
import ProfitChart from "./Dashboard/Chart/Performance";
import InvestmentTypeAllocation from "../Investment/Dashboard/Chart/Allocation"

const App = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>Alocação dos investimentos</Card.Header>
                        <Card.Body>
                            <InvestmentTypeAllocation />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className='row'>
                <div className="col-12">
                    <Card>
                        <Card.Body>
                            <ProfitChart/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default App;

