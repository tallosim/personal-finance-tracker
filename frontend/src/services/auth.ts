import axios, { isAxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

import { APIResponse, APIError, User } from '@types'

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/login', { email, password })
        const data = response.data as APIResponse<{ token: string }>

        // Extract the token and expiration date from the response
        const token = data.data.token
        const experation = jwtDecode<{ exp: number }>(token).exp * 1000
        const experationDate = new Date(experation)

        // Save the expiration date in the local storage
        localStorage.setItem('expirationDate', experationDate.toISOString())

        return data
    } catch (error) {
        if (isAxiosError(error)) {
            const response = error.response?.data as APIError
            return response
        }
        throw error
    }
}

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
