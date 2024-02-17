import { Avatar, Box, Container, HStack, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

type NavBarProps = {
    name: string
}

export const NavBar = ({ name }: NavBarProps) => (
    <Box as='section'>
        <Box borderBottomWidth='1px' position='relative' zIndex='tooltip'>
            <Container py={4}>
                <HStack spacing={4} justifyContent='space-between'>
                    <Text textStyle='2xl' fontWeight='bold'>
                        Personal Finance Tracker
                    </Text>
                    <HStack spacing={4}>
                        <Text textStyle='md' fontWeight='semibold'>
                            {name}
                        </Text>
                        <Menu placement='bottom'>
                            <MenuButton>
                                <Avatar size='sm' name={name} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </HStack>
            </Container>
        </Box>
    </Box>
)
