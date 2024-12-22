import FontAwesome from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "pink", headerShown: false }} initialRouteName="index">
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
