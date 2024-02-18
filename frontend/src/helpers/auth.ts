export const isLoggedIn = () => {
    // Get the userData from the local storage
    const userData = localStorage.getItem('userData')

    // If there is no userData, the user is not logged in
    if (!userData) {
        return false
    }

    try {
        // Parse the userData
        const userDataObject = JSON.parse(userData)

        // If the expiration date is in the past, the user is not logged in and remove the expiration date from the local storage
        if (new Date(userDataObject.expirationDate) <= new Date()) {
            localStorage.removeItem('userData')
            return false
        }

        return true
    } catch {
        return false
    }
}

export const logout = () => {
    // Remove the userData from the local storage
    localStorage.removeItem('userData')

    // Navigate to the login page
    window.location.href = '/login'
}

export const getUserId = () => {
    // Get the userData from the local storage
    const userData = localStorage.getItem('userData')

    // If there is no userData, return null
    if (!userData) {
        return null
    }

    try {
        // Parse the userData
        const userDataObject = JSON.parse(userData)

        // Return the user id
        return userDataObject.userId as string
    } catch {
        return null
    }
}
