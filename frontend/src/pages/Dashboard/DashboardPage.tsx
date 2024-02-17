import { Center } from '@chakra-ui/react'

import { TransactionList } from './Transactions'
import { Transaction, Category } from '@types'

const transactions: Transaction[] = [
    {
        id: '44b34c63-bf22-4aa9-981f-f61178fcde7f',
        amount: 167.1,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Grocery',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '41a004a0-2173-4d7c-83b0-e96fbc0c517e',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: '91675c68-c6c0-420a-a22e-8efb7fada617',
        amount: 375.23,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Grocery',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '41a004a0-2173-4d7c-83b0-e96fbc0c517e',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'c5bb58ee-87db-4577-8d11-7a0b1d758475',
        amount: 123.1,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Lidl',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '41a004a0-2173-4d7c-83b0-e96fbc0c517e',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'a8f88f29-ee09-4049-97d1-81e8968ee405',
        amount: 3245,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Spain',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '15aef98a-d5de-498e-acf6-f74a35e3f987',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'd06dc4f3-097d-4a5a-8f11-f168d907a45b',
        amount: 23000,
        type: 'income',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Salary',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '15aef98a-d5de-498e-acf6-f74a35e3f987',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: '37fc3928-435c-4b87-9b4a-ce69f58ff209',
        amount: 6395,
        type: 'income',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'SU',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '15aef98a-d5de-498e-acf6-f74a35e3f987',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'a4b34c63-bf22-4aa9-981f-f61178fcde7f',
        amount: 167.1,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Grocery',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '41a004a0-2173-4d7c-83b0-e96fbc0c517e',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'a1675c68-c6c0-420a-a22e-8efb7fada617',
        amount: 375.23,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Grocery',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '41a004a0-2173-4d7c-83b0-e96fbc0c517e',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'a5bb58ee-87db-4577-8d11-7a0b1d758475',
        amount: 123.1,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Lidl',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '41a004a0-2173-4d7c-83b0-e96fbc0c517e',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'b8f88f29-ee09-4049-97d1-81e8968ee405',
        amount: 3245,
        type: 'expense',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Spain',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '15aef98a-d5de-498e-acf6-f74a35e3f987',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'a06dc4f3-097d-4a5a-8f11-f168d907a45b',
        amount: 23000,
        type: 'income',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'Salary',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '15aef98a-d5de-498e-acf6-f74a35e3f987',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
    {
        id: 'a7fc3928-435c-4b87-9b4a-ce69f58ff209',
        amount: 6395,
        type: 'income',
        occurredAt: new Date('2023-09-08T00:00:00.000Z'),
        description: 'SU',
        userId: '294939b6-c6ec-4a22-952e-ee9bad0f34c8',
        categoryId: '15aef98a-d5de-498e-acf6-f74a35e3f987',
        updatedAt: new Date('2024-02-17T20:37:41.580Z'),
    },
]

const categories: Category[] = [
    {
        id: '41a004a0-2173-4d7c-83b0-e96fbc0c517e',
        title: 'Home',
        sequence: 1,
    },
    {
        id: '8b1f6d21-2ccd-4019-93fb-fa8c91bcdf31',
        title: 'Loan',
        sequence: 2,
    },
    {
        id: '0d74b11f-f1d9-4616-8144-2968824569df',
        title: 'Groceries',
        sequence: 3,
    },
    {
        id: '6d0ce244-02f4-4231-99ce-b49e3d0f580f',
        title: 'Charity',
        sequence: 4,
    },
    {
        id: '72c97c2e-a531-4ffa-b8a2-e2d2ec939430',
        title: 'Personal Care',
        sequence: 5,
    },
    {
        id: '15aef98a-d5de-498e-acf6-f74a35e3f987',
        title: 'Vacation',
        sequence: 6,
    },
    {
        id: 'fb854cf9-f8e2-432b-896d-1cb3cecb4de4',
        title: 'Food and Drinks',
        sequence: 7,
    },
    {
        id: '9ba91962-6090-41b4-9f86-d7eb7409dbcc',
        title: 'Transportation',
        sequence: 8,
    },
    {
        id: '925e9ee8-2e8b-4c53-a886-24fd49309d2d',
        title: 'Entertainment',
        sequence: 9,
    },
    {
        id: '3dd023f7-fdad-4ae6-a936-94a9a5a91f91',
        title: 'Shopping',
        sequence: 10,
    },
    {
        id: '6d6e6ac1-7153-48e3-a408-e3db910a03e1',
        title: 'Insurance',
        sequence: 11,
    },
    {
        id: '2ff39f8a-4eac-4109-876a-8a0e65361ea3',
        title: 'Investment',
        sequence: 12,
    },
    {
        id: '312a090e-2dca-4dc3-a70e-2c25f0cd6f9d',
        title: 'Kids',
        sequence: 13,
    },
    {
        id: 'd11fbaa0-b3e3-4005-9a50-7afc822c493a',
        title: 'Pets',
        sequence: 14,
    },
    {
        id: '621cf23f-7551-402a-9ab3-28a4dff1b9cd',
        title: 'Miscellaneous',
        sequence: 15,
    },
    {
        id: '574ea6de-2f5c-4975-b993-cf03538ab8cd',
        title: 'Not Categorized',
        sequence: 16,
    },
]

export const DashboardPage = () => {
    return (
        <Center mx='auto' py={{ base: '4', md: '8' }}>
            <TransactionList transactions={transactions} categories={categories} />
        </Center>
    )
}

export default DashboardPage
