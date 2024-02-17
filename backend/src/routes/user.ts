import { Router } from 'express'

import { createUserMW, readUserMW, updateUserMW, deleteUserMW } from '~/middlewares/user'
import { sendResponseMW, validateSchemaMW, authenticationMW, authorizationMW } from '~/middlewares/common'

import { userSchema } from '~/schemas'

const router = Router()

router.post('/', validateSchemaMW(userSchema), createUserMW(), sendResponseMW('user'))
router.get('/:id', authenticationMW(), readUserMW(), authorizationMW(), sendResponseMW('user'))
router.put(
    '/:id',
    authenticationMW(),
    validateSchemaMW(userSchema),
    readUserMW(),
    authorizationMW(),
    updateUserMW(),
    sendResponseMW('user'),
)
router.delete('/:id', authenticationMW(), readUserMW(), authorizationMW(), deleteUserMW(), sendResponseMW())

export default router
