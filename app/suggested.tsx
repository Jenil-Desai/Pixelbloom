import { SplitView } from "@/components/SpiltView";
import { ThemedView } from "@/components/ThemedView";
import {getWallpapers, Wallpaper} from "@/hooks/fetchWallpapers";
import {Alert, StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {useAuth} from "@/context/AuthContext";
import {useEffect, useState} from "react";

export default function Suggested() {
  const router = useRouter();
  const {isLoggedIn} = useAuth();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [_, setIsLoading] = useState(false);

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
      const wp = await getWallpapers();
      setWallpapers(wp);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

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