import { Router } from 'express'

import { loginMW, sendResponseMW } from '~/middlewares/common'

const router = Router()

router.post('/login', loginMW(), sendResponseMW([], true))

export default router
