export interface Transaction {
    id: string
    amount: number
    type: 'income' | 'expense'
    occurredAt: Date
    description: string
    userId: string
    categoryId: string
    updatedAt: Date
}

export interface Statistics {
    totalIncome: number
    totalExpense: number
    balance: number
}
