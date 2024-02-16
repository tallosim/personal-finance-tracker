import { Router } from 'express'

import { createUserMW, readUserMW } from '~/middlewares/user'
import { sendResponseMW, validateSchemaMW } from '~/middlewares/common'

import { userSchema } from '~/schemas'

const router = Router()

router.post('/', validateSchemaMW(userSchema), createUserMW(), sendResponseMW(['user']))
router.get('/:id', readUserMW(), sendResponseMW(['user']))

export default router
