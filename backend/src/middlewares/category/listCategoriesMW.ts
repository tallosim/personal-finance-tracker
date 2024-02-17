import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { Category } from '~/@types'

export const listCategoriesMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get categories from database
        const result = await db.query('SELECT * FROM categories;')

        // Convert property names to camel case and set categories in response locals
        res.locals.categories = result.rows.map(category => convertPropertyNamesToCamel<Category>(category))

        return next()
    })
}
