import {Alert, Appearance, Pressable, StyleSheet, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {ScrollView} from "react-native-gesture-handler";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import React, {useEffect} from "react";
import {ThemeButton} from "@/components/ThemedButton";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "expo-router";
import {getUserDetails, User} from "@/hooks/fetchUser";
import AccountSkeletonLoader from "@/components/skeletons/AccountsSkeletonLoader";

export default function Account() {
    const {isLoggedIn} = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState<User | null>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/");
            return;
        }

        setIsLoading(true);
        getUserDetail();
    }, [isLoggedIn]);

    async function getUserDetail() {
        try {
            const ud = await getUserDetails(true);
            setUserDetails(ud);
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading || !userDetails) return <AccountSkeletonLoader />;

    return (<ThemedSafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Header/>
                <ThemedView style={{flex: 1}}>
                    <UserDetails user={userDetails}/>
                    <ThemeSelector/>
                    <About/>
                </ThemedView>
            </ScrollView>
        </ThemedSafeAreaView>);
}

function Header() {
    return (<ThemedView style={styles.topbar}>
            <ThemedText style={styles.textBig}>Pixel Bloom</ThemedText>
            <ThemedText>Where Nature Meets Digital Art</ThemedText>
        </ThemedView>);
}

type UserDetailsProps = {
    user: User;
}

function UserDetails({user}: UserDetailsProps) {
    const theme = useColorScheme() ?? "light";

    return (<ThemedView
            style={[styles.userCard, {backgroundColor: theme === "light" ? Colors.light.tint : Colors.dark.indicator}]}>
            <ThemedText style={styles.infoText}>👤 {user.Name}</ThemedText>
            <ThemedText style={styles.infoText}>📧 {user.Email}</ThemedText>
            <ThemedText style={styles.infoText}>📅 Joined: {new Date(user.CreatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " / ")}</ThemedText>
            <LogoutButton/>
        </ThemedView>);
}

function LogoutButton() {
    const {logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/login");
        Alert.alert("Logout", "You have been logged out successfully");
    };

    return (<Pressable onPress={handleLogout} style={({pressed}) => [styles.logoutButton, {
            backgroundColor: "#fff", opacity: pressed ? 0.8 : 1,
        },]}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </Pressable>);
}

function ThemeSelector() {
    return (<ThemedView style={styles.margin}>
            <ThemedText style={styles.textBig}>Settings</ThemedText>
            <ThemedText>Theme</ThemedText>
            <ThemedView style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                <ThemeButton title={"Dark"} onPress={() => Appearance.setColorScheme("dark")}/>
                <ThemeButton title={"Light"} onPress={() => Appearance.setColorScheme("light")}/>
                <ThemeButton title={"System"} onPress={() => Appearance.setColorScheme(null)}/>
            </ThemedView>
        </ThemedView>);
}

function About() {
    return (<ThemedView style={styles.margin}>
            <ThemedText style={styles.textBig}>About</ThemedText>
            <ThemedView style={{marginTop: 10}}>
                <Pressable><ThemedText style={styles.link}>Account</ThemedText></Pressable>
                <Pressable><ThemedText style={styles.link}>Privacy Policy</ThemedText></Pressable>
                <Pressable><ThemedText style={styles.link}>Terms of Service</ThemedText></Pressable>
                <Pressable><ThemedText style={styles.link}>Licenses</ThemedText></Pressable>
            </ThemedView>
        </ThemedView>);
}

const styles = StyleSheet.create({
    textBig: {
        fontSize: 25, fontWeight: "600",
    }, infoText: {
        fontSize: 16, marginVertical: 5,
    }, topbar: {
        padding: 20,
    }, userCard: {
        marginHorizontal: 20, marginTop: 10, padding: 20, borderRadius: 16,
    }, margin: {
        padding: 20,
    }, logoutButton: {
        marginHorizontal: 20, marginTop: 10, borderRadius: 10, paddingVertical: 12, alignItems: "center",
    }, logoutText: {
        fontSize: 16, fontWeight: "500", color: "#000",
    }, link: {
        margin: 10, fontSize: 18,
    },
});