import { Router } from 'express'

import { createTransactionMW } from '~/middlewares/transaction'
import { sendResponseMW, validateSchemaMW, authenticationMW } from '~/middlewares/common'

import { transactionSchema } from '~/schemas'

const router = Router()

router.post(
    '/',
    authenticationMW(),
    validateSchemaMW(transactionSchema),
    createTransactionMW(),
    sendResponseMW('transaction'),
)

export default router
