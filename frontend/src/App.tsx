import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from 'pages/LoginPage'
import SignupPage from 'pages/SignupPage'
import DashboardPage from 'pages/DashboardPage'

import { isLoggedIn } from 'helpers'

type ProtectedRouteProps = {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isUserLoggedIn = isLoggedIn()

    if (!isUserLoggedIn) {
        return <Navigate to='/login' />
    }

    return <React.Fragment>{children}</React.Fragment>
}

const App = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route
                path='/dashboard'
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    )
}

export default App
