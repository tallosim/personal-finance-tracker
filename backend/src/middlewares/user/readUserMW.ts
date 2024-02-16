import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'
import { APIError, User } from '~/@types'

export const readUserMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get user id from request params
        const userId = parseInt(req.params.id)
        if (typeof userId !== 'number' || isNaN(userId)) {
            return next(new APIError(400, 'Invalid user id', 'INVALID_USER_ID'))
        }

        // Get user from database
        const result = await db.query('SELECT * FROM users WHERE id = $1;', [userId])

        // Check if user exists
        if (result.rowCount === 0) {
            return next(new APIError(404, 'User not exists', 'USER_NOT_EXISTS'))
        }

        // Set user in response locals
        res.locals.user = result.rows[0] as User

        // Remove password from response
        delete res.locals.user.password

        return next()
    })
}
