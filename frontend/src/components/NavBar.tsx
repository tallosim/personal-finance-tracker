import { useState, useEffect } from 'react'
import { Avatar, Box, Container, HStack, Text, Heading, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

import { User } from '@types'
import { logout } from 'helpers'
import { getUser } from 'services'

export const NavBar = () => {
    // State to store the user data
    const [user, setUser] = useState<User | null>(null)

    // Fetch the user data
    const fetchUser = async () => {
        const { success, data } = await getUser()

        if (success) {
            setUser(data.user)
        }
    }

    // Fetch the user data when the component mounts
    useEffect(() => {
        fetchUser()
    }, [])

    const name = user?.name || 'User'

    return (
        <Box as='section'>
            <Box borderBottomWidth='1px' position='relative' zIndex='sticky' top='0' bg='bg.surface' boxShadow='sm'>
                <Container py={4}>
                    <HStack spacing={4} justifyContent='space-between'>
                        <Heading size='md' fontWeight='semibold'>
                            Personal Finance Tracker
                        </Heading>
                        <HStack spacing={4}>
                            <Text textStyle='lg' fontWeight='semibold'>
                                {name}
                            </Text>
                            <Menu placement='bottom'>
                                <MenuButton>
                                    <Avatar size='sm' name={name} />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </HStack>
                </Container>
            </Box>
        </Box>
    )
}
