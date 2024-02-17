import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { APIError, User } from '~/@types'

export const readUserMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get user id from request params
        const userId = req.params.id
        if (typeof userId !== 'string') {
            return next(new APIError(400, 'Invalid user id', 'INVALID_USER_ID'))
        }

        // Get user from database
        const result = await db.query('SELECT * FROM users WHERE id = $1;', [userId])

        // Check if user exists
        if (result.rowCount === 0) {
            return next(new APIError(404, 'User not exists', 'USER_NOT_EXISTS'))
        }

        // Convert property names to camel case and set user in response locals
        res.locals.user = convertPropertyNamesToCamel<User>(result.rows[0])

        // Remove password from response
        delete res.locals.user.password

        return next()
    })
}
