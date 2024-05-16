// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Install this library if you haven't


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState('');

    useEffect(() => {
        // Load token from cookie on app startup
        const savedToken = Cookies.get('authToken');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const isAuthenticated = () => {
        return token !== '';
    };

    useEffect(() => {
        // Save token to cookie when it changes
        if (token) {
            Cookies.set('authToken', token, { expires: 7 }); // Store the token for 7 days
        } else {
            Cookies.remove('authToken');
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}