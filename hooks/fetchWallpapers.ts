import axios from "axios";
import { BASE_ENDPOINT } from "@/constants/BaseEndpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Wallpaper {
  id: string;
  title: string;
  image_url: string;
  likes: number;
  platform: string;
  artists_id: string;
  categories_id: string;
  category_name: string;
  artist_name: string;
  created_at: string;
  updated_at: string;
}

let cachedWallpapers: Wallpaper[] | null = null;
let cachedLikedWallpapers: Wallpaper[] | null = null;
let cachedBookmarkedWallpapers: Wallpaper[] | null = null;

export async function getWallpapers(): Promise<Wallpaper[]> {
  if (cachedWallpapers) {
    return cachedWallpapers;
  }

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("Token is not available");
    return [];
  }

  try {
    const result = await axios.get<Wallpaper[]>(`${BASE_ENDPOINT}/wallpapers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    cachedWallpapers = result.data;
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.error("Error fetching wallpapers:", e.response.data);
      throw new Error(e.response.data.message || "Error fetching wallpapers");
    } else if (e instanceof Error) {
      console.error("Error fetching wallpapers:", e.message);
      throw new Error(e.message);
    } else {
      console.error("Unknown error fetching wallpapers");
      throw new Error("Unknown error fetching wallpapers");
    }
  }
}

export async function getLikedWallpapers(): Promise<Wallpaper[]> {
  if (cachedLikedWallpapers) {
    return cachedLikedWallpapers;
  }

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("Token is not available");
    return [];
  }

  try {
    const result = await axios.get<Wallpaper[]>(`${BASE_ENDPOINT}/wallpapers/liked-wallpapers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    cachedLikedWallpapers = result.data;
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.error("Error fetching liked wallpapers:", e.response.data);
      throw new Error(e.response.data.message || "Error fetching liked wallpapers");
    } else if (e instanceof Error) {
      console.error("Error fetching liked wallpapers:", e.message);
      throw new Error(e.message);
    } else {
      console.error("Unknown error fetching liked wallpapers");
      throw new Error("Unknown error fetching liked wallpapers");
    }
  }
}

export async function getBookmarkedWallpapers(): Promise<Wallpaper[]> {
  if (cachedBookmarkedWallpapers) {
    return cachedBookmarkedWallpapers;
  }

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.error("Token is not available");
    return [];
  }

  try {
    const result = await axios.get<Wallpaper[]>(`${BASE_ENDPOINT}/wallpapers/bookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    cachedBookmarkedWallpapers = result.data;
    return result.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.error("Error fetching bookmarked wallpapers:", e.response.data);
      throw new Error(e.response.data.message || "Error fetching bookmarked wallpapers");
    } else if (e instanceof Error) {
      console.error("Error fetching bookmarked wallpapers:", e.message);
      throw new Error(e.message);
    } else {
      console.error("Unknown error fetching bookmarked wallpapers");
      throw new Error("Unknown error fetching bookmarked wallpapers");
    }
  }
}