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
import { listTransactions, listCategories } from 'services'
import { Transaction, Category, Statistics } from '@types'

export const DashboardPage = () => {
    // Create state variables for loading, error and data
    const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>(false)
    const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [categories, setCategories] = useState<Category[]>([])

    // Fetch transactions from the API
    const fetchTransactions = async () => {
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

    // Transaction edit and delete modal
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const [transactionId, setTransactionId] = useState<string | null>(null)

    // Handlers
    const handleAddTransaction = () => {
        setTransactionId(null)
        onEditOpen()
    }

    const handleEditTransaction = (id: string) => {
        setTransactionId(id)
        onEditOpen()
    }

    const handleDeleteTransaction = (id: string) => {
        setTransactionId(id)
        onDeleteOpen()
    }

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
                    handleAddTransaction={handleAddTransaction}
                    handleEditTransaction={handleEditTransaction}
                    handleDeleteTransaction={handleDeleteTransaction}
                />
            </Stack>
            <TransactionEditModal
                isOpen={isEditOpen}
                onClose={handleCloseModals}
                transaction={transactionId ? transactions.find(t => t.id === transactionId) || null : null}
                categories={categories}
            />
            <TransactionDeleteModal isOpen={isDeleteOpen} onClose={handleCloseModals} />
        </React.Fragment>
    )
}

export default DashboardPage
