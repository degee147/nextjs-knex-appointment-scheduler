"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const AuthContext = createContext<{
    authToken: string;
    loggedInId: string;
    isLoggedIn: boolean;
    login: (token: string, user_id: string) => void;
    logout: () => void;
} | null>(null);

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInId, setLoggedInId] = useState("");
    const [authToken, setAuthToken] = useState("");


    useEffect(() => {
        // Check the token in localStorage when the component mounts
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token: string, user_id: string) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user_id', user_id);
        setIsLoggedIn(true);
        setLoggedInId(user_id);
        setAuthToken(user_id);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
        setLoggedInId("");
        setAuthToken("");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loggedInId, authToken }}>
            {children}
        </AuthContext.Provider>
    );
};
