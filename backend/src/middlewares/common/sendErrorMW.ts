import { NextFunction, Request, Response } from 'express'
import { DatabaseError } from 'pg'

import { APIResponse, APIError } from '~/@types'

export const sendErrorMW = () => {
    return (err: unknown, req: Request, res: Response, next: NextFunction) => {
        let status = 500
        const response: APIResponse = {
            suceess: false,
            message: 'Internal server error',
            type: 'INTERNAL_SERVER_ERROR',
            data: {},
        }

        if (err instanceof DatabaseError) {
            status = 500
            response.message = err.message
            response.type = 'DATABASE_ERROR'
        }

        if (err instanceof APIError) {
            status = err.status
            response.message = err.message
            response.type = err.type
        }

        return res.status(status).json(response)
    }
}
