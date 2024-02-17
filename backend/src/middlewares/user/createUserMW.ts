import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

import db from '~/config/db'
import { convertPropertyNamesToCamel } from '~/utils'
import { APIError, User } from '~/@types'

export const createUserMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get fullname, email and password from request body, which are already validated by validateSchemaMW middleware
        const { fullname, email, password } = req.body

        // Check if email is used by another user
        const emailExists = await db.query('SELECT * FROM users WHERE email = $1;', [email])
        if (emailExists.rows.length > 0) {
            return next(new APIError(400, 'EMAIL is already taken', 'EMAIL_EXISTS'))
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

        // Insert user into database
        const result = await db.query(
            'INSERT INTO users (fullname, email, password, updated_at) VALUES ($1, $2, $3, $4) RETURNING *;',
            [user.fullname, user.email, user.password, user.updatedAt],
        )

        // Convert property names to camel case and set user in response locals
        res.locals.user = convertPropertyNamesToCamel<User>(result.rows[0])

        // Remove password from response
        delete res.locals.user.password

        return next()
    })
}
