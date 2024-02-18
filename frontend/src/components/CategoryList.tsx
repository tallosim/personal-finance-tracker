import { Box, Center, Stack, HStack, Text, List, Spinner, Heading } from '@chakra-ui/react'
import { Transaction, Category } from '@types'

import { TransactionCard } from 'components'

type CategoryListProps = {
    isLoading: boolean
    categories: (Category & { transactions: (Transaction & { category: Category })[]; total: number })[]
    handleEditTransaction: (transactionId: string) => void
    handleDeleteTransaction: (transactionId: string) => void
}

export const CategoryList = ({
    isLoading,
    categories,
    handleEditTransaction,
    handleDeleteTransaction,
}: CategoryListProps) => {
    return (
        <Center>
            <List width='fit-content' overflowY='scroll' maxHeight='65vh' p={4}>
                <Stack spacing={5} width='fit-content'>
                    {isLoading ? (
                        <Box width='lg' textAlign='center'>
                            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
                        </Box>
                    ) : categories.length > 0 ? (
                        categories.map((category, index) => (
                            <Stack key={index} spacing={3}>
                                <Box borderBottomWidth='1px' borderBottomColor='fg.muted' width='xl'>
                                    <HStack
                                        spacing={4}
                                        display='flex'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Heading size='xs' fontWeight='semibold' color='fg.default'>
                                            {category.title}
                                        </Heading>
                                        <Text textStyle='lg' fontWeight='medium' color='fg.muted'>
                                            {category.total !== 0 ? '-' : ''} {category.total.toFixed(2)} DKK
                                        </Text>
                                    </HStack>
                                </Box>
                                {category.transactions.length > 0 ? (
                                    category.transactions.map((transaction, i) => (
                                        <TransactionCard
                                            key={i}
                                            showCategory={false}
                                            transaction={transaction}
                                            category={transaction.category}
                                            handleEditTransaction={handleEditTransaction}
                                            handleDeleteTransaction={handleDeleteTransaction}
                                        />
                                    ))
                                ) : (
                                    <Box textAlign='center'>
                                        <Text textStyle='md' fontWeight='medium' color='fg.muted'>
                                            No transactions yet
                                        </Text>
                                    </Box>
                                )}
                            </Stack>
                        ))
                    ) : (
                        <Box width='lg' textAlign='center'>
                            <Text textStyle='lg' fontWeight='medium' color='fg.muted'>
                                No categories yet
                            </Text>
                        </Box>
                    )}
                </Stack>
            </List>
        </Center>
    )
}
