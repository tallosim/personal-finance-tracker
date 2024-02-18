import axios, { isAxiosError } from 'axios'

import { logout } from 'helpers'
import { APIResponse, APIError, Transaction, Statistics } from '@types'

export const listTransactions = async () => {
    try {
        const response = await axios.get('/api/transactions')
        const data = response.data as APIResponse<{ transactions: Transaction[]; statistics: Statistics }>

        return data
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) logout()

            const response = error.response?.data as APIError
            return response
        }
        throw error
    }
}
