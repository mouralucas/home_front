import Card from "../../../Components/Card";
import PieChartCategoryExpenses from './Charts/ExpensesCategory'
import React, {useEffect, useState} from "react";
import {getData} from "../../../Services/Axios/Get";
import {URL_FINANCE_SUMMARY, URL_FINANCE_TRANSACTIONS_CATEGORY_LIST} from "../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";
import BillHistory from "./Charts/CreditCardBillHistory";
import {CategoryTransactions, Summary} from "../Interfaces";
import CategoryExpensesDetails from "./Tables/CategoryExpensesDetails";
import CreditCardBillByCardTable from "./Tables/CreditCardBillHistoryByCard";
import {getCurrentPeriod} from "../../../Utils/DateTime";

interface SummaryResponse {
    success: boolean
    message?: string
    summary: Summary
}

interface CategoryTransactionsResponse {
    success: boolean
    message?: string
    transactions: CategoryTransactions[]
}

const Home = () => {
    const [summary, setSummary] = useState<Summary>()
    const [expensesByCategory, setExpensesByCategory] = useState<CategoryTransactions[]>([])
    const [selectedPeriod, setSelectedPeriod] = useState<number>(getCurrentPeriod())

    useEffect(() => {
        document.title = 'Dashboard';
    }, [])

    useEffect(() => {
        getData(URL_FINANCE_SUMMARY, {period: selectedPeriod}).then((response: SummaryResponse) => {
            setSummary(response.summary);
        }).catch(() => {
            toast.error('Erro ao buscar resumo')
        })
    }, [])

    const getExpensesByCategory = (categoryId: string) => {
        getData(URL_FINANCE_TRANSACTIONS_CATEGORY_LIST, {
            categoryId: categoryId,
            period: selectedPeriod
        }).then((response: CategoryTransactionsResponse) => {
            setExpensesByCategory(response.transactions)
        }).catch(err => {
            toast.error('Houve um erro ao buscar as transações por categoria')
        })
    }

    const handleChartPointClick = (e: any) => {
        let categoryId = e.target.data.categoryId;
        getExpensesByCategory(categoryId)
    }

    return (
        <div className="page-with-menu">
            <div className='app'>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saldo em {summary?.referenceDate}</p>
                                R$ {summary?.periodBalance}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Entradas</p>
                                R$ {summary?.periodIncoming}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Saídas</p>
                                R$ {summary?.periodOutgoing}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-sm-12">
                        <Card>
                            <Card.Body>
                                <p>Crédito</p>
                                {/*TODO: adicionar paramentos adiantados e estornos*/}
                                R$ {summary?.periodCreditCardBill} em {summary?.periodCreditCardPurchaseQuantity} transações
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <Card>
                            <Card.Body>
                                <CreditCardBillByCardTable />
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
                                            period={selectedPeriod}
                                            pointClick={handleChartPointClick}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <CategoryExpensesDetails data={expensesByCategory}/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <BillHistory/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;