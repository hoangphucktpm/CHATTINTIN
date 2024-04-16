import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { BlurView } from "expo-blur";

export default function BlurViewMessage() {
  const text = "Hello, my container is blurring contents underneath!";
  return (
    <SafeAreaView style={styles.container}>
      <BlurView intensity={100}>
        <Text>{text}</Text>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
