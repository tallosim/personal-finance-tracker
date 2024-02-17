import { Router } from 'express'

import {
    createTransactionMW,
    readTransactionMW,
    listTransactionsMW,
    calculateStatisticsMW,
    updateTransactionMW,
} from '~/middlewares/transaction'
import { sendResponseMW, validateSchemaMW, authenticationMW, authorizationMW } from '~/middlewares/common'

import { transactionSchema } from '~/schemas'

const router = Router()

router.get(
    '/',
    authenticationMW(),
    listTransactionsMW(),
    calculateStatisticsMW(),
    sendResponseMW(['transactions', 'statistics']),
)
router.post(
    '/',
    authenticationMW(),
    validateSchemaMW(transactionSchema),
    createTransactionMW(),
    sendResponseMW('transaction'),
)
router.get('/:id', authenticationMW(), readTransactionMW(), authorizationMW(), sendResponseMW('transaction'))
router.put(
    '/:id',
    authenticationMW(),
    validateSchemaMW(transactionSchema),
    readTransactionMW(),
    authorizationMW(),
    updateTransactionMW(),
    sendResponseMW('transaction'),
)

export default router
