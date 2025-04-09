import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Library from "../library";
import Liked from "../liked";
import Suggested from "../suggested";
import { Image, useColorScheme, View } from "react-native";
import { Colors } from "@/constants/Colors";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedSafeAreaView style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <View style={{ flex: 1 }}>
        <View style={{ width: "100%", backgroundColor: Colors[theme].background, height: 100, padding: 10, justifyContent: "center", alignItems: "center" }}>
          <Image src="https://avatar.iran.liara.run/public" style={{ width: 70, height: 70, borderRadius: 70 / 2, borderColor: "pink", borderWidth: 1 }} />
        </View>
        <Tab.Navigator
          initialRouteName={"Suggested"}
          screenOptions={{
            tabBarActiveTintColor: Colors[theme].tint,
            tabBarStyle: {
              backgroundColor: Colors[theme].background,
            },
            tabBarIndicatorStyle: {
              backgroundColor: Colors[theme].indicator,
              height: 5,
            },
          }}
        >
          <Tab.Screen name="Suggested" component={Suggested} />
          <Tab.Screen name="Liked" component={Liked} />
          <Tab.Screen name="Library" component={Library} />
        </Tab.Navigator>
      </View>
    </ThemedSafeAreaView>
  );
}