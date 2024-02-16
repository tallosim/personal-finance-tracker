import { Request, Response, NextFunction } from 'express'

import { APIResponse } from '~/@types'

export const sendResponseMW = (responseKeys: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const response: APIResponse = {
            suceess: true,
            message: 'Data fetched successfully',
            data: {},
        }

        responseKeys.forEach(key => {
            if (res.locals[key]) {
                response.data[key] = res.locals[key]
            }
        })

        return res.json(response)
    }
}
