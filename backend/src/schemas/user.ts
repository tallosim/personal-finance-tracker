import Joi from 'joi'

export const userSchema = Joi.object({
    fullname: Joi.string().max(128).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
})
