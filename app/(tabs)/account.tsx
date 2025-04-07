import Ionicons from "@expo/vector-icons/Ionicons";
import {Appearance, Pressable, StyleSheet, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ScrollView} from "react-native-gesture-handler";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import React from "react";
import {ThemeButton} from "@/components/ThemedButton";
import {AuthButton} from "@/components/AuthButton";

export default function Account() {
    return (<ThemedSafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Header/>
                <ThemedView style={{flex: 1}}>
                    <LoginButtons/>
                    <ThemeSelector/>
                    <About/>
                </ThemedView>
            </ScrollView>
        </ThemedSafeAreaView>);
}

function About() {
    return (<ThemedView style={styles.margin}>
            <ThemedText style={styles.textBig}>About</ThemedText>
            <ThemedView style={{marginTop: 10}}>
                <Pressable>
                    <ThemedText style={{margin: 10, fontSize: 18}}>Account</ThemedText>
                </Pressable>
                <Pressable>
                    <ThemedText style={{margin: 10, fontSize: 18}}>Privacy Policy</ThemedText>
                </Pressable>
                <Pressable>
                    <ThemedText style={{margin: 10, fontSize: 18}}>Terms of Service</ThemedText>
                </Pressable>
                <Pressable>
                    <ThemedText style={{margin: 10, fontSize: 18}}>Licenses</ThemedText>
                </Pressable>
            </ThemedView>
        </ThemedView>);
}

function ThemeSelector() {
    return (<ThemedView style={styles.margin}>
            <ThemedText style={styles.textBig}>Settings</ThemedText>
            <ThemedText>Theme</ThemedText>
            <ThemedView style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                <ThemeButton title={"Dark"} onPress={() => {
                    Appearance.setColorScheme("dark");
                }}/>
                <ThemeButton title={"Light"} onPress={() => {
                    Appearance.setColorScheme("light");
                }}/>
                <ThemeButton title={"System"} onPress={() => {
                    Appearance.setColorScheme(null);
                }}/>
            </ThemedView>
        </ThemedView>);
}

function LoginButtons() {
    const theme = useColorScheme() ?? "light";
    return (<>
            <AuthButton label={"Sign in"} icon={<Ionicons name={"logo-google"} size={24}
                                                          color={theme === "light" ? Colors.light.text : Colors.dark.icon}/>}/>
            <AuthButton label={"Sign in"} icon={<Ionicons name={"logo-apple"} size={24}
                                                          color={theme === "light" ? Colors.light.text : Colors.dark.icon}/>}/>
        </>);
}

function Header() {
    return (<ThemedView style={styles.topbar}>
            <ThemedText style={styles.textBig}>Pixel Bloom</ThemedText>
            <ThemedText>Sign in to save your data (Developing)</ThemedText>
        </ThemedView>);
}

const styles = StyleSheet.create({
    textBig: {
        fontSize: 25, fontWeight: "600",
    }, topbar: {
        padding: 20,
    }, themeSelectorContainer: {
        flex: 1,
    }, themeSelectorChild: {}, margin: {
        padding: 20,
    },
});