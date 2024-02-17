import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { APIError, User } from '~/@types'
import db from '~/config/db'

dotenv.config()

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN) : 24 * 60 * 60
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

export const loginMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Get email and password from request body
        const { email, password } = req.body

        // Get user from database
        const result = await db.query('SELECT * FROM users WHERE email = $1;', [email])

        // Check if user exists
        if (result.rowCount === 0) {
            return next(new APIError(401, 'Invalid email or password', 'INVALID_EMAIL_OR_PASSWORD'))
        }

        // Get user from result
        const user = result.rows[0] as User

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return next(new APIError(401, 'Invalid email or password', 'INVALID_EMAIL_OR_PASSWORD'))
        }

        // Create token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })

        // Set token in response locals
        res.locals.token = token

        return next()
    })
}
