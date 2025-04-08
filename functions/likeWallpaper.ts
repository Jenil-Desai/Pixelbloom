import axios from "axios";
import { BASE_ENDPOINT } from "@/constants/BaseEndpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function likeWallpaper(wallpaperId: string): Promise<void> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
        console.error("Token is not available");
        return;
    }

    try {
        await axios.post(`${BASE_ENDPOINT}/wallpapers/${wallpaperId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error("Error liking wallpaper:", e.response.data);
            throw new Error(e.response.data.message || "Error liking wallpaper");
        } else if (e instanceof Error) {
            console.error("Error liking wallpaper:", e.message);
            throw new Error(e.message);
        } else {
            console.error("Unknown error liking wallpaper");
            throw new Error("Unknown error liking wallpaper");
        }
    }
}

export async function unlikeWallpaper(wallpaperId: string): Promise<void> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
        console.error("Token is not available");
        return;
    }

    try {
        await axios.delete(`${BASE_ENDPOINT}/wallpapers/${wallpaperId}/like`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error("Error unliking wallpaper:", e.response.data);
            throw new Error(e.response.data.message || "Error unliking wallpaper");
        } else if (e instanceof Error) {
            console.error("Error unliking wallpaper:", e.message);
            throw new Error(e.message);
        } else {
            console.error("Unknown error unliking wallpaper");
            throw new Error("Unknown error unliking wallpaper");
        }
    }
}