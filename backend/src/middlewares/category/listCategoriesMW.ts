import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { Category } from '~/@types'

export const listCategoriesMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get categories from database
        const result = await db.query('SELECT * FROM categories;')

        // Set categories in response locals
        res.locals.categories = result.rows as Category[]

        return next()
    })
}
