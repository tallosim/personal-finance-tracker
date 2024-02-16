import { Router } from 'express'

import { sendResponseMW, authenticationMW } from '~/middlewares/common'
import { listCategoriesMW } from '~/middlewares/category'

const router = Router()

router.get('/', authenticationMW(), listCategoriesMW(), sendResponseMW('categories'))

export default router
