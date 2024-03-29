import {
    Alert,
    AlertIcon,
    Button,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'
import { useFormik } from 'formik'

import { loginSchema } from 'schemas'

type LoginFormProps = {
    handleLogin: (email: string, password: string) => void
    isLoading: boolean
    error: string | null
}

export const LoginForm = ({ handleLogin, isLoading, error }: LoginFormProps) => {
    const initialValues = {
        email: '',
        password: '',
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: values => {
            handleLogin(values.email, values.password)
        },
    })

    return (
        <Container maxW='md' py={{ base: '12', md: '24' }}>
            <Stack spacing='8'>
                <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                    <Heading size={{ base: 'xs', md: 'sm' }}>Personal Finance Tracker</Heading>
                    <Text color='fg.muted'>Log in to your account</Text>
                </Stack>
                <Stack spacing='6'>
                    <Stack spacing='5'>
                        <FormControl
                            isRequired
                            isInvalid={Boolean(errors.email) && touched.email}
                            isDisabled={isLoading}
                        >
                            <FormLabel>Email</FormLabel>
                            <Input
                                id='email'
                                name='email'
                                placeholder='Enter your email'
                                type='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={Boolean(errors.password) && touched.password}
                            isDisabled={isLoading}
                        >
                            <FormLabel>Password</FormLabel>
                            <Input
                                id='password'
                                name='password'
                                placeholder='********'
                                type='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        {error && (
                            <Alert status='error'>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                    </Stack>
                    <Button onClick={() => handleSubmit()} isLoading={isLoading} loadingText='Logging in'>
                        Log in
                    </Button>
                </Stack>
                <Text textStyle='sm' color='fg.muted' textAlign='center'>
                    Don't have an account? <Link href='/signup'> Sign up</Link>
                </Text>
            </Stack>
        </Container>
    )
}
