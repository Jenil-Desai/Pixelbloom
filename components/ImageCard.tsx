import { Wallpaper } from "@/hooks/fetchWallpapers";
import {Image, StyleSheet, TouchableOpacity, useColorScheme, View} from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface ImageCardProps {
  wallpaper: Wallpaper;
  onPress: () => void;
  onLikeToggle: () => void;
  isLiked: boolean;
}

export default function ImageCard({ wallpaper, onPress,onLikeToggle, isLiked }: ImageCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: wallpaper.image_url }} style={style.image} />
        <View style={style.labelContainer}>
          <ThemedText style={style.label}>{wallpaper.title.slice(0, 10) + "..."}</ThemedText>
          <TouchableOpacity style={style.iconContainer} onPress={onLikeToggle}>
            <Ionicons name={"heart"} size={18} color={isLiked ? "red" : Colors.light.icon} />
          </TouchableOpacity>
        </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  image: {
    flex: 1,
    height: 220,
    borderRadius: 20,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  label: {
    color: "white",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
  },
});