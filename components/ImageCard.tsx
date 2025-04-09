import { Wallpaper } from "@/hooks/fetchWallpapers";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";

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
            <Ionicons name={"heart"} size={18} color={isLiked ? "pink" : "gray"} />
          </TouchableOpacity>
        </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    borderRadius: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {
    color: "white",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
  },
});