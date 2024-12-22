import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Library from "../library";
import Liked from "../liked";
import Suggested from "../suggested";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ width: "100%", backgroundColor: "white", height: 100, padding: 10, justifyContent: "center", alignItems: "center" }}>
          <Image src="https://avatar.iran.liara.run/public" style={{ width: 70, height: 70, borderRadius: 70 / 2, borderColor: "pink", borderWidth: 1 }} />
        </View>
        <Tab.Navigator initialRouteName={"Suggested"} screenOptions={{ tabBarLabelStyle: style.tabBarLabelStyle, tabBarIndicatorStyle: style.tabBarIndicatorStyle }}>
          <Tab.Screen name="Suggested" component={Suggested} />
          <Tab.Screen name="Liked" component={Liked} />
          <Tab.Screen name="Library" component={Library} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  tabBarLabelStyle: {
    fontWeight: "800",
    fontSize: 17,
  },
  tabBarIndicatorStyle: {
    borderRadius: 5,
    height: 7,
    backgroundColor: "pink",
  },
});
