import Joi from 'joi'

export const transactionSchema = Joi.object({
    amount: Joi.number().positive().required(),
    type: Joi.string().valid('income', 'expense').required(),
    occurred_at: Joi.date().required(),
    description: Joi.string().required(),
    categoryId: Joi.string().uuid().required(),
})