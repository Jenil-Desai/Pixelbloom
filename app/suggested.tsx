import { SplitView } from "@/components/SpiltView";
import { ThemedView } from "@/components/ThemedView";
import {getWallpapers, Wallpaper} from "@/hooks/fetchWallpapers";
import {Alert, StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {useAuth} from "@/context/AuthContext";
import {useEffect, useState} from "react";
import SpiltViewSkeletonLoader from "@/components/skeletons/SpiltViewSkeletonLoader";

export default function Suggested() {
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
      const wp = await getWallpapers(true);
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
      <SplitView wallpapers={wallpapers} onRefresh={getWallpaper} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});