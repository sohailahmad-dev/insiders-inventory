// useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);



    return isLoggedIn;

}
