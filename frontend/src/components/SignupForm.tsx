import { useEffect } from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
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

import { signupSchema } from 'schemas'
import { User } from '@types'

type SignupFormProps = {
    handleSignup: (user: Omit<User, 'id' | 'updatedAt'>) => void
    isLoading: boolean
    isSuccessful: boolean
    error: string | null
}

export const SignupForm = ({ handleSignup, isLoading, isSuccessful, error }: SignupFormProps) => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: values => {
            const user: Omit<User, 'id' | 'updatedAt'> = {
                name: values.name,
                email: values.email,
                password: values.password,
            }

            handleSignup(user)
        },
    })

    // Reset the form when the successful state changes
    useEffect(() => {
        if (isSuccessful) {
            resetForm()
        }
    }, [isSuccessful, resetForm])

    return (
        <Container maxW='md' py={{ base: '12', md: '24' }}>
            <Stack spacing='8'>
                <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                    <Heading size={{ base: 'xs', md: 'sm' }}>Personal Finance Tracker</Heading>
                    <Text color='fg.muted'>Create an account</Text>
                </Stack>
                <Stack spacing='6'>
                    <Stack spacing='5'>
                        <FormControl isRequired isInvalid={Boolean(errors.name) && touched.name} isDisabled={isLoading}>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                id='name'
                                name='name'
                                placeholder='Enter your full name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
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
                        <FormControl
                            isRequired
                            isInvalid={Boolean(errors.passwordRepeat) && touched.passwordRepeat}
                            isDisabled={isLoading}
                        >
                            <FormLabel>Password Repeat</FormLabel>
                            <Input
                                id='passwordRepeat'
                                name='passwordRepeat'
                                placeholder='********'
                                type='password'
                                value={values.passwordRepeat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormErrorMessage>{errors.passwordRepeat}</FormErrorMessage>
                        </FormControl>
                        {error && (
                            <Alert status='error'>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                        {isSuccessful && (
                            <Alert
                                status='success'
                                variant='subtle'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                textAlign='center'
                                height='200px'
                            >
                                <AlertIcon boxSize='40px' mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize='lg'>
                                    Signup was successful
                                </AlertTitle>
                                <AlertDescription maxWidth='sm'>
                                    Now you can <Link href='/login'>log in</Link> to your account
                                </AlertDescription>
                            </Alert>
                        )}
                    </Stack>
                    <Button onClick={() => handleSubmit()} isLoading={isLoading}>
                        Sign up
                    </Button>
                </Stack>
                <Text textStyle='sm' color='fg.muted' textAlign='center'>
                    Already have an account? <Link href='/login'> Log in</Link>
                </Text>
            </Stack>
        </Container>
    )
}
