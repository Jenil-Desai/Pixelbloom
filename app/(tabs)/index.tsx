import {  Dimensions, Text, View, Image, Alert } from "react-native";
import { getWallpapers, Wallpaper } from "@/hooks/fetchWallpapers";
import { SplitView } from "@/components/SpiltView";
import Carousel from "react-native-reanimated-carousel";
import { useEffect, useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ExploreSkeletonLoader from "@/components/skeletons/ExploreSkeletonLoader";

const TOPBAR_HEIGHT = 250;

export default function explore() {
    const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const carouselItems = useCarousel();
    const width = Dimensions.get("window").width;
    const [yOffset, setScrollY] = useState(0);

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

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(yOffset, [-TOPBAR_HEIGHT, 0, TOPBAR_HEIGHT], [1.5, 1, 1]),
                },
            ],
        };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(yOffset, [-TOPBAR_HEIGHT, TOPBAR_HEIGHT / 2, TOPBAR_HEIGHT], [1, 1, 0]),
        };
    });

    if (isLoading) return <ExploreSkeletonLoader />;

    return (
        <ThemedSafeAreaView style={{ flex: 1 }}>
            <Animated.View style={[{ height: Math.max(0, TOPBAR_HEIGHT - yOffset) }, headerAnimatedStyle]}>
                <Carousel
                    width={width}
                    data={carouselItems}
                    onSnapToItem={(index) => console.log("current index:", index)}
                    renderItem={({ index }) => (
                        <>
                            <View
                                style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    justifyContent: "center",
                                }}
                            >
                                <Image source={{ uri: carouselItems[index].image }} style={{ height: TOPBAR_HEIGHT }} />
                            </View>

                            <LinearGradient colors={["transparent", "black"]} style={{ flex: 1, position: "absolute", zIndex: 10, height: TOPBAR_HEIGHT / 2, width: "100%", bottom: 0 }}>
                                <Animated.View style={textAnimatedStyle}>
                                    <Text style={[{ color: "white", paddingTop: TOPBAR_HEIGHT / 3, textAlign: "center", fontSize: 30, fontWeight: "600" }]}>{carouselItems[index].title}</Text>
                                </Animated.View>
                            </LinearGradient>
                        </>
                    )}
                />
            </Animated.View>
            <View style={{ borderRadius: 20 }}>
                <SplitView
                    onScroll={(yOffset) => {
                        setScrollY(yOffset);
                    }}
                    wallpapers={wallpapers}
                    onRefresh={getWallpaper}
                />
            </View>
        </ThemedSafeAreaView>
    );
}