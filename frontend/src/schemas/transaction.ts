import * as Yup from 'yup'

export const transactionSchema = Yup.object({
    type: Yup.string().required('Type is required'),
    description: Yup.string()
        .max(128, 'Description must be at most 128 characters')
        .required('Description is required'),
    amount: Yup.string().required('Amount is required'),
    categoryId: Yup.string().required('Category is required'),
    occurredAt: Yup.date().required('Date is required'),
})
