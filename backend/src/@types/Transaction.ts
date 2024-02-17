export enum TransactionType {
    Income = 'income',
    Expense = 'expense',
}

export interface Transaction {
    id: number
    amount: number
    type: TransactionType
    description: string
    userId: number
    categoryId: number
    updatedAt: Date
}
