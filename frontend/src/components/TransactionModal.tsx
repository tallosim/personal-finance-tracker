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
import { useFormik } from 'formik'

import { Transaction, Category } from '@types'

type TransactionModalProps = {
    transaction: Transaction | null
    categories: Category[]
    isOpen: boolean
    onClose: () => void
}

export const TransactionEditModal = ({ transaction, categories, isOpen, onClose }: TransactionModalProps) => {
    const isEdit = transaction && isOpen
    const initialValues = {
        type: isEdit ? transaction.type : 'expense',
        description: isEdit ? transaction.description : '',
        amount: isEdit ? transaction.amount.toString() : '0.00',
        categoryId: isEdit ? transaction.categoryId : '',
        occurredAt: isEdit ? transaction.occurredAt.toISOString().slice(0, 16) : '',
    }

    const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: values => {
            const newTransaction: Omit<Transaction, 'id' | 'userId' | 'updatedAt'> = {
                type: values.type,
                description: values.description,
                amount: parseFloat(values.amount),
                categoryId: values.categoryId,
                occurredAt: new Date(values.occurredAt),
            }
            console.log(newTransaction)
            // TODO: Implement the logic to save the transaction

            onClose()
        },
    })

    const handleNumberInputChange = (valueAsString: string, field: string) => {
        const floatRegex = /^\+?\d*\.?\d{0,2}$/
        if (floatRegex.test(valueAsString)) {
            setFieldValue(field, valueAsString)
        }
    }

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
                            <RadioGroup
                                id='type'
                                name='type'
                                defaultValue='expense'
                                value={values.type}
                                onChange={value => setFieldValue('type', value)}
                            >
                                <HStack spacing='24px'>
                                    <Radio value='expense'>Expense</Radio>
                                    <Radio value='income'>Income</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input
                                id='description'
                                name='description'
                                placeholder='Description'
                                value={values.description}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Amount (DKK)</FormLabel>
                            <NumberInput
                                id='amount'
                                name='amount'
                                min={0}
                                precision={2}
                                value={values.amount}
                                onChange={valueAsString => handleNumberInputChange(valueAsString, 'amount')}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Category</FormLabel>
                            <Select
                                id='categoryId'
                                name='categoryId'
                                placeholder='Select category'
                                value={values.categoryId}
                                onChange={handleChange}
                            >
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
                            <Input
                                id='occurredAt'
                                name='occurredAt'
                                type='datetime-local'
                                value={values.occurredAt}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleSubmit()}>
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
