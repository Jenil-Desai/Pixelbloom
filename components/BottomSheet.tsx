import React,{ useRef } from "react";
import {Share, View, Image, StyleSheet, useColorScheme, Pressable, Text} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Wallpaper } from "@/hooks/fetchWallpapers";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export const DownloadPicture = ({ onClose, wallpaper, snapPoint = "95%" }: { onClose: () => void; wallpaper: Wallpaper, snapPoint?: string }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useColorScheme() ?? "light";

  async function handleShare() {
    await Share.share({
        title: "Explore Stunning Wallpapers with PixelBloom!",
        message: "🌟 Transform your device with **PixelBloom** - the ultimate wallpaper app! 🖼️ Featuring high-quality images, 🎨 artist details, and 📥 easy downloads. 🚀 Get it now at: https://pixelbloom-website.vercel.app/ 🌐",
    });
  }

  return (
      <BottomSheet
          onClose={onClose}
          snapPoints={[snapPoint]}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ display: "none" }}
          handleStyle={{ display: "none" }}
      >
        <BottomSheetView style={[styles.contentContainer,{backgroundColor: theme === "light" ? Colors.light.background : Colors.dark.background}]}>
          <View style={{ flex: 1 }}>
            <Image style={styles.image} source={{ uri: wallpaper.image_url }} />

            {/* Top Icons */}
            <View style={styles.topbar}>
              <Ionicons
                  onPress={onClose}
                  name="close"
                  size={24}
                  color="#fff"
                  style={styles.icon}
              />
              <View style={styles.topbarInner}>
                <Ionicons name="bookmark-outline" size={24} color="#fff" style={styles.icon} />
                <Ionicons name="share" size={24} color="#fff" style={[{ marginLeft: 6 }, styles.icon]} onPress={handleShare} />
              </View>
            </View>

            {/* Details Panel */}
            <View style={[styles.detailsBox,{backgroundColor: theme === "light" ? Colors.light.tint : Colors.dark.indicator}]}>
              <Text style={styles.wallpaperTitle}>{wallpaper.title}</Text>

              <View style={styles.row}>
                <Ionicons name="person" size={18} color="#ccc" />
                <Text style={styles.metaText}>Artist: {wallpaper.artist_name}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="images" size={18} color="#ccc" />
                <Text style={styles.metaText}>Category: {wallpaper.category_name}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="heart" size={18} color="#ccc" />
                <Text style={styles.metaText}>Likes: {wallpaper.likes}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="logo-electron" size={18} color="#ccc" />
                <Text style={styles.metaText}>Platform: {wallpaper.platform}</Text>
              </View>

              <DownloadButton url={wallpaper.image_url} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
  );
};


function DownloadButton({ url }: { url: string }) {
  const theme = useColorScheme() ?? "light";
  return (
      <Pressable
          onPress={async () => {
            let date = new Date().getTime();
            let fileUri = FileSystem.documentDirectory + `${date}.jpg`;

            try {
              await FileSystem.downloadAsync(url, fileUri);
              const response = await MediaLibrary.requestPermissionsAsync(true);
              if (response.granted) {
                await MediaLibrary.createAssetAsync(fileUri);
                alert("Image saved");
              } else {
                console.error("permission not granted");
              }
            } catch (err) {
              console.log("FS Err: ", err);
            }
          }}
          style={{
            backgroundColor: "black",
            padding: 10,
            marginHorizontal: 40,
            marginVertical: 20,
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme === "light" ? Colors.light.text : Colors.dark.icon,
          }}
      >
        <Ionicons
            name={"download"}
            size={20}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            style={{ paddingRight: 4 }}
        />
        <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "600",
            }}
        >
          Download
        </Text>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: "55%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topbar: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topbarInner: {
    flexDirection: "row",
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 30,
  },
  detailsBox: {
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  wallpaperTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  metaText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#ccc",
  },
});