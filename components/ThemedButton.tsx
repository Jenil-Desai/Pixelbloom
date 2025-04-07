import { Pressable, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import React from "react";

export function ThemeButton({ title, onPress }: { title: string; onPress: () => void }) {
    const theme = useColorScheme();

    return (
        <Pressable
            style={{ padding: 10, borderWidth: 1, borderColor: theme === "light" ? Colors.light.text : Colors.dark.icon, borderRadius: 5, flex: 0.3 }}
            onPress={onPress}
        >
            <ThemedText style={{ width: "100%", textAlign: "center" }}>{title}</ThemedText>
        </Pressable>
    );
}