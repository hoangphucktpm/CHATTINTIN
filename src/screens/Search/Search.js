import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./StyleSearch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

function Search() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [listFriends, setListFriends] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const results = listFriends.filter((friend) =>
        friend.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, listFriends]);

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
          onChangeText={(text) => setSearchTerm(text)}
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
      <View>
        {searchResults.map((result, index) => (
          <Text key={index}>{result.fullname}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default Search;
