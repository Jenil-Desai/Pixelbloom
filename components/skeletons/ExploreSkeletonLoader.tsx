import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View, Animated } from "react-native";

const ExploreSkeletonLoader = () => {
    const shimmerValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [shimmerValue]);

    const shimmerBackground = shimmerValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["#e0e0e0", "#f0f0f0"],
    });

    return (
        <View style={styles.container}>
            {/* Carousel Skeleton */}
            <View style={styles.carouselSkeleton}>
                <Animated.View style={[styles.carouselImage, { backgroundColor: shimmerBackground }]} />
                <Animated.View style={[styles.carouselText, { backgroundColor: shimmerBackground }]} />
            </View>

            {/* SplitView Skeleton */}
            <View style={styles.splitViewSkeleton}>
                {[...Array(6)].map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[styles.wallpaperCard, { backgroundColor: shimmerBackground }]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    carouselSkeleton: {
        height: 250,
        marginBottom: 20,
    },
    carouselImage: {
        height: 200,
        width: "100%",
        borderRadius: 10,
    },
    carouselText: {
        height: 20,
        width: "60%",
        marginTop: 10,
        borderRadius: 4,
        alignSelf: "center",
    },
    splitViewSkeleton: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    wallpaperCard: {
        height: 150,
        width: Dimensions.get("window").width / 2 - 20,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default ExploreSkeletonLoader;