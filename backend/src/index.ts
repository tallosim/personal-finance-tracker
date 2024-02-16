import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

import db from '~/config/db'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', async (req: Request, res: Response) => {
	const { rows } = await db.query('SELECT NOW()')

	res.send('Now: ' + rows[0].now)
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} (http://localhost:${PORT})`)
})
