import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { APIError, Transaction } from '~/@types'

export const updateTransactionMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get transaction id from request params
        // The transaction id is already checked in readTransactionMW middleware, so we don't need to check it again
        const transactionId = req.params.id

        // Get transaction data from request body, which is already validated by validateSchemaMW middleware
        const { amount, type, occurred_at, description, categoryId } = req.body

        // Get user id from request locals
        const userId = res.locals.userId

        // Check if category exists
        const categoryExists = await db.query('SELECT * FROM categories WHERE id = $1;', [categoryId])
        if (categoryExists.rows.length === 0) {
            return next(new APIError(400, 'Category does not exist', 'CATEGORY_NOT_FOUND'))
        }

        // Create transaction object
        const transaction: Omit<Transaction, 'id'> = {
            amount,
            type,
            occurred_at,
            description,
            userId,
            categoryId,
            updatedAt: new Date(),
        }

        // Update transaction in database
        const result = await db.query(
            'UPDATE transactions SET amount = $1, type = $2, occurred_at = $3, description = $4, user_id = $5, category_id = $6, updated_at = $7 WHERE id = $8 RETURNING *;',
            [
                transaction.amount,
                transaction.type,
                transaction.occurred_at,
                transaction.description,
                transaction.userId,
                transaction.categoryId,
                transaction.updatedAt,
                transactionId,
            ],
        )

        // Convert property names to camel case and set transaction in response locals
        res.locals.transaction = convertPropertyNamesToCamel<Transaction>(result.rows[0])

        return next()
    })
}
