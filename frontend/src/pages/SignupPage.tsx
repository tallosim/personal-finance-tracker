import { Button, Container, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from '@chakra-ui/react'

export const SignupPage = () => (
    <Container maxW='md' py={{ base: '12', md: '24' }}>
        <Stack spacing='8'>
            <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={{ base: 'xs', md: 'sm' }}>Personal Finance Tracker</Heading>
                <Text color='fg.muted'>Create an account</Text>
            </Stack>
            <Stack spacing='6'>
                <Stack spacing='5'>
                    <FormControl>
                        <FormLabel htmlFor='email'>Full Name</FormLabel>
                        <Input id='fullname' placeholder='Enter your full name' type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' placeholder='Enter your email' type='email' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' placeholder='********' type='password' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='password'>Password Repeat</FormLabel>
                        <Input id='password-repeat' placeholder='********' type='password' />
                    </FormControl>
                </Stack>
                <Button>Create account</Button>
            </Stack>
            <Text textStyle='sm' color='fg.muted' textAlign='center'>
                Already have an account? <Link href='/login'> Log in</Link>
            </Text>
        </Stack>
    </Container>
)

export default SignupPage