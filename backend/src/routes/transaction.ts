import { Router } from 'express'

import { createTransactionMW, readTransactionMW } from '~/middlewares/transaction'
import { sendResponseMW, validateSchemaMW, authenticationMW, authorizationMW } from '~/middlewares/common'

import { transactionSchema } from '~/schemas'

const router = Router()

router.post(
    '/',
    authenticationMW(),
    validateSchemaMW(transactionSchema),
    createTransactionMW(),
    sendResponseMW('transaction'),
)
router.get('/:id', authenticationMW(), readTransactionMW(), authorizationMW(), sendResponseMW('transaction'))

export default router
