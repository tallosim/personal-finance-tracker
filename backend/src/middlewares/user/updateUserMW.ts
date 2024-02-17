import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { APIError, User } from '~/@types'

export const updateUserMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get user id from request params
        // The user id is already checked in readUserMW middleware, so we don't need to check it again
        const userId = req.params.id

        // Get fullname, email and password from request body, which are already validated by validateSchemaMW middleware
        const { fullname, email, password } = req.body

        // Check if email is used by another user
        const emailExists = await db.query('SELECT * FROM users WHERE email = $1;', [email])
        if (emailExists.rows.length > 0 && (emailExists.rows[0] as User).id !== userId) {
            return next(new APIError(400, 'EMAIL is already taken by another user', 'EMAIL_EXISTS'))
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create user object
        const user: Omit<User, 'id'> = {
            fullname,
            email,
            password: passwordHash,
            updatedAt: new Date(),
        }

        // Update user in database
        const result = await db.query(
            'UPDATE users SET fullname = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING *;',
            [user.fullname, user.email, user.password, user.updatedAt, userId],
        )

        // Convert property names to camel case and set user in response locals
        res.locals.user = convertPropertyNamesToCamel<User>(result.rows[0])

        // Remove password from response
        delete res.locals.user.password

        return next()
    })
}
