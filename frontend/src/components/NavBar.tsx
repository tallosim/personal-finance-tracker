import { Avatar, Box, Container, HStack, Text, Heading, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

import { logout } from 'helpers'

type NavBarProps = {
    name: string
}

export const NavBar = ({ name }: NavBarProps) => (
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
