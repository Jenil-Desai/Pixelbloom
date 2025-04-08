import React, { useEffect } from 'react';
import { StyleSheet, useColorScheme, Animated } from 'react-native';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';

const AccountSkeletonLoader: React.FC = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const shimmerValue = React.useRef(new Animated.Value(0)).current;

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
        outputRange: [
            colorScheme === 'light' ? '#e0e0e0' : '#3A3A3A',
            colorScheme === 'light' ? '#f0f0f0' : '#505050',
        ],
    });

    return (
        <ThemedSafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <HeaderSkeleton shimmerBackground={shimmerBackground} />
                <ThemedView style={{ flex: 1 }}>
                    <UserDetailsSkeleton shimmerBackground={shimmerBackground} theme={theme} colorScheme={colorScheme} />
                    <ThemeSelectorSkeleton shimmerBackground={shimmerBackground} />
                    <AboutSkeleton shimmerBackground={shimmerBackground} />
                </ThemedView>
            </ScrollView>
        </ThemedSafeAreaView>
    );
};

interface SkeletonProps {
    shimmerBackground: Animated.AnimatedInterpolation<string | number>;
}

interface UserDetailsSkeletonProps extends SkeletonProps {
    theme: typeof Colors.light | typeof Colors.dark;
    colorScheme: 'light' | 'dark';
}

const HeaderSkeleton: React.FC<SkeletonProps> = ({ shimmerBackground }) => {
    return (
        <ThemedView style={styles.topbar}>
            <Animated.View style={[styles.titleSkeleton, { backgroundColor: shimmerBackground }]} />
            <Animated.View style={[styles.subtitleSkeleton, { backgroundColor: shimmerBackground }]} />
        </ThemedView>
    );
};

const UserDetailsSkeleton: React.FC<UserDetailsSkeletonProps> = ({ shimmerBackground, colorScheme }) => {
    return (
        <ThemedView
            style={[
                styles.userCard,
                { backgroundColor: colorScheme === 'light' ? Colors.light.tint : Colors.dark.indicator }
            ]}
        >
            <Animated.View style={[styles.infoSkeleton, { backgroundColor: shimmerBackground }]} />
            <Animated.View style={[styles.infoSkeleton, { backgroundColor: shimmerBackground }]} />
            <Animated.View style={[styles.infoSkeleton, { backgroundColor: shimmerBackground }]} />
            <Animated.View style={[styles.logoutSkeleton, { backgroundColor: shimmerBackground }]} />
        </ThemedView>
    );
};

const ThemeSelectorSkeleton: React.FC<SkeletonProps> = ({ shimmerBackground }) => {
    return (
        <ThemedView style={styles.margin}>
            <Animated.View style={[styles.sectionTitleSkeleton, { backgroundColor: shimmerBackground }]} />
            <Animated.View style={[styles.themeLabelSkeleton, { backgroundColor: shimmerBackground }]} />
            <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Animated.View style={[styles.buttonSkeleton, { backgroundColor: shimmerBackground }]} />
                <Animated.View style={[styles.buttonSkeleton, { backgroundColor: shimmerBackground }]} />
                <Animated.View style={[styles.buttonSkeleton, { backgroundColor: shimmerBackground }]} />
            </ThemedView>
        </ThemedView>
    );
};

const AboutSkeleton: React.FC<SkeletonProps> = ({ shimmerBackground }) => {
    return (
        <ThemedView style={styles.margin}>
            <Animated.View style={[styles.sectionTitleSkeleton, { backgroundColor: shimmerBackground }]} />
            <ThemedView style={{ marginTop: 10 }}>
                <Animated.View style={[styles.linkSkeleton, { backgroundColor: shimmerBackground }]} />
                <Animated.View style={[styles.linkSkeleton, { backgroundColor: shimmerBackground }]} />
                <Animated.View style={[styles.linkSkeleton, { backgroundColor: shimmerBackground }]} />
                <Animated.View style={[styles.linkSkeleton, { backgroundColor: shimmerBackground }]} />
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    topbar: {
        padding: 20,
    },
    titleSkeleton: {
        height: 25,
        width: 150,
        borderRadius: 4,
        marginBottom: 8,
    },
    subtitleSkeleton: {
        height: 18,
        width: 220,
        borderRadius: 4,
    },
    userCard: {
        marginHorizontal: 20,
        marginTop: 10,
        padding: 20,
        borderRadius: 16,
    },
    infoSkeleton: {
        height: 16,
        borderRadius: 4,
        marginVertical: 5,
        width: '80%',
    },
    logoutSkeleton: {
        height: 42,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
    },
    margin: {
        padding: 20,
    },
    sectionTitleSkeleton: {
        height: 25,
        width: 120,
        borderRadius: 4,
        marginBottom: 8,
    },
    themeLabelSkeleton: {
        height: 18,
        width: 80,
        borderRadius: 4,
    },
    buttonSkeleton: {
        height: 40,
        width: '30%',
        borderRadius: 8,
    },
    linkSkeleton: {
        height: 18,
        borderRadius: 4,
        margin: 10,
        width: '70%',
    },
});

export default AccountSkeletonLoader;