import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { Transaction } from '~/@types'

export const listTransactionsMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get user id from the authenticated user
        const userId = res.locals.userId

        // Check if start and end date are provided and if they are valid
        let startDate = null
        let endDate = null

        if (typeof req.query.startDate === 'string' && !isNaN(Date.parse(req.query.startDate))) {
            startDate = new Date(req.query.startDate)
        }

        if (typeof req.query.endDate === 'string' && !isNaN(Date.parse(req.query.endDate))) {
            endDate = new Date(req.query.endDate)
        }

        // Get transactions from database
        const result = await db.query(
            'SELECT * FROM transactions WHERE user_id = $1 AND ($2::timestamp is null OR occurred_at >= $2) AND ($3::timestamp is null OR occurred_at <= $3) ORDER BY occurred_at DESC;',
            [userId, startDate, endDate],
        )

        // Convert property names to camel case and set transactions in response locals
        res.locals.transactions = result.rows.map(transaction => convertPropertyNamesToCamel<Transaction>(transaction))

        return next()
    })
}
