import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/Ionicons";
import {Tabs} from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const theme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Tabs.Screen
        name="foryou"
        options={{
          title: "For You",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="person-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="globe" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="settings-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}