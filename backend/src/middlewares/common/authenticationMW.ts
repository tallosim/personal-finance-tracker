import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { APIError } from '~/@types'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

export const authenticationMW = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if token is not set
        if (typeof req.cookies === 'undefined' || typeof req.cookies.access_token !== 'string') {
            return next(new APIError(401, 'Access token is not set', 'UNAUTHORIZED'))
        }

        // Get token from cookies
        const accessToken = req.cookies.access_token

        try {
            // Decode JWT token
            const decoded = jwt.verify(accessToken, JWT_SECRET)

            // Extract user id from token
            const userId = (decoded as { userId: string; username: string }).userId

            // TODO: Check if user exists in database

            // Set user id in response locals
            res.locals.userId = userId

            return next()
        } catch (err) {
            // If token is invalid or expired
            return next(new APIError(401, 'Invalid or expired access token', 'UNAUTHORIZED'))
        }
    }
}
