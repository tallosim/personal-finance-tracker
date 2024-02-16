import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

import db from '~/config/db'

export const deleteUserMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get user id from request params
        // The user id is already checked in readUserMW middleware, so we don't need to check it again
        const userId = parseInt(req.params.id)

        // Delete user from database
        await db.query('DELETE FROM users WHERE id = $1;', [userId])

        return next()
    })
}
