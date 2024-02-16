import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

import { APIError } from '~/@types'

export const validateSchemaMW = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body)

        // Check if there is an error
        if (error) {
            return next(new APIError(400, error.message, 'VALIDATION_ERROR'))
        }

        // Set validated value to req.body
        req.body = value

        return next()
    }
}
