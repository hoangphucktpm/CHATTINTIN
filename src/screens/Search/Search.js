import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../redux/conversationSlice";
import styles from "./StyleSearch";

function Search() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const { conversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  const [originalConversation, setOriginalConversation] = useState([]);

  useEffect(() => {
    setOriginalConversation(conversation);
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm !== "") {
      const results = conversation.filter(
        (item) =>
          item?.IDSender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.Receiver?.fullname
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      dispatch(setConversation(results));
    } else {
      dispatch(setConversation(originalConversation));
    }
  };

  const handlePress = () => {
    navigation.navigate("ScannerQR");
  };

  const handlePressCreateGroup = () => {
    navigation.navigate("CreateGroup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerIcon}>
        <EvilIcons name="search" size={30} color="white" />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          placeholderTextColor="#fff"
          style={styles.input}
          type="text"
          placeholder="Tìm kiếm"
          onChangeText={(text) => {
            setSearchTerm(text);
            handleSearch(text);
          }}
          value={searchTerm}
        />
      </View>
      <View style={styles.containerIconRight}>
        <TouchableOpacity onPress={handlePress} style={styles.containerIconQR}>
          <MaterialCommunityIcons name="qrcode-scan" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressCreateGroup}
          style={styles.containerIconAdd}
        >
          <Ionicons name="add-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Search;
