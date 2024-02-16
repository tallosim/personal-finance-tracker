import { Router } from 'express'

import { createUserMW } from '~/middlewares/user'
import { sendResponseMW } from '~/middlewares/common'

const router = Router()

router.post('/', createUserMW(), sendResponseMW(['user']))

export default router
