import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { APIError, Transaction } from '~/@types'

export const createTransactionMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get transaction data from request body, which is already validated by validateSchemaMW middleware
        const { amount, type, occurredAt, description, categoryId } = req.body

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
            occurredAt,
            description,
            userId,
            categoryId,
            updatedAt: new Date(),
        }

        // Insert transaction into database
        const result = await db.query(
            'INSERT INTO transactions (amount, type, occurred_at, description, user_id, category_id, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
            [
                transaction.amount,
                transaction.type,
                transaction.occurredAt,
                transaction.description,
                transaction.userId,
                transaction.categoryId,
                transaction.updatedAt,
            ],
        )

        // Convert property names to camel case and set transaction in response locals
        res.locals.transaction = convertPropertyNamesToCamel<Transaction>(result.rows[0])

        return next()
    })
}
