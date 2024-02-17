import { Request, Response, NextFunction } from 'express'

import { Transaction } from '~/@types'

export const calculateStatisticsMW = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Get transactions from response locals
        const transactions = res.locals.transactions as Transaction[]

        // Check if transactions is an array
        if (!Array.isArray(transactions)) {
            throw new Error('Transactions is not an array')
        }

        // Sum all transactions, by type
        const totalIncome = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + transaction.amount, 0)
        const totalExpense = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0)

        // Calculate balance
        const balance = totalIncome - totalExpense

        // Set total income, total expense and balance in response locals
        res.locals.statistics = {
            totalIncome,
            totalExpense,
            balance,
        }

        return next()
    }
}
