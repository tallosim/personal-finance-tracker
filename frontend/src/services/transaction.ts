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

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'userId' | 'updatedAt'>) => {
    try {
        const response = await axios.post('/api/transactions', transaction)
        const data = response.data as APIResponse<{ transaction: Transaction }>

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

export const updateTransaction = async (id: string, transaction: Omit<Transaction, 'id' | 'userId' | 'updatedAt'>) => {
    try {
        const response = await axios.put(`/api/transactions/${id}`, transaction)
        const data = response.data as APIResponse<{ transaction: Transaction }>

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

export const deleteTransaction = async (id: string) => {
    try {
        const response = await axios.delete(`/api/transactions/${id}`)
        const data = response.data as APIResponse<Record<string, never>>

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
