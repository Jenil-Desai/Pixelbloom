import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            }
        };
        loadToken();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
            await AsyncStorage.removeItem('token');
            setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};