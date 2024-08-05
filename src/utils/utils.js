const isLoggedIn = () => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (storedData) {
        return true
    } else {
        return false
    }
}

export { isLoggedIn }