import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'

export const deleteTransactionMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get transaction id from request params
        // The transaction id is already checked in readTransactionMW middleware, so we don't need to check it again
        const transactionId = req.params.id

        // Delete transaction from database
        await db.query('DELETE FROM transactions WHERE id = $1;', [transactionId])

        return next()
    })
}
