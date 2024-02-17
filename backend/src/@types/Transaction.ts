export enum TransactionType {
    Income = 'income',
    Expense = 'expense',
}

export interface Transaction {
    id: string
    amount: number
    type: TransactionType
    occurredAt: Date
    description: string
    userId: string
    categoryId: string
    updatedAt: Date
}
