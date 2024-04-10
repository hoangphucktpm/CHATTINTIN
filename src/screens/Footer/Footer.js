import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./StyleFooter";

function Footer(props) {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState(null);

  const handlePress = () => {
    setActiveIcon("message1");
    navigation.navigate("Home", { phone: props?.phone });
  };

  const handleContactsPress = () => {
    setActiveIcon("user-friends");
    navigation.navigate("Contacts", { phone: props?.phone });
  };

  const handleClockPress = () => {
    setActiveIcon("clockcircleo");
    navigation.navigate("Story", { phone: props?.phone });
  };

  const handleProfilePress = () => {
    setActiveIcon("user");
    navigation.navigate("MyProfile", { phone: props?.phone });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.containerIcon}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <AntDesign
            name="message1"
            size={20}
            color={activeIcon === "message1" ? "blue" : "grey"}
          />
          <Text style={[styles.textIcon, { marginLeft: 5 }]}>Tin nhắn</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleContactsPress}
        style={[
          styles.containerIcon,
          { flexDirection: "column", alignItems: "center" },
        ]}
      >
        <FontAwesome5
          name="user-friends"
          size={20}
          color={activeIcon === "user-friends" ? "blue" : "grey"}
        />
        <Text style={styles.textIcon}>Danh bạ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleClockPress}
        style={[
          styles.containerIcon,
          { flexDirection: "column", alignItems: "center" },
        ]}
      >
        <AntDesign
          name="clockcircleo"
          size={20}
          color={activeIcon === "clockcircleo" ? "blue" : "grey"}
        />
        <Text style={styles.textIcon}>Nhật ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleProfilePress}
        style={[
          styles.containerIcon,
          { flexDirection: "column", alignItems: "center" },
        ]}
      >
        <FontAwesome
          name="user"
          size={20}
          color={activeIcon === "user" ? "blue" : "grey"}
        />
        <Text style={styles.textIcon}>Cá nhân</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
