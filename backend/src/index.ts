import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

import db from '~/config/db'
import { Category } from '~/@types'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', async (req: Request, res: Response) => {
	const categories = (await db.query('SELECT * FROM categories;')).rows as Category[]

	res.json(categories)
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`)
})
