import Joi from 'joi'

export const transactionSchema = Joi.object({
    amount: Joi.number().min(0).required(),
    type: Joi.string().valid('income', 'expense').required(),
    occurredAt: Joi.date().required(),
    description: Joi.string().required(),
    categoryId: Joi.string().uuid().required(),
})
