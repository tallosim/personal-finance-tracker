import { Request, Response, NextFunction } from 'express'

import { APIResponse } from '~/@types'

export const sendResponseMW = (responseKeys: string[] | string = '') => {
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

        // Send response
        return res.json(response)
    }
}
