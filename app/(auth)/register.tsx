import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ImageBackground,
    useColorScheme,
} from "react-native";
import {Colors} from "@/constants/Colors";
import axios from "axios";
import {BASE_ENDPOINT} from "@/constants/BaseEndpoint";
import {useRouter} from "expo-router";
import {useAuth} from "@/context/AuthContext";

type RegisterResponse = {
    message?: string
    error?: string
}

export default function LoginScreen() {
    const {isLoggedIn} = useAuth();
    const colorScheme = useColorScheme();
    const router = useRouter();
    const theme = Colors[colorScheme ?? "light"];
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            return router.replace("/(tabs)");
        }
    })

    async function handleLogin() {
        setIsLoading(true);
        if (email.length <= 0) {
            alert("Please enter a valid email");
            setIsLoading(false);
            return;
        }

        if (password.length <= 0) {
            alert("Please enter a password");
            setIsLoading(false);
            return;
        }

        try {
            const result = await axios.post<RegisterResponse>(BASE_ENDPOINT + "/auth/signup",{
                name: name,
                email: email,
                password: password,
            });
            const response = result.data;

            if (response.message) {
                router.replace("/(auth)/login");
                setIsLoading(false);
                return;
            }

            if (response.error) {
                alert(response.error);
                setIsLoading(false);
                return;
            }
        } catch (e) {
            alert(e);
            setIsLoading(false);
            return;
        }

    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ImageBackground
                source={require("@/assets/images/pixel-flowers.png")} // <- Replace with your pixel art image path
                style={styles.header}
                resizeMode="cover"
            >
                <Text style={styles.logo}>Pixelbloom</Text>
            </ImageBackground>

            <View style={[styles.formWrapper, { backgroundColor: theme.background }]}>
                <Text style={[styles.formTitle, { color: theme.text }]}>Register Now</Text>

                <TextInput
                    style={[styles.input, { borderColor: "#ccc", color: theme.text }]}
                    placeholder="Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    readOnly={isLoading}
                />

                <TextInput
                    style={[styles.input, { borderColor: "#ccc", color: theme.text }]}
                    placeholder="Email address"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    readOnly={isLoading}
                />
                <TextInput
                    style={[styles.input, { borderColor: "#ccc", color: theme.text }]}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    readOnly={isLoading}
                />

                <Pressable style={[styles.button, { backgroundColor: theme.tint }]} onPress={handleLogin} disabled={isLoading}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>

                <Text style={[styles.signupText, { color: theme.tabIconDefault }]}>
                    Already had an account ?{" "}
                    <Text style={{ color: Colors.light.tint }} onPress={() => router.push("/(auth)/login")}>Log In</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    formWrapper: {
        flex: 2,
        padding: 24,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -40,
    },
    formTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 16,
    },
    linkText: {
        textAlign: "center",
        fontSize: 14,
        marginBottom: 8,
    },
    signupText: {
        textAlign: "center",
        fontSize: 14,
    },
});