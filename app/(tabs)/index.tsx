import { View, Alert } from "react-native";
import { getWallpapers, Wallpaper } from "@/hooks/fetchWallpapers";
import { SplitView } from "@/components/SpiltView";
import { useEffect, useState } from "react";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ExploreSkeletonLoader from "@/components/skeletons/ExploreSkeletonLoader";

export default function explore() {
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

    if (isLoading) return <ExploreSkeletonLoader />;

    return (
        <ThemedSafeAreaView style={{ flex: 1 }}>
            <View style={{ borderRadius: 20, flex: 1 }}>
                <SplitView
                    wallpapers={wallpapers}
                    onRefresh={getWallpaper}
                />
            </View>
        </ThemedSafeAreaView>
    );
}