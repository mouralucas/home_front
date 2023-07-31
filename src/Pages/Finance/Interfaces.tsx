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
    name: string | null
    description: string | null
    amount: number
    price: number
    quantity: number
    date: Date
    maturityDate: Date | null
    interestRate: string | null
    interestIndex: string | null
    custodianName: string | null
    custodianId: string | null
    investmentTypeId: string | null
    investmentTypeName: string | null
    parentId: string | null
    cashFlowId: string,
    createAt: Date | null,
    lastEditedAt: Date | null,
}