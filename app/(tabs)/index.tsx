import { View, Alert } from "react-native";
import { getWallpapers, Wallpaper } from "@/hooks/fetchWallpapers";
import { SplitView } from "@/components/SpiltView";
import { useEffect, useState } from "react";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import SplitViewSkeletonLoader from "@/components/skeletons/SpiltViewSkeletonLoader";
import {useAtom} from "jotai";
import { selectedWallpaperAtom} from "@/store/store";
import {DownloadPicture} from "@/components/BottomSheet";

export default function explore() {
    const [selectedWallpaper,setSelectedWallpaper] = useAtom(selectedWallpaperAtom);

    const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/")
        }
        setIsLoading(true);
        getWallpaper();
    }, [isLoggedIn]);

    async function getWallpaper() {
        try {
            const wp = await getWallpapers(true);
            setWallpapers(wp);
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return (
        <ThemedSafeAreaView style={{flex: 1}}>
            <SplitViewSkeletonLoader />
        </ThemedSafeAreaView>
    );

    return (
        <ThemedSafeAreaView style={{ flex: 1 }}>
            <View style={{ borderRadius: 20, flex: 1 }}>
                <SplitView
                    wallpapers={wallpapers}
                    onRefresh={getWallpaper}
                />
            </View>
            {selectedWallpaper  && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} snapPoint={"85%"}/>}
        </ThemedSafeAreaView>
    );
}