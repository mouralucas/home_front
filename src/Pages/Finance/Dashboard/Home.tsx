import Card from "../../../Components/Card";
import CreditCardBillByCardTable from "./Tables/CreditCardBillHistoryByCard";
import React from "react";
import PieChartCategoryExpenses from "./Charts/ExpensesCategory";


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
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-6">
                                        <PieChartCategoryExpenses
                                            period={202412}
                                            // pointClick={handleChartPointClick}
                                        />
                                    </div>
                                    <div className="col-6">
                                        {/*<CategoryExpensesDetails data={expensesByCategory}/>*/}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;