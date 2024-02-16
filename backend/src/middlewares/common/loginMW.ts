import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { APIError, User } from '~/@types'
import db from '~/config/db'

dotenv.config()

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

export const loginMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get username and password from request body
        const { username, password } = req.body

        // Get user from database
        const result = await db.query('SELECT * FROM users WHERE username = $1;', [username])

        // Check if user exists
        if (result.rowCount === 0) {
            return next(new APIError(401, 'Invalid username or password', 'INVALID_USERNAME_OR_PASSWORD'))
        }

        // Get user from result
        const user = result.rows[0] as User

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return next(new APIError(401, 'Invalid username or password', 'INVALID_USERNAME_OR_PASSWORD'))
        }

        // Create token
        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: isNaN(parseInt(JWT_EXPIRES_IN)) ? JWT_EXPIRES_IN : parseInt(JWT_EXPIRES_IN),
        })

        // Set token in response locals
        res.locals.token = token

        return next()
    })
}
