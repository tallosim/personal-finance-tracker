import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { Transaction } from '~/@types'

export const listTransactionsMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get user id from the authenticated user
        const userId = res.locals.userId

        // Get transactions from database
        const result = await db.query('SELECT * FROM transactions WHERE user_id = $1;', [userId])

        // Convert property names to camel case and set transactions in response locals
        res.locals.transactions = result.rows.map(transaction => convertPropertyNamesToCamel<Transaction>(transaction))

        return next()
    })
}
