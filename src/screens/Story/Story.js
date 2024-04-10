import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../Footer/Footer";
import { useNavigation } from "@react-navigation/native";
import styles from "./StyleStory";

function Story() {
  const navigation = useNavigation();

  const handleSearch = () => {
    // Mở thanh tìm kiếm
  };

  const handleCreateGroup = () => {
    navigation.navigate("CreateGroup");
  };

  const handleScanQR = () => {
    navigation.navigate("ScannerQR");
  };

  const handleAddFriends = () => {
    // Chuyển đến màn hình thêm bạn bè
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchIconContainer}>
          <EvilIcons
            name="search"
            size={30}
            color="white"
            onPress={handleSearch}
          />
        </View>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.rightIconsContainer}>
          <TouchableOpacity onPress={handleAddFriends}>
            <EvilIcons name="plus" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateGroup}>
            <EvilIcons name="gear" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.promptText}>Hôm nay bạn nghĩ gì?</Text>
        <TouchableOpacity onPress={handleScanQR}>
          <Image
            style={styles.avatar}
            source={require("../../../assets/avata.jpg")}
          />
        </TouchableOpacity>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

export default Story;
