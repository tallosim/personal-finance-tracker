import {
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

export const SignupForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: values => {
            console.log(values)
        },
    })

    return (
        <Container maxW='md' py={{ base: '12', md: '24' }}>
            <Stack spacing='8'>
                <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                    <Heading size={{ base: 'xs', md: 'sm' }}>Personal Finance Tracker</Heading>
                    <Text color='fg.muted'>Create an account</Text>
                </Stack>
                <Stack spacing='6'>
                    <Stack spacing='5'>
                        <FormControl isRequired isInvalid={Boolean(errors.name) && touched.name}>
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
                        <FormControl isRequired isInvalid={Boolean(errors.email) && touched.email}>
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
                        <FormControl isRequired isInvalid={Boolean(errors.password) && touched.password}>
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
                        <FormControl isRequired isInvalid={Boolean(errors.passwordRepeat) && touched.passwordRepeat}>
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
                    </Stack>
                    <Button onClick={() => handleSubmit()}>Sign up</Button>
                </Stack>
                <Text textStyle='sm' color='fg.muted' textAlign='center'>
                    Already have an account? <Link href='/login'> Log in</Link>
                </Text>
            </Stack>
        </Container>
    )
}
