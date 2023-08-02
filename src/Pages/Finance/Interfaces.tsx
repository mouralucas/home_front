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
    maturityDate: Date | undefined
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