import { Button, Container, Center, HStack, Stack, Text } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa6'

import { Transaction, Category } from '@types'
import { TransactionList } from 'components'

type TransactionsProps = {
    isLoading: boolean
    transactions: Transaction[]
    categories: Category[]
    handleAddTransaction: () => void
    handleEditTransaction: (transactionId: string) => void
    handleDeleteTransaction: (transactionId: string) => void
}

export const Transactions = ({
    isLoading,
    transactions,
    categories,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
}: TransactionsProps) => {
    const transactionsWithCategory = transactions
        .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
        .map(t => ({ ...t, category: categories.find(c => c.id === t.categoryId) || categories[0] }))

    return (
        <Center>
            <Container p={4} width='fit-content'>
                <Stack spacing={4} flex={1} width='fit-content'>
                    <HStack display='flex' justifyContent='space-between' width='full' alignItems='center'>
                        <Text textStyle='2xl' fontWeight='semibold'>
                            Transactions
                        </Text>
                        <Button
                            leftIcon={<FaPlus />}
                            colorScheme='blue'
                            variant='solid'
                            size='xs'
                            onClick={handleAddTransaction}
                        >
                            Add Transaction
                        </Button>
                    </HStack>
                    <TransactionList
                        isLoading={isLoading}
                        transactions={transactionsWithCategory}
                        handleEditTransaction={handleEditTransaction}
                        handleDeleteTransaction={handleDeleteTransaction}
                    />
                </Stack>
            </Container>
        </Center>
    )
}
