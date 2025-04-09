import {Wallpaper} from "@/hooks/fetchWallpapers";
import {Image, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

interface ImageCardProps {
    wallpaper: Wallpaper;
    onPress: () => void;
    onLikeToggle: () => void;
    isLiked: boolean;
}

export default function ImageCard({wallpaper, onPress, onLikeToggle, isLiked}: ImageCardProps) {
    return (<TouchableOpacity onPress={onPress}>
            <Image source={{uri: wallpaper.image_url}} style={style.image}/>
            <Pressable style={style.labelContainer} onPress={onLikeToggle}>
                <Ionicons name="heart" size={20} color={isLiked ? "pink" : "gray"} style={style.icon}/>
            </Pressable>

        </TouchableOpacity>);
}

const style = StyleSheet.create({
    image: {
        flex: 1, height: 300, borderRadius: 10,
    }, labelContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }, label: {
        color: "white",
    }, iconContainer: {
        display: "flex", justifyContent: "center",
    }, icon: {
        backgroundColor: "rgba(0,0,0,0.6)", padding: 5, borderRadius: 30,
    },
});