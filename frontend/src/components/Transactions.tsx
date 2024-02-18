import { useState } from 'react'
import { Button, Container, Center, HStack, Stack } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa6'

import { Transaction, Category } from '@types'
import { TransactionList, CategoryList, ToggleButtonGroup } from 'components'

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
    const [viewMode, setViewMode] = useState<'transactions' | 'categories'>('transactions')

    const transactionsWithCategory = transactions
        .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
        .map(t => ({ ...t, category: categories.find(c => c.id === t.categoryId) || categories[0] }))

    const categoriesWithTransactions = categories
		.filter(c => c.title.toLocaleLowerCase() !== 'income')
        .map(c => ({
            ...c,
            transactions: transactionsWithCategory.filter(t => t.categoryId === c.id).filter(t => t.type === 'expense'),
        }))
        .map(c => ({
            ...c,
            total: c.transactions.reduce((acc, t) => acc + t.amount, 0),
        }))

    return (
        <Center>
            <Container p={4} width='fit-content'>
                <Stack spacing={4} flex={1} width='fit-content'>
                    <HStack display='flex' justifyContent='space-between' width='full' alignItems='center'>
                        <ToggleButtonGroup colorScheme='blue' size='sm' isAttached>
                            <Button
                                _active={{ bg: 'blue.500', color: 'white' }}
                                variant={viewMode === 'transactions' ? 'solid' : 'outline'}
                                onClick={() => setViewMode('transactions')}
                            >
                                All transactions
                            </Button>
                            <Button
                                _active={{ bg: 'blue.500', color: 'white' }}
                                variant={viewMode === 'categories' ? 'solid' : 'outline'}
                                onClick={() => setViewMode('categories')}
                            >
                                Expenses by categories
                            </Button>
                        </ToggleButtonGroup>
                        <Button
                            leftIcon={<FaPlus />}
                            colorScheme='blue'
                            variant='solid'
                            size='sm'
                            onClick={handleAddTransaction}
                        >
                            Add Transaction
                        </Button>
                    </HStack>
                    {viewMode === 'transactions' && (
                        <TransactionList
                            isLoading={isLoading}
                            transactions={transactionsWithCategory}
                            handleEditTransaction={handleEditTransaction}
                            handleDeleteTransaction={handleDeleteTransaction}
                        />
                    )}
                    {viewMode === 'categories' && (
                        <CategoryList
                            isLoading={isLoading}
                            categories={categoriesWithTransactions}
                            handleEditTransaction={handleEditTransaction}
                            handleDeleteTransaction={handleDeleteTransaction}
                        />
                    )}
                </Stack>
            </Container>
        </Center>
    )
}
