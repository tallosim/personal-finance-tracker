import { Button, Container, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'

export const LoginForm = () => {
    const initialValues = {
        email: '',
        password: '',
    }

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit: values => {
            console.log(values)
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
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                id='email'
                                name='email'
                                placeholder='Enter your email'
                                type='email'
                                value={values.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                id='password'
                                name='password'
                                placeholder='********'
                                type='password'
                                value={values.password}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Stack>
                    <Button onClick={() => handleSubmit()}>Sign in</Button>
                </Stack>
                <Text textStyle='sm' color='fg.muted' textAlign='center'>
                    Don't have an account? <Link href='/signup'> Sign up</Link>
                </Text>
            </Stack>
        </Container>
    )
}
