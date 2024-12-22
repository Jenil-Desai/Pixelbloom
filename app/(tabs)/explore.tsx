import { DownloadPicture } from "@/components/BottomSheet";
import { useState } from "react";
import { Text, SafeAreaView, Button, View } from "react-native";

export default function Explore() {
  const [pictureOpen, setPictureOpen] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Explore Screen</Text>
        <Button
          title="Open Bottom Sheet"
          onPress={() => {
            setPictureOpen(true);
          }}
        />
        {pictureOpen && <DownloadPicture onClose={() => setPictureOpen(false)} />}
      </View>
    </SafeAreaView>
  );
}
