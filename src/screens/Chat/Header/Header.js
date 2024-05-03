import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "./StyleHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

function Header({ fullname, id, image, isGroup }) {
  const navigation = useNavigation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(`\\b${searchTerm}\\b`, "i");
      const results = messages.filter((message) => regex.test(message.body));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, messages]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = () => {
    const regex = new RegExp(`\\b${searchTerm}\\b`, "i");
    const results = messages.filter((message) => regex.test(message.body));
    setSearchResults(results);

    // If there are results, navigate to the first one
    if (results.length > 0) {
      navigation.navigate("Message", { message: results[0] });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_left}>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={handleBackPress} style={styles.button}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.container_friend_Name}>
          <Text style={styles.friend_Name}>{fullname}</Text>
        </View>
      </View>
      <View style={styles.container_right}>
        {isSearchVisible ? (
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search messages"
            onSubmitEditing={handleSearch}
          />
        ) : null}
        <View style={styles.container_right_icon}>
          <Feather
            name="search"
            size={23}
            color="white"
            onPress={handleSearchPress}
          />
        </View>
        <View style={styles.container_right_icon}>
          <Feather name="phone" size={23} color="white" onPress={() => navigation.navigate("VideoCallCome")} />
        </View>
        <View style={styles.container_right_icon}>
          <Feather name="video" size={26} color="white" onPress={() => navigation.navigate("VideoCall")} />
        </View>
        <TouchableOpacity
          style={styles.container_right_icon}
          onPress={() =>
            navigation.navigate(isGroup ? "DrawerChatGroup" : "DrawerChat", {
              phone: id,
              fullname: fullname,
              urlavatar: image,
            })
          }
        >
          <Feather name="menu" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
