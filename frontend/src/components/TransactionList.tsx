import { Box, Stack, Text, List, Spinner } from '@chakra-ui/react'
import { Transaction, Category } from '@types'

import { TransactionCard } from 'components'

type TransactionListProps = {
    isLoading: boolean
    transactions: (Transaction & { category: Category })[]
    handleEditTransaction: (transactionId: string) => void
    handleDeleteTransaction: (transactionId: string) => void
}

export const TransactionList = ({
    isLoading,
    transactions,
    handleEditTransaction,
    handleDeleteTransaction,
}: TransactionListProps) => {
    return (
        <List width='fit-content' overflowY='scroll' maxHeight='65vh' p={4}>
            <Stack spacing={3} width='fit-content'>
                {isLoading ? (
                    <Box width='lg' textAlign='center'>
                        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
                    </Box>
                ) : transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <TransactionCard
                            key={index}
                            transaction={transaction}
                            category={transaction.category}
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
    )
}
