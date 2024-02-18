import React, { useState, useEffect } from 'react'
import { Stack, useDisclosure } from '@chakra-ui/react'

import { NavBar, StatCards, TransactionList, TransactionEditModal, TransactionDeleteModal } from 'components'
import { listTransactions, listCategories } from 'services'
import { Transaction, Category, Statistics } from '@types'
export const DashboardPage = () => {
    // Create state variables for loading, error and data
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [categories, setCategories] = useState<Category[]>([])

    console.error('error', error)

    const fetchTransactions = async () => {
        const { success, data, message } = await listTransactions()

        if (success) {
            setTransactions(data.transactions)
            setStatistics(data.statistics)
        } else {
            setError(message)
        }
    }

    const fetchCategories = async () => {
        const { success, data, message } = await listCategories()

        if (success) {
            setCategories(data.categories)
        } else {
            setError(message)
        }
    }

    const fetchData = async () => {
        setIsLoading(true)

        await fetchCategories()
        await fetchTransactions()

        setIsLoading(false)
    }

    // Fetch transactions and categories
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
                <StatCards statistics={statistics} isLoading={isLoading} />
                <TransactionList
                    isLoading={isLoading}
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
