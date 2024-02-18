export const isLoggedIn = () => {
    // Get the expiration date of the token from the local storage
    const expirationDate = localStorage.getItem('expirationDate')

    // If there is no expiration date, the user is not logged in
    if (!expirationDate) {
        return false
    }

    // If the expiration date is in the past, the user is not logged in and remove the expiration date from the local storage
    if (new Date(expirationDate) <= new Date()) {
        localStorage.removeItem('expirationDate')
        return false
    }

    return true
}

export const logout = () => {
    // Remove the expiration date from the local storage
    localStorage.removeItem('expirationDate')
}
