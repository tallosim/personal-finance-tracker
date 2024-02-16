import express, { json, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

import { APIError } from '~/@types'
import { sendErrorMW } from '~/middlewares/common'

import commonRoutes from '~/routes/common'
import userRoutes from '~/routes/user'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(json())

// Routes
app.use('/api', commonRoutes)
app.use('/api/users', userRoutes)

// Error 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    return next(new APIError(404, 'Not found', 'NOT_FOUND'))
})

// Error handler
app.use(sendErrorMW())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`)
})
