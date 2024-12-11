/**
 * This file contains all sharable interface in finance.
 * Any interface used in more than one file MUST be in here to maintain data integrity throughout the project
 * If the interface is specific to some case, it must be written within the correspondent file
 */
import {UUID} from "crypto";

// Account interfaces
export interface Account {
    accountId: string
    nickname: string
    branch: string
    number: string
    openAt: string
    closeAt: string
}

export interface AccountTransaction {
    transactionId?: number | null
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
    investmentId?: string | null,
    transactionDate: string
    name: string;
    accountId: string;
    investmentTypeId: string;
    maturityDate: string | null;
    quantity: number;
    price: number;
    amount: number;
    contractedRate: string;
    currencyId: string;
    indexerTypeId: string;
    indexerId: string;
    liquidityId: string;
    liquidationDate?: string | null;
    liquidationAmount?: number;
    countryId: string;
    observation?: string;
}

export interface InvestmentType {
    investmentTypeId: string
    investmentTypeName: string
    description: string
    parentId: string
    investmentCategoryId: string
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


export interface CreditCardInstalments {
    currentInstallment: number;
    amount: number;
    dueDate: string;
}

export interface CreditCardTransactionTax {
    currencyId: string;
    taxId: string;
    amount: number;
}

export interface CreditCardTransaction {
    transactionId: number | null;
    creditCardId: string;
    // period: number;
    transactionDate: string;
    categoryId: string;
    amount: number;
    currencyId: string;

    // International transactions information
    transactionCurrencyId: string;
    transactionAmount: number;
    dollarExchangeRate?: number;
    currencyDollarExchangeRate?: number;
    taxDetail?: CreditCardTransactionTax[];
    totalTax?: number

    description: string;
    isInstallment: boolean;
    installments: CreditCardInstalments[];
    totInstallments: number
    totalAmount: number;
    parentId: number | null;
    createdAt?: string;
    lastEditedAt?: string;
}

export interface CreditCardBillHistory {
    period: number
    balance: number
    total_amount: number,
    total_amount_absolute: number
}


// Others
export interface ExpenseByCategory {
    categoryId: string;
    categoryName: string;
    total: number;
}

// export interface CategoryTransactions {
//     transactionID: number
//     categoryId: string
//     category: string // TODO: review this variable name, it is the parent category
//     categoryName: string
//     total: number
// }

export interface Summary {
    period: number
    referenceDate: string
    periodIncoming: number
    periodOutgoing: number
    periodBalance: number
    periodCreditCardBill: number
    periodCreditCardPurchaseQuantity: number
}

export interface Currency {
    currencyId: string
    name: string
    symbol: string
}

export interface Bank {
    bankId: string;
    bankName: string;
    code: number;
}

export interface IndexerType {
    indexerTypeId: string;
    indexerTypeName: string;
    description: string;
}

export interface Indexer {
    indexerId: string;
    indexerName: string;
    description: string;
}

export interface Liquidity {
    liquidityId: string;
    liquidityName: string;
    description: string;
}