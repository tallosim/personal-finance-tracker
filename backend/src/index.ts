import express, { json, Request, Response, NextFunction } from 'express'
import cookiePraser from 'cookie-parser'
import dotenv from 'dotenv'

import { APIError } from '~/@types'
import { sendErrorMW } from '~/middlewares/common'

import commonRoutes from '~/routes/common'
import userRoutes from '~/routes/user'
import categoryRoutes from '~/routes/category'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(json())
app.use(cookiePraser())

// Routes
app.use('/api', commonRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)

// Error 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    return next(new APIError(404, 'Not found', 'NOT_FOUND'))
})

// Error handler
app.use(sendErrorMW())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`)
})
