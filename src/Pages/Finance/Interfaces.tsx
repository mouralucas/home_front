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

export interface AccountTransaction {
    transactionId: number | null
    ownerId: string
    accountId: string
    period: number
    currencyId: string
    amount: number
    transactionDate: string
    categoryId: string
    description: string | undefined
    transactionCurrencyId: string
    exchangeRate: number | null
    taxPerc: number | null
    tax: number | null
    spreadPerc: number | null
    spread: number | null
    effectiveRate: number | null
    createdAt: Date | null
    lastEditedAt: Date | null
}


// Investment Interfaces
export interface Investment {
    investmentId: string | null
    custodianId: string
    custodianName: string
    name: string
    description: string | null
    typeId: string | null
    transactionDate: string
    maturityDate: Date | undefined
    quantity: number

    amount: number
    price: number
    interestRate: string
    interestIndex: string
    investmentTypeId: string | null
    investmentTypeName: string | null
    parentId: string | null
    grossAmount: number | string
    percentageChange: number

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
    transactionId: number | null | undefined
    creditCardId: string | null
    // creditCardNickname: string | null
    period: number
    categoryId: string | null
    // categoryName: string | null
    amount: number //ok
    currencyId: string
    // currencySymbol: string
    transactionCurrencyId: string
    // transactionCurrencySymbol: string
    transactionAmount: number
    dueDate: string
    transactionDate: string
    description: string
    isInstallment: boolean | undefined | null
    installments: number | undefined | null
    currentInstallment: number | undefined | null
    totalAmount: number
    parentId: number | null
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