interface Statement {
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

export default Statement