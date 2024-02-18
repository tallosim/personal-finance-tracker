import axios, { isAxiosError } from 'axios'

import { logout } from 'helpers'
import { APIResponse, APIError, Category } from '@types'

export const listCategories = async () => {
    try {
        const response = await axios.get('/api/categories')
        const data = response.data as APIResponse<{ categories: Category[] }>

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
