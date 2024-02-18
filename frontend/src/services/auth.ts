import axios, { isAxiosError } from 'axios'

import { APIResponse, APIError } from '@types'

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/login', { email, password })
        return response.data as APIResponse<Record<string, never>>
    } catch (error) {
        if (isAxiosError(error)) {
            const response = error.response?.data as APIError
            return response
        }
        throw error
    }
}
