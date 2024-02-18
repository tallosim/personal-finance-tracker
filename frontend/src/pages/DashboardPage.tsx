import React, { useState, useEffect } from 'react'
import { Stack, useDisclosure } from '@chakra-ui/react'

import {
    ErrorAlert,
    NavBar,
    StatCards,
    TransactionList,
    TransactionEditModal,
    TransactionDeleteModal,
} from 'components'
import { listTransactions, listCategories, createTransaction, updateTransaction, deleteTransaction } from 'services'
import { Transaction, Category, Statistics } from '@types'

export const DashboardPage = () => {
    // Create state variables for loading, error and data for transactions, statistics and categories
    const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>(false)
    const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [categories, setCategories] = useState<Category[]>([])

    // Fetch transactions from the API
    const fetchTransactions = async () => {
        setError(null)
        setIsTransactionLoading(true)

        const { success, data, message } = await listTransactions()

        setIsTransactionLoading(false)

        if (success) {
            setTransactions(data.transactions)
            setStatistics(data.statistics)
        } else {
            setError(message)
        }
    }

    // Fetch categories from the API
    const fetchCategories = async () => {
        setError(null)
        setIsCategoryLoading(true)

        const { success, data, message } = await listCategories()

        setIsCategoryLoading(false)

        if (success) {
            setCategories(data.categories)
        } else {
            setError(message)
        }
    }

    // Fetch data on page load
    const fetchData = async () => {
        await fetchCategories()
        await fetchTransactions()
    }
    useEffect(() => {
        fetchData()
    }, [])

    // Loading state for transaction add/edit
    const [isTransactionOperationLoading, setIsTransactionOperationLoading] = useState<boolean>(false)

    // Function to add a transaction
    const fetchAddTransaction = async (transaction: Omit<Transaction, 'id' | 'userId' | 'updatedAt'>) => {
        setError(null)
        setIsTransactionOperationLoading(true)

        const { success, message } = await createTransaction(transaction)

        setIsTransactionOperationLoading(false)

        if (success) {
            await fetchTransactions()
        } else {
            setError(message)
        }
    }

    // Function to edit a transaction
    const fetchEditTransaction = async (id: string, transaction: Omit<Transaction, 'id' | 'userId' | 'updatedAt'>) => {
        setError(null)
        setIsTransactionOperationLoading(true)

        const { success, message } = await updateTransaction(id, transaction)

        setIsTransactionOperationLoading(false)

        if (success) {
            await fetchTransactions()
        } else {
            setError(message)
        }
    }

    // Function to delete a transaction
    const fetchDeleteTransaction = async (id: string) => {
        setError(null)
        setIsTransactionOperationLoading(true)

        const { success, message } = await deleteTransaction(id)

        setIsTransactionOperationLoading(false)

        if (success) {
            await fetchTransactions()
        } else {
            setError(message)
        }
    }

    // Transaction edit and delete modal
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const [transactionId, setTransactionId] = useState<string | null>(null)

    // Handle open add transaction modal
    const handleOpenAddTransaction = () => {
        setTransactionId(null)
        onEditOpen()
    }

    // Handle open edit transaction modal
    const handleOpenEditTransaction = (id: string) => {
        setTransactionId(id)
        onEditOpen()
    }

    // Handle open delete transaction modal
    const handleOpenDeleteTransaction = (id: string) => {
        setTransactionId(id)
        onDeleteOpen()
    }

    // Handle close modals
    const handleCloseModals = () => {
        onEditClose()
        onDeleteClose()
        setTransactionId(null)
    }

    return (
        <React.Fragment>
            <Stack>
                <NavBar name='John Doe' />
                <ErrorAlert message={error} />
                <StatCards statistics={statistics} isLoading={isCategoryLoading} />
                <TransactionList
                    isLoading={isTransactionLoading}
                    transactions={transactions}
                    categories={categories}
                    handleAddTransaction={handleOpenAddTransaction}
                    handleEditTransaction={handleOpenEditTransaction}
                    handleDeleteTransaction={handleOpenDeleteTransaction}
                />
            </Stack>
            <TransactionEditModal
                isOpen={isEditOpen}
                isLoading={isTransactionOperationLoading}
                transaction={transactionId ? transactions.find(t => t.id === transactionId) || null : null}
                categories={categories}
                onClose={handleCloseModals}
                onAddSave={fetchAddTransaction}
                onEditSave={fetchEditTransaction}
            />
            <TransactionDeleteModal
                isOpen={isDeleteOpen}
                isLoading={isTransactionOperationLoading}
                onClose={handleCloseModals}
                onDelete={() => transactionId && fetchDeleteTransaction(transactionId)}
            />
        </React.Fragment>
    )
}

export default DashboardPage
