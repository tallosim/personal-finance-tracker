import { Button, Container, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from '@chakra-ui/react'

export const LoginPage = () => (
    <Container maxW='md' py={{ base: '12', md: '24' }}>
        <Stack spacing='8'>
            <Stack spacing='6'>
                <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                    <Heading size={{ base: 'xs', md: 'sm' }}>Personal Finance Tracker</Heading>
                    <Text color='fg.muted'>Log in to your account</Text>
                </Stack>
            </Stack>
            <Stack spacing='6'>
                <Stack spacing='5'>
                    <FormControl>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' placeholder='Enter your email' type='email' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' placeholder='********' type='password' />
                    </FormControl>
                </Stack>
                <Button>Sign in</Button>
            </Stack>
            <Text textStyle='sm' color='fg.muted'>
                Don't have an account? <Link href='#'> Sign up</Link>
            </Text>
        </Stack>
    </Container>
)

export default LoginPage
