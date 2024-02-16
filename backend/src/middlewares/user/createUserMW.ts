import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

import db from '~/config/db'
import { APIError, User } from '~/@types'

export const createUserMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body

        // Check if username is used by another user
        const usernameExists = await db.query('SELECT * FROM users WHERE username = $1;', [username])
        if (usernameExists.rows.length > 0) {
            return next(new APIError(400, 'Username is already taken', 'USERNAME_TAKEN'))
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create user object
        const user: Omit<User, 'id'> = {
            username,
            password: passwordHash,
            createdAt: new Date(),
        }

        // Insert user into database
        const result = await db.query(
            'INSERT INTO users (username, password, created_at) VALUES ($1, $2, $3) RETURNING *;',
            [user.username, user.password, user.createdAt],
        )

        // Set user in response locals
        res.locals.user = result.rows[0] as User

        // Remove password from response
        delete res.locals.user.password

        return next()
    })
}