import {
    Box,
    Badge,
    Button,
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
import {
    FaHandHoldingDollar,
    FaMoneyBill1,
    FaEllipsisVertical,
    FaPenToSquare,
    FaTrashCan,
    FaPlus,
} from 'react-icons/fa6'

type TransactionCardProps = {
    transaction: Transaction
    category: Category
    handleEditTransaction: (transactionId: string) => void
    handleDeleteTransaction: (transactionId: string) => void
}

export const TransactionCard = ({
    transaction,
    category,
    handleEditTransaction,
    handleDeleteTransaction,
}: TransactionCardProps) => (
    <ListItem key={transaction.id} value={transaction.id} position='relative' width='fit-content'>
        <Card bg='bg.surface' p={4} width='lg' borderRadius='lg' boxShadow='sm'>
            <HStack spacing={4} display='flex' alignItems='center'>
                <Square size={12} bg={transaction.type === 'income' ? 'green.400' : 'red.400'} borderRadius='md'>
                    <Icon
                        as={transaction.type === 'income' ? FaHandHoldingDollar : FaMoneyBill1}
                        boxSize='6'
                        color='fg.accent.default'
                    />
                </Square>
                <Stack spacing={1}>
                    <HStack spacing={2}>
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
                        <MenuItem icon={<FaPenToSquare />} onClick={() => handleEditTransaction(transaction.id)}>
                            Edit Transaction
                        </MenuItem>
                        <MenuItem icon={<FaTrashCan />} onClick={() => handleDeleteTransaction(transaction.id)}>
                            Delete Transaction
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Card>
    </ListItem>
)

type TransactionListProps = {
    transactions: Transaction[]
    categories: Category[]
    handleAddTransaction: () => void
    handleEditTransaction: (transactionId: string) => void
    handleDeleteTransaction: (transactionId: string) => void
}

export const TransactionList = ({
    transactions,
    categories,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
}: TransactionListProps) => {
    const getCategory = (id: string) =>
        categories.sort((a, b) => a.sequence - b.sequence).find(c => c.id === id) || categories[categories.length - 1]

    return (
        <Center>
            <Container p={4} width='fit-content'>
                <Stack spacing={4} flex={1} width='fit-content'>
                    <HStack display='flex' justifyContent='space-between' width='full' alignItems='center'>
                        <Text textStyle='2xl' fontWeight='semibold'>
                            Transactions
                        </Text>
                        <Button leftIcon={<FaPlus />} colorScheme='blue' variant='solid' size='xs' onClick={handleAddTransaction}>
                            Add Transaction
                        </Button>
                    </HStack>
                    <List width='fit-content' overflowY='scroll' maxHeight='65vh' px={4}>
                        <Stack spacing={3} width='fit-content'>
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <TransactionCard
                                        key={index}
                                        transaction={transaction}
                                        category={getCategory(transaction.categoryId)}
                                        handleEditTransaction={handleEditTransaction}
                                        handleDeleteTransaction={handleDeleteTransaction}
                                    />
                                ))
                            ) : (
                                <Box width='lg' textAlign='center'>
                                    <Text textStyle='lg' fontWeight='medium' color='fg.muted'>
                                        No transactions yet
                                    </Text>
                                </Box>
                            )}
                        </Stack>
                    </List>
                </Stack>
            </Container>
        </Center>
    )
}
