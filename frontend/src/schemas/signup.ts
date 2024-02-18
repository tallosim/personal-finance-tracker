import * as Yup from 'yup'

export const signupSchema = Yup.object({
    name: Yup.string().max(128, 'Name must be at most 128 characters').required('Name is required'),
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(32, 'Password must be at most 32 characters')
        .required('Password is required'),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Password repeat is required'),
})
