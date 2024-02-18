import { useState } from 'react'

import { SignupForm } from 'components'
import { signup } from 'services'
import { User } from '@types'

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleSignup = async (user: Omit<User, 'id' | 'updatedAt'>) => {
        setIsLoading(true)

        const { success, message } = await signup(user)
        console.log(success, message)

        // Simulate a delay to show the loading state
        await new Promise(resolve => setTimeout(resolve, 500))

        setIsLoading(false)

        if (success) {
            setIsSuccessful(true)
        } else {
            setError(message)
        }
    }

    return <SignupForm handleSignup={handleSignup} isLoading={isLoading} error={error} isSuccessful={isSuccessful} />
}

export default SignupPage
