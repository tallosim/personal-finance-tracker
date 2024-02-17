import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from 'pages/LoginPage'
import SignupPage from 'pages/SignupPage'
import DashboardPage from 'pages/Dashboard/DashboardPage'

const App = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/' element={<Navigate to='/login' />} />
        </Routes>
    )
}

export default App
