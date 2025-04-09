import React from "react";
import { getLikedWallpapers, Wallpaper } from "@/hooks/fetchWallpapers";
import { ThemedView } from "./ThemedView";
import {View, StyleSheet, FlatList, RefreshControl} from "react-native";
import ImageCard from "./ImageCard";
import { useState, useEffect } from "react";
import { likeWallpaper, unlikeWallpaper } from "@/functions/likeWallpaper";
import {useAtom} from "jotai";
import {selectedWallpaperAtom} from "@/store/store";

export function SplitView({ wallpapers, onScroll, onRefresh }: { wallpapers: Wallpaper[]; onScroll?: (yOffset: number) => void, onRefresh: () => void }) {
    const [_,setSelectedWallpaper] = useAtom(selectedWallpaperAtom);
    const [likedWallpapers, setLikedWallpapers] = useState<{ [key: string]: boolean }>({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchLikedWallpapers = async () => {
            try {
                const likedWallpapersList = await getLikedWallpapers();
                const likedWallpapersMap = likedWallpapersList.reduce((acc, wallpaper) => {
                    acc[wallpaper.id] = true;
                    return acc;
                }, {} as { [key: string]: boolean });
                setLikedWallpapers(likedWallpapersMap);
            } catch (error) {
                console.error("Error fetching liked wallpapers:", error);
            }
        };

        fetchLikedWallpapers();
    }, []);

    const handleLikeToggle = async (wallpaper: Wallpaper) => {
        const isLiked = likedWallpapers[wallpaper.id];
        try {
            if (isLiked) {
                await unlikeWallpaper(wallpaper.id);
            } else {
                await likeWallpaper(wallpaper.id);
            }
            setLikedWallpapers((prev) => ({ ...prev, [wallpaper.id]: !isLiked }));
        } catch (error) {
            console.error("Error toggling like status:", error);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh();
        setRefreshing(false);
    };

    return (
        <>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                onScroll={(e) => {
                    let yOffset = e.nativeEvent.contentOffset.y / 1;
                    onScroll?.(yOffset);
                }}
                data={wallpapers.filter((_, index) => index % 2 === 0).map((_, index) => [wallpapers[index * 2], wallpapers[index * 2 + 1]])}
                renderItem={({ item: [first, second] }) => (
                    <ThemedView style={styles.container}>
                        <ThemedView style={styles.innerContainer}>
                            <View style={styles.imageContainer}>
                                <ImageCard
                                    onPress={() => {
                                        setSelectedWallpaper(first);
                                    }}
                                    wallpaper={first}
                                    onLikeToggle={() => handleLikeToggle(first)}
                                    isLiked={!!likedWallpapers[first.id]}
                                />
                            </View>
                        </ThemedView>
                        <ThemedView style={styles.innerContainer}>
                            {second && (
                                <View style={styles.imageContainer}>
                                    <ImageCard
                                        wallpaper={second}
                                        onPress={() => {
                                            setSelectedWallpaper(second);
                                        }}
                                        onLikeToggle={() => handleLikeToggle(second)}
                                        isLiked={!!likedWallpapers[second.id]}
                                    />
                                </View>
                            )}
                        </ThemedView>
                    </ThemedView>
                )}
                keyExtractor={(item) => item[0].id}
            />
            {/*{selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}*/}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        padding: 10,
    },
    imageContainer: {
        paddingVertical: 0,
    },
});