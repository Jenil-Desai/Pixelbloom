import { SplitView } from "@/components/SpiltView";
import { ThemedView } from "@/components/ThemedView";
import { useLikedWallpapers } from "@/hooks/useWallpapers";
import { StyleSheet } from "react-native";

export default function Liked() {
  const walletpapers = useLikedWallpapers();

  return (
    <ThemedView style={styles.container}>
      <SplitView wallpapers={walletpapers} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
