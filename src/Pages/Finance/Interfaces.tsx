/**
 * This file contains all sharable interface in finance.
 * Any interface used in more than one file MUST be in here to maintain data integrity throughout the project
 * If the interface is specific to some case, it must be written within the correspondent file
 */
import {UUID} from "crypto";


export interface Statement {
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

export interface CreditCardBill {
    creditCardId: string | null
    creditCardName: string | null
    categoryId: string | null
    categoryName: string | null
    amount: number
    paymentAt: string
    purchaseAt: string
    description: string
    createdAt: string | undefined
    lastEditedAt: string | undefined
}

export interface InvestmentType {
    typeId: UUID
}

export interface InvestmentAllocation {

}