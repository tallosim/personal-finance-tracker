import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

import { APIResponse } from '~/@types'

dotenv.config()

const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE ? parseInt(process.env.COOKIE_MAX_AGE) : 24 * 60 * 60 * 1000
const SECURE = process.env.NODE_ENV === 'production'

export const sendResponseMW = (responseKeys: string[] | string = '', setToken: boolean = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Create response object
        const response: APIResponse = {
            suceess: true,
            message: 'Success',
            data: {},
        }

        // If responseKeys is a string, convert it to an array
        if (typeof responseKeys === 'string') {
            responseKeys = [responseKeys]
        }

        // Set response data from response locals
        responseKeys.forEach(key => {
            if (res.locals[key]) {
                response.data[key] = res.locals[key]
            }
        })

        // Check if setToken is true, the token is in response locals
        if (setToken && typeof res.locals.token !== 'string') {
            throw new Error('Token is not set in response locals')
        }

        // Send the response with token in the cookies
        if (setToken) {
            return res
                .cookie('access_token', res.locals.token, {
                    httpOnly: true,
                    secure: SECURE,
                    maxAge: COOKIE_MAX_AGE,
                })
                .json(response)
        }

        // Send response
        return res.json(response)
    }
}
