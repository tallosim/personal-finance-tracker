import {
    Badge,
    Card,
    Container,
    Center,
    HStack,
    Stack,
    Text,
    List,
    ListItem,
    Square,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { Transaction, Category } from '@types'
import { FaHandHoldingDollar, FaMoneyBill1, FaEllipsisVertical, FaPenToSquare, FaTrashCan } from 'react-icons/fa6'

type TransactionCardProps = {
    transaction: Transaction
    category: Category
}

export const TransactionCard = ({ transaction, category }: TransactionCardProps) => (
    <ListItem key={transaction.id} value={transaction.id} position='relative' width='fit-content'>
        <Card bg='bg.surface' p='4' width='lg' borderRadius='lg' boxShadow='sm'>
            <HStack spacing='4' display='flex' alignItems='center'>
                <Square size='12' bg={transaction.type === 'income' ? 'green.400' : 'red.400'} borderRadius='md'>
                    <Icon
                        as={transaction.type === 'income' ? FaHandHoldingDollar : FaMoneyBill1}
                        boxSize='6'
                        color='fg.accent.default'
                    />
                </Square>
                <Stack spacing='1'>
                    <HStack spacing='2'>
                        <Text textStyle='lg' fontWeight='medium'>
                            {transaction.description}
                        </Text>
                        <Badge colorScheme='blue' variant='subtle' size='xs'>
                            {category.title}
                        </Badge>
                    </HStack>
                    <Text textStyle='sm' color='fg.muted'>
                        {transaction.occurredAt.toLocaleDateString()}
                    </Text>
                </Stack>
                <Text textStyle='2xl' fontWeight='medium' flexGrow={1} textAlign='right'>
                    {transaction.type === 'income' ? '+' : '-'} {transaction.amount} DKK
                </Text>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FaEllipsisVertical />}
                        variant='ghost'
                        size='xs'
                        color='fg.default'
                        _hover={{ bg: 'gray.50' }}
                    />
                    <MenuList>
                        <MenuItem icon={<FaPenToSquare />}>Edit Transaction</MenuItem>
                        <MenuItem icon={<FaTrashCan />}>Delete Transaction</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Card>
    </ListItem>
)

type TransactionListProps = {
    transactions: Transaction[]
    categories: Category[]
}

export const TransactionList = ({ transactions, categories }: TransactionListProps) => {
    const getCategory = (id: string) =>
        categories.sort((a, b) => a.sequence - b.sequence).find(c => c.id === id) || categories[categories.length - 1]

    return (
        <Center>
            <Container p={4} width='fit-content'>
                <Stack spacing={4} flex={1} width='fit-content'>
                    <Text textStyle='lg' fontWeight='medium'>
                        Transactions
                    </Text>
                    <List width='fit-content' overflowY='scroll' maxHeight='70vh' px={4}>
                        <Stack spacing={3} width='fit-content'>
                            {transactions.map((transaction, index) => (
                                <TransactionCard
                                    key={index}
                                    transaction={transaction}
                                    category={getCategory(transaction.categoryId)}
                                />
                            ))}
                        </Stack>
                    </List>
                </Stack>
            </Container>
        </Center>
    )
}
