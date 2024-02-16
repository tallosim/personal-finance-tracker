import { NextFunction, Request, Response } from 'express'

import { APIResponse, APIError } from '~/@types'

export const sendErrorMW = () => {
    return (err: APIError, req: Request, res: Response, next: NextFunction) => {
        const { status = 500, message = 'Internal server error', type = 'INTERNAL_SERVER_ERROR' } = err

        const response: APIResponse = {
            suceess: false,
            message,
            type,
            data: {},
        }

        return res.status(status).json(response)
    }
}
