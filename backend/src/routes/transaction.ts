import { Router } from 'express'

import { createTransactionMW, readTransactionMW, listTransactionsMW } from '~/middlewares/transaction'
import { sendResponseMW, validateSchemaMW, authenticationMW, authorizationMW } from '~/middlewares/common'

import { transactionSchema } from '~/schemas'

const router = Router()

router.get('/', authenticationMW(), listTransactionsMW(), sendResponseMW('transactions'))
router.post(
    '/',
    authenticationMW(),
    validateSchemaMW(transactionSchema),
    createTransactionMW(),
    sendResponseMW('transaction'),
)
router.get('/:id', authenticationMW(), readTransactionMW(), authorizationMW(), sendResponseMW('transaction'))

export default router
