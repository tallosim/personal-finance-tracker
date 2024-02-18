import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Stack,
    HStack,
    Radio,
    RadioGroup,
    Select,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react'

import { Transaction, Category } from '@types'

type TransactionModalProps = {
    transaction: Transaction | null
    categories: Category[]
    isOpen: boolean
    onClose: () => void
}

export const TransactionEditModal = ({ transaction, categories, isOpen, onClose }: TransactionModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{transaction ? 'Edit transaction' : 'Add transaction'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Transaction type</FormLabel>
                            <RadioGroup defaultValue='expense'>
                                <HStack spacing='24px'>
                                    <Radio value='expense'>Expense</Radio>
                                    <Radio value='income'>Income</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder='Description' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Amount (DKK)</FormLabel>
                            <NumberInput min={0} precision={2} defaultValue={0}>
                                <NumberInputField />
                            </NumberInput>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Category</FormLabel>
                            <Select placeholder='Select category'>
                                {categories
                                    .sort((a, b) => a.sequence - b.sequence)
                                    .map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Transaction date</FormLabel>
                            <Input type='datetime-local' />
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

type TransactionDeleteModalProps = {
    isOpen: boolean
    onClose: () => void
}

export const TransactionDeleteModal = ({ isOpen, onClose }: TransactionDeleteModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Are you sure you want to delete this transaction?</ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3}>
                        Delete
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
