import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { APIError, Transaction } from '~/@types'

export const readTransactionMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get transaction id from request params
        const transactionId = req.params.id
        if (typeof transactionId !== 'string') {
            return next(new APIError(400, 'Invalid transaction id', 'INVALID_TRANSACTION_ID'))
        }

        // Get transaction from database
        const result = await db.query('SELECT * FROM transactions WHERE id = $1;', [transactionId])

        // Check if transaction exists
        if (result.rowCount === 0) {
            return next(new APIError(404, 'Transaction not exists', 'TRANSACTION_NOT_EXISTS'))
        }

        // Convert property names to camel case and set transaction in response locals
        res.locals.transaction = convertPropertyNamesToCamel<Transaction>(result.rows[0])

        return next()
    })
}
