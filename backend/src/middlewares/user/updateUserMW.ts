import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

import db from '~/config/db'
import { APIError, User } from '~/@types'

export const updateUserMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get user id from request params
        // The user id is already checked in readUserMW middleware, so we don't need to check it again
        const userId = req.params.id

        // Get username and password from request body, which are already validated by validateSchemaMW middleware
        const { username, password } = req.body

        // Check if username is used by another user
        const usernameExists = await db.query('SELECT * FROM users WHERE username = $1;', [username])
        if (usernameExists.rows.length > 0 && (usernameExists.rows[0] as User).id !== userId) {
            return next(new APIError(400, 'Username is already taken by another user', 'USERNAME_TAKEN'))
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create user object
        const user: Omit<User, 'id'> = {
            username,
            password: passwordHash,
            updatedAt: new Date(),
        }

        // Update user in database
        const result = await db.query(
            'UPDATE users SET username = $1, password = $2, updated_at = $3 WHERE id = $4 RETURNING *;',
            [user.username, user.password, user.updatedAt, userId],
        )

        // Set user in response locals
        res.locals.user = result.rows[0] as User

        // Remove password from response
        delete res.locals.user.password

        return next()
    })
}
