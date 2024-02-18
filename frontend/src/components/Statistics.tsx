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
            <Text textStyle='3xl' fontWeight='medium'>
                {value} DKK
            </Text>
        </Stack>
    </Card>
)

export const Statistics = () => (
    <Center>
        <Container p={4} width='fit-content'>
            <HStack spacing={4} width='fit-content'>
                <Stat title='Total Income' value={12345} />
                <Stat title='Total Expenses' value={6789} />
                <Stat title='Total Balance' value={5556} />
            </HStack>
        </Container>
    </Center>
)
