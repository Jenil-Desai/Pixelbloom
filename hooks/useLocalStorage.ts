import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useLocalStorage() {
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                setIsLoggedIn(true);
            }
        };
        loadToken();
    }, []);

    const saveToken = async (newToken: string) => {
        await AsyncStorage.setItem("token", newToken);
        setToken(newToken);
        setIsLoggedIn(true);
    };

    const removeToken = async () => {
        await AsyncStorage.removeItem("token");
        setToken(null);
        setIsLoggedIn(false);
    };

    return {
        token,
        isLoggedIn,
        saveToken,
        removeToken,
    };
}