import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

type AlertProps = {
    message: string | null
}

export const ErrorAlert = ({ message }: AlertProps) => {
    if (!message) return null

    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
