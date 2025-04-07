import React, {useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ImageBackground,
    useColorScheme,
} from "react-native";
import {useRouter} from "expo-router";
import {Colors} from "@/constants/Colors";
import {useAuth} from "@/context/AuthContext";

export default function WelcomeScreen() {
    const {isLoggedIn} = useAuth();
    const router = useRouter();
    const scheme = useColorScheme();
    const theme = Colors[scheme ?? "light"];

    useEffect(() => {
        if (isLoggedIn) {
            return router.replace("/(tabs)");
        }
    })

    return (
        <ImageBackground
            source={require("@/assets/images/pixel-welcome.png")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={[styles.title, { color: theme.tint }]}>Pixelbloom</Text>
                <Text style={[styles.subtitle, { color: theme.tabIconDefault }]}>
                    Breathe life into your screen.
                </Text>

                <Pressable
                    style={[styles.button, { backgroundColor: theme.tint }]}
                    onPress={() => router.push("/(auth)/login")}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 24,
        marginBottom: 48,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 32,
        textAlign: "center",
    },
    button: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 16,
    },
});