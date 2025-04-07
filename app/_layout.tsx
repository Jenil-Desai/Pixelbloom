import {Stack} from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {AuthProvider} from "@/context/AuthContext";

export default function Layout() {
    return (
        <GestureHandlerRootView>
            <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
                <Stack.Screen name="index" options={{ headerShown: false, headerTitle: "Welcome" }} />
                <Stack.Screen name="(auth)/login" options={{ headerShown: false, headerTitle: "Login", headerBackTitle: "Go Back" }} />
                <Stack.Screen name="(nobottombar)/accountinfo" options={{ headerShown: true, headerTitle: "Account Info", headerBackTitle: "Go Back" }} />
            </Stack>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}