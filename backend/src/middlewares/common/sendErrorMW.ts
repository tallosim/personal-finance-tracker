import { NextFunction, Request, Response } from 'express'
import { DatabaseError } from 'pg'

import { APIResponse, APIError } from '~/@types'

export const sendErrorMW = () => {
    return (err: unknown, req: Request, res: Response, next: NextFunction) => {
        // Log error
        console.error(err)

        // Default status and response
        let status = 500
        const response: APIResponse = {
            success: false,
            message: 'Internal server error',
            type: 'INTERNAL_SERVER_ERROR',
            data: {},
        }

        // If error is an DatabaseError
        if (err instanceof DatabaseError) {
            status = 500
            response.message = err.message
            response.type = 'DATABASE_ERROR'
        }

        // If error is an APIError
        if (err instanceof APIError) {
            status = err.status
            response.message = err.message
            response.type = err.type
        }

        // If error is a SyntaxError
        if (err instanceof SyntaxError) {
            status = 400
            response.message = err.message
            response.type = 'SYNTAX_ERROR'
        }

        return res.status(status).json(response)
    }
}
