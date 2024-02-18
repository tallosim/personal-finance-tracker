import {
    Badge,
    Card,
    HStack,
    Stack,
    Text,
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
    showCategory?: boolean
    transaction: Transaction
    category: Category
    handleEditTransaction: (transactionId: string) => void
    handleDeleteTransaction: (transactionId: string) => void
}

export const TransactionCard = ({
    showCategory = true,
    transaction,
    category,
    handleEditTransaction,
    handleDeleteTransaction,
}: TransactionCardProps) => (
    <ListItem key={transaction.id} value={transaction.id} position='relative' width='fit-content'>
        <Card bg='bg.surface' p={4} width='xl' borderRadius='lg' boxShadow='sm'>
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
                        {showCategory && (
                            <Badge colorScheme='blue' variant='subtle' size='xs'>
                                {category.title}
                            </Badge>
                        )}
                    </HStack>
                    <Text textStyle='sm' color='fg.muted'>
                        {new Date(transaction.occurredAt).toLocaleDateString()}
                    </Text>
                </Stack>
                <Text textStyle='2xl' fontWeight='medium' flexGrow={1} textAlign='right'>
                    {transaction.amount !== 0 ? (transaction.type === 'income' ? '+' : '-') : ''}{' '}
                    {transaction.amount.toFixed(2)} DKK
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
