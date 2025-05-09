import { SplitView } from "@/components/SpiltView";
import { ThemedView } from "@/components/ThemedView";
import { getBookmarkedWallpapers, Wallpaper } from "@/hooks/fetchWallpapers";
import {Alert, StyleSheet, Text, useColorScheme} from "react-native";
import {useRouter} from "expo-router";
import {useAuth} from "@/context/AuthContext";
import {useEffect, useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "@/constants/Colors";
import SpiltViewSkeletonLoader from "@/components/skeletons/SpiltViewSkeletonLoader";

export default function Library() {
  const scheme = useColorScheme();
  const theme = Colors[scheme ?? "light"];
  const router = useRouter();
  const {isLoggedIn} = useAuth();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
      return;
    }
    setIsLoading(true);
    getWallpaper();
  }, [isLoggedIn]);

  async function getWallpaper() {
    try {
      const wp = await getBookmarkedWallpapers(true);
      setWallpapers(wp);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return (
      <ThemedView style={styles.container}>
        <SpiltViewSkeletonLoader />
      </ThemedView>
  )

  return (
    <ThemedView style={styles.container}>
      {wallpapers.length == 0 && !isLoading ? (
          <ThemedView style={[styles.container, { backgroundColor: theme.background,justifyContent: "center", alignItems: "center" }]}>
            <Ionicons name={"bookmark-outline"} size={50} color={theme.indicator} />
            <Text style={[styles.text, { color: theme.indicator }]}>No bookmarked wallpapers</Text>
          </ThemedView>
      ) : (
          <SplitView wallpapers={wallpapers} onRefresh={getWallpaper}/>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});