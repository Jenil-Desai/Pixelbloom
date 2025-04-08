import axios from "axios";
import {BASE_ENDPOINT} from "@/constants/BaseEndpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
    Id: string;
    Name: string;
    Email: string;
    CreatedAt: string;
    UpdatedAt: string;
}

let cachedUser: User | null = null;

export async function getUserDetails(forceRefresh: boolean = false): Promise<User | null> {
    if (forceRefresh) {
        cachedUser = null;
    }

    if (cachedUser) {
        return cachedUser;
    }

    const token = await AsyncStorage.getItem("token");
    if (!token) {
        console.error("Token is not available");
        return null;
    }

    try {
        const result = await axios.get<User>(`${BASE_ENDPOINT}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        cachedUser = result.data;
        return result.data;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error("Error fetching user details:", e.response.data);
            throw new Error(e.response.data.message || "Error fetching user details");
        } else if (e instanceof Error) {
            console.error("Error fetching user details:", e.message);
            throw new Error(e.message);
        } else {
            console.error("Unknown error fetching user details");
            throw new Error("Unknown error fetching user details");
        }
    }
}