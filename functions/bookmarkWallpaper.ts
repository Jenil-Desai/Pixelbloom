import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_ENDPOINT} from "@/constants/BaseEndpoint";

export async function bookmarkWallpaper(wallpaperId: string): Promise<void> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
        console.error("Token is not available");
        return;
    }

    try {
        await axios.post(`${BASE_ENDPOINT}/wallpapers/${wallpaperId}/bookmark`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.error("Error bookmarking wallpaper:", e.response.data);
            throw new Error(e.response.data.message || "Error bookmarking wallpaper");
        } else if (e instanceof Error) {
            console.error("Error bookmarking wallpaper:", e.message);
            throw new Error(e.message);
        } else {
            console.error("Unknown error bookmarking wallpaper");
            throw new Error("Unknown error bookmarking wallpaper");
        }
    }
}