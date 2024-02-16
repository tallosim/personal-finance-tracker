import { Router } from 'express'

import { createUserMW, readUserMW, updateUserMW, deleteUserMW } from '~/middlewares/user'
import { sendResponseMW, validateSchemaMW } from '~/middlewares/common'

import { userSchema } from '~/schemas'

const router = Router()

router.post('/', validateSchemaMW(userSchema), createUserMW(), sendResponseMW(['user']))
router.get('/:id', readUserMW(), sendResponseMW(['user']))
router.put('/:id', validateSchemaMW(userSchema), readUserMW(), updateUserMW(), sendResponseMW(['user']))
router.delete('/:id', readUserMW(), deleteUserMW(), sendResponseMW())

export default router
