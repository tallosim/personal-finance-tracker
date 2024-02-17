import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

import db from '~/config/db'
import { APIError } from '~/@types'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

export const authenticationMW = () => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Check if token is not set
        if (typeof req.cookies === 'undefined' || typeof req.cookies.access_token !== 'string') {
            return next(new APIError(401, 'Access token is not set', 'UNAUTHORIZED'))
        }

        // Get token from cookies
        const accessToken = req.cookies.access_token

        // Create variable to store decoded token
        let decoded: string | JwtPayload

        // Decode JWT token
        try {
            decoded = jwt.verify(accessToken, JWT_SECRET)
        } catch (err) {
            // If token is invalid or expired
            return next(new APIError(401, 'Invalid or expired access token', 'UNAUTHORIZED'))
        }

        // Extract user id from token
        const userId = (decoded as { userId: string; email: string }).userId

        // Check user id in database
        // It is necessary to check if user exists in database, because user can be deleted after token is issued
        const result = await db.query('SELECT * FROM users WHERE id = $1;', [userId])
        if (result.rowCount === 0) {
            return next(new APIError(401, 'User id provided in token does not exist', 'UNAUTHORIZED'))
        }

        // Set user id in response locals
        res.locals.userId = userId

        return next()
    })
}
