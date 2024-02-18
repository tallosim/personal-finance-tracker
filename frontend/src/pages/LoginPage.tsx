import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from 'components'
import { login } from 'services'

const LoginPage = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true)

        const { success, message } = await login(email, password)
        console.log(success, message)

        // Simulate a delay to show the loading state
        await new Promise(resolve => setTimeout(resolve, 500))

        setIsLoading(false)

        if (success) {
            navigate('/dashboard')
        } else {
            setError(message)
        }
    }

    return <LoginForm handleLogin={handleLogin} isLoading={isLoading} error={error} />
}

export default LoginPage
