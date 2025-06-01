import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);// Cambia esto según tu lógica de autenticación
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) setToken(storedToken)

        setLoading(false)
    }, [])

    const login = (newToken) => {
        setToken(newToken)
        localStorage.setItem('token', newToken)
    };
    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
    };

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);