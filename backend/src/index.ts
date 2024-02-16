import express, { json, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

import { APIError } from '~/@types'
import { sendErrorMW } from '~/middlewares/common'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(json())

// Error 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error: APIError = {
        status: 404,
        message: 'API endpoint not found',
        type: 'NOT_FOUND',
    }

    return next(error)
})

// Error handler
app.use(sendErrorMW())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`)
})
