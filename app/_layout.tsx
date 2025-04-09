import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Layout() {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <AuthProvider>
                    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
                        <Stack.Screen name="index" options={{ headerShown: false, headerTitle: "Welcome" }} />
                        <Stack.Screen name="(auth)/login" options={{ headerShown: false, headerTitle: "Login", headerBackTitle: "Go Back" }} />
                        <Stack.Screen name="(nobottombar)/accountinfo" options={{ headerShown: true, headerTitle: "Account Info", headerBackTitle: "Go Back" }} />
                    </Stack>
                </AuthProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}