import { Request, Response, NextFunction } from 'express'

import { APIError, User } from '~/@types'

export const authorizationMW = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Check if userId is not set
        if (typeof res.locals.userId !== 'number') {
            throw new Error('userId is not defined')
        }

        // Check if userId from the access token is the same as the userId from the requested user object
        if (typeof res.locals.user !== 'undefined' && res.locals.userId === (res.locals.user as User).id) {
            return next()
        }

        // Check if userId from the access token is the same as the userId from the requested finance object
        // TODO: Add finance object to the response locals

		// If none of the above conditions are met, return 403 Forbidden
        return next(new APIError(403, 'Unauthorized access to the requested resource', 'FORBIDDEN'))
    }
}
