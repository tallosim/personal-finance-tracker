import axios, { isAxiosError } from 'axios'

import { APIResponse, APIError, User } from '@types'
import { logout, getUserId } from 'helpers'

export const signup = async (user: Omit<User, 'id' | 'updatedAt'>) => {
    try {
        const response = await axios.post('/api/users', user)
        const data = response.data as APIResponse<{ user: User }>

        return data
    } catch (error) {
        if (isAxiosError(error)) {
            const response = error.response?.data as APIError
            return response
        }
        throw error
    }
}

export const getUser = async () => {
    // Get the userId from the local storage
    const userId = getUserId()

    // If there is no userId, the user is not logged in
    if (!userId) {
        logout()

        return { success: false, message: 'User is not logged in', type: 'error', data: {} } as APIError
    }

    try {
        const response = await axios.get(`/api/users/${userId}`)
        const data = response.data as APIResponse<{ user: User }>

        return data
    } catch (error) {
        if (isAxiosError(error)) {
            const response = error.response?.data as APIError
            return response
        }
        throw error
    }
}
