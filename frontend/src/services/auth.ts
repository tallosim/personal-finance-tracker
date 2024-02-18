import axios, { isAxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

import { APIResponse, APIError } from '@types'

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/login', { email, password })
        const data = response.data as APIResponse<{ token: string }>

        // Decode the token
        const token = data.data.token
        const decodedToken = jwtDecode<{ exp: number; userId: string }>(token)

        // Get the expiration date
        const expiration = decodedToken.exp * 1000
        const expirationDate = new Date(expiration).toISOString()

        // Create a new object with the expiration date and the user id
        const userData = { expirationDate, userId: decodedToken.userId }

        // Save the expiration date in the local storage
        localStorage.setItem('userData', JSON.stringify(userData))

        return data
    } catch (error) {
        if (isAxiosError(error)) {
            const response = error.response?.data as APIError
            return response
        }
        throw error
    }
}
