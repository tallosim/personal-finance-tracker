import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(32, 'Password must be at most 32 characters')
        .required('Password is required'),
})
