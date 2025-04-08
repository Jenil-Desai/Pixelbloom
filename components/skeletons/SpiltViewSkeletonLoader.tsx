import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View, Animated } from "react-native";

const SplitViewSkeletonLoader = () => {
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
        <View style={styles.splitViewSkeleton}>
            {[...Array(6)].map((_, index) => (
                <Animated.View
                    key={index}
                    style={[styles.wallpaperCard, { backgroundColor: shimmerBackground }]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    splitViewSkeleton: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    wallpaperCard: {
        height: 150,
        width: Dimensions.get("window").width / 2 - 20,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default SplitViewSkeletonLoader;