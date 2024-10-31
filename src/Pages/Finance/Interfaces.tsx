/**
 * This file contains all sharable interface in finance.
 * Any interface used in more than one file MUST be in here to maintain data integrity throughout the project
 * If the interface is specific to some case, it must be written within the correspondent file
 */
import {UUID} from "crypto";

// Account interfaces
export interface Account {
    accountId: UUID
    nickname: string
    branch: string
    number: string
    openAt: string
    closeAt: string
}

export interface AccountStatement {
    statementId: number | null
    amount: number
    accountName: string
    accountId: string
    categoryName: string
    categoryId: string
    period: number
    description: string | null
    purchasedAt: Date
    cashFlowId: string
    currencyId: string
    currencySymbol: string
    createdAt: Date | null
    lastEditedAt: Date | null
}


// Investment Interfaces
export interface Investment {
    investmentId: string | null
    name: string
    description: string | null
    amount: number
    price: number
    quantity: number
    date: string
    maturityAt: Date | undefined
    interestRate: string
    interestIndex: string
    custodianName: string | null
    custodianId: string | null
    investmentTypeId: string | null
    investmentTypeName: string | null
    parentId: string | null
    cashFlowId: string,
    createAt: Date | undefined,
    lastEditedAt: Date | undefined,
}

export interface InvestmentType {
    investmentTypeId: UUID
    investmentTypeName: string
    parentId: UUID
    parentName: string
    description: string
}

export interface InvestmentAllocation {

}


// Credit card interfaces
export interface CreditCard {
    creditCardId: string
    nickname: string
    description: string
    closingAt: string //maybe date
    dueAt: string //maybe date
}

export interface CreditCardTransaction {
    creditCardBillEntry: number | null
    creditCardId: string | null
    creditCardNickname: string | null
    categoryId: string | null
    categoryName: string | null
    amount: number
    paymentAt: string
    purchaseAt: string
    description: string
    createdAt: string | undefined
    lastEditedAt: string | undefined
}

export interface CreditCardBillHistory {
    period: number
    balance: number
    total_amount: number,
    total_amount_absolute: number
}


// Others
export interface Expense {
    // fields from new endpoint
}

export interface CategoryTransactions {
    transactionID: number
    categoryId: string
    category: string // TODO: review this variable name, it is the parent category
    categoryName: string
    total: number
}

export interface Summary {
    period: number
    referenceDate: string
    periodIncoming: number
    periodOutgoing: number
    periodBalance: number
    periodCreditCardBill: number
    periodCreditCardPurchaseQuantity: number
}

export interface InvestmentType {
    typeId: UUID
}

export interface Currency {
    currencyId: string
    name: string
    symbol: string
}

export interface CashFlow {
    cashFlowId: string
    cashFlowName: string
}