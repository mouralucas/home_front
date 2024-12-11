import Card from "../../../Components/Card";
import CreditCardBillByCardTable from "./Tables/CreditCardBillHistoryByCard";
import React, {useState} from "react";
import PieChartCategoryExpenses from "./Charts/ExpensesCategory";
import {getFinanceData} from "../../../Services/Axios/Get";
import {URL_CREDIT_CARD, URL_FINANCE_TRANSACTIONS_CATEGORY_LIST} from "../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";


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
                                            // pointClick={getTransactionsByCategory}
                                        />
                                    </div>
                                    <div className="col-6">
                                        Lucas
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