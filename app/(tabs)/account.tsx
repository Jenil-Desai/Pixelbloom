import { Link } from "expo-router";
import { Text, SafeAreaView, Button } from "react-native";

export default function Account() {
  return (
    <SafeAreaView>
      <Text>Account Screen</Text>
      <Link href={"/(nobottombar)/accountinfo"}>
        <Text>Account Information</Text>
      </Link>
    </SafeAreaView>
  );
}
