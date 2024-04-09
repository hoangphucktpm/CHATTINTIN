import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
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
    // Thực hiện các hành động khác khi nhấn vào icon này
  };

  const handleProfilePress = () => {
    setActiveIcon("user");
    navigation.navigate("MyProfile", { phone: props?.phone });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.containerIcon}>
        <AntDesign
          name="message1"
          size={20}
          color={activeIcon === "message1" ? "blue" : "grey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleContactsPress}
        style={styles.containerIcon}
      >
        <FontAwesome5
          name="user-friends"
          size={20}
          color={activeIcon === "user-friends" ? "blue" : "grey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleClockPress}
        style={styles.containerIcon}
      >
        <AntDesign
          name="clockcircleo"
          size={20}
          color={activeIcon === "clockcircleo" ? "blue" : "grey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleProfilePress}
        style={styles.containerIcon}
      >
        <FontAwesome
          name="user"
          size={20}
          color={activeIcon === "user" ? "blue" : "grey"}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
