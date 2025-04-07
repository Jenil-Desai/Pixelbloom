import {Pressable, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import React from "react";

export function AuthButton({label, icon}: { label: string; icon: any }) {
    const theme = useColorScheme() ?? "light";

    return (<Pressable
        style={{
            backgroundColor: theme,
            padding: 10,
            marginHorizontal: 40,
            marginVertical: 5,
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme === "light" ? Colors.light.text : Colors.dark.icon,
        }}
    >
        {icon}
        <ThemedText
            style={{
                fontSize: 20, fontWeight: "600",
            }}
        >
            {label}
        </ThemedText>
    </Pressable>);
}