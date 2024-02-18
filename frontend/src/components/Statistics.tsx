import { Card, Container, Center, HStack, Stack, Spinner, Text } from '@chakra-ui/react'

import { Statistics } from '@types'

type StatProps = {
    isLoading: boolean
    title: string
    value: number | null
}

const Stat = ({ isLoading, title, value }: StatProps) => (
    <Card bg='bg.surface' p={4} borderRadius='lg' boxShadow='sm' width={48}>
        <Stack spacing={2} alignItems='center'>
            <Text textStyle='xl' color='fg.muted'>
                {title}
            </Text>
            {isLoading || typeof value !== 'number' ? (
                <Spinner size='lg' />
            ) : (
                <Text textStyle='2xl' fontWeight='medium'>
                    {value.toFixed(2)} DKK
                </Text>
            )}
        </Stack>
    </Card>
)

type StatCardsProps = {
    isLoading: boolean
    statistics: Statistics | null
}

export const StatCards = ({ isLoading, statistics }: StatCardsProps) => (
    <Center>
        <Container p={4} width='fit-content'>
            <HStack spacing={4} width='fit-content'>
                <Stat title='Total Income' value={statistics ? statistics.totalIncome : null} isLoading={isLoading} />
                <Stat title='Total Expense' value={statistics ? statistics.totalExpense : null} isLoading={isLoading} />
                <Stat title='Total Balance' value={statistics ? statistics.balance : null} isLoading={isLoading} />
            </HStack>
        </Container>
    </Center>
)
