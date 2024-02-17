import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { APIError, Category } from '~/@types'

export const readCategoryMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get category id from request params
        const categoryId = req.params.id

        // Get category from database
        const result = await db.query('SELECT * FROM categories WHERE id = $1;', [categoryId])

        // Check if category exists
        if (result.rowCount === 0) {
            return next(new APIError(404, 'Category not exists', 'CATEGORY_NOT_EXISTS'))
        }

        // Convert property names to camel case and set category in response locals
        res.locals.category = convertPropertyNamesToCamel<Category>(result.rows[0])

        return next()
    })
}
