import { Router } from 'express'

import { sendResponseMW, authenticationMW } from '~/middlewares/common'
import { listCategoriesMW, readCategoryMW } from '~/middlewares/category'

const router = Router()

router.get('/', authenticationMW(), listCategoriesMW(), sendResponseMW('categories'))
router.get('/:id', authenticationMW(), readCategoryMW(), sendResponseMW('category'))

export default router
