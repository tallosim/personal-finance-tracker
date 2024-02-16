import Joi from 'joi'

export const userSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(32)
        .regex(/^[a-zA-Z0-9_]+$/, { name: 'alphanumeric characters and underscores' })
        .required(),
    password: Joi.string().min(6).max(32).required(),
})
