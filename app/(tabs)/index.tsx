import { DownloadPicture } from "@/components/BottomSheet";
import ImageCard from "@/components/ImageCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useWallpapers, Wallpaper } from "@/hooks/useWallpapers";
import { useState } from "react";
import { SafeAreaView, Image, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Explore() {
  const wallpapers = useWallpapers();
  const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView headerImage={<Image style={style.ParallaxScrollViewImageStyle} source={{ uri: "https://images.unsplash.com/photo-1721332153282-3be1f363074d?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />} headerBackgroundColor={{ dark: "black", light: "white" }}>
        <ThemedView style={style.container}>
          <ThemedView style={style.innerContainer}>
            <FlatList
              data={wallpapers.filter((_, index) => index % 2 === 0)}
              renderItem={({ item }) => (
                <View style={style.imageContainer}>
                  <ImageCard
                    wallpaper={item}
                    onPress={() => {
                      setSelectedWallpaper(item);
                    }}
                  />
                </View>
              )}
              keyExtractor={(item) => item.url}
            />
          </ThemedView>
          <ThemedView style={style.innerContainer}>
            <FlatList
              data={wallpapers.filter((_, index) => index % 2 === 1)}
              renderItem={({ item }) => (
                <View style={style.imageContainer}>
                  <ImageCard
                    wallpaper={item}
                    onPress={() => {
                      setSelectedWallpaper(item);
                    }}
                  />
                </View>
              )}
              keyExtractor={(item) => item.url}
            />
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
      {selectedWallpaper && <DownloadPicture onClose={() => setSelectedWallpaper(null)} wallpaper={selectedWallpaper} />}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  innerContainer: {
    flex: 0.5,
    padding: 4,
  },
  imageContainer: {
    paddingVertical: 10,
  },
  ParallaxScrollViewImageStyle: {
    flex: 1,
  },
});
