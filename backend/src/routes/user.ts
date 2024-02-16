import { Router } from 'express'

import { createUserMW } from '~/middlewares/user'
import { sendResponseMW, validateSchemaMW } from '~/middlewares/common'

import { userSchema } from '~/schemas'

const router = Router()

router.post('/', validateSchemaMW(userSchema), createUserMW(), sendResponseMW())

export default router
