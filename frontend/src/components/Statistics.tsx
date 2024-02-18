import { Card, Container, Center, HStack, Stack, Text } from '@chakra-ui/react'

type StatProps = {
    title: string
    value: number
}

const Stat = ({ title, value }: StatProps) => (
    <Card bg='bg.surface' p={4} borderRadius='lg' boxShadow='sm' width={48}>
        <Stack spacing={2} alignItems='center'>
            <Text textStyle='xl' color='fg.muted'>
                {title}
            </Text>
            <Text textStyle='2xl' fontWeight='medium'>
                {value.toFixed(2)} DKK
            </Text>
        </Stack>
    </Card>
)

export const Statistics = () => (
    <Center>
        <Container p={4} width='fit-content'>
            <HStack spacing={4} width='fit-content'>
                <Stat title='Total Income' value={342.13} />
                <Stat title='Total Expenses' value={21.04} />
                <Stat title='Total Balance' value={321.09} />
            </HStack>
        </Container>
    </Center>
)
