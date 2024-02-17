import { Request, Response, NextFunction } from 'express'

import { APIError, User, Transaction } from '~/@types'

export const authorizationMW = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if userId is not set
        if (typeof res.locals.userId !== 'string') {
            throw new Error('userId is not defined')
        }

        // Check if userId from the access token is the same as the userId from the requested user object
        if (typeof res.locals.user !== 'undefined' && res.locals.userId === (res.locals.user as User).id) {
            return next()
        }

        // Check if userId from the access token is the same as the userId from the requested transaction object
        if (
            typeof res.locals.transaction !== 'undefined' &&
            res.locals.userId === (res.locals.transaction as Transaction).userId
        ) {
            return next()
        }

        // If none of the above conditions are met, return 403 Forbidden
        return next(new APIError(403, 'Unauthorized access to the requested resource', 'FORBIDDEN'))
    }
}
