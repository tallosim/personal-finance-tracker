import { Router } from 'express'

import { loginMW, sendResponseMW, validateSchemaMW } from '~/middlewares/common'

import { loginSchema } from '~/schemas'

const router = Router()

router.post('/login', validateSchemaMW(loginSchema), loginMW(), sendResponseMW('token', true))

export default router
