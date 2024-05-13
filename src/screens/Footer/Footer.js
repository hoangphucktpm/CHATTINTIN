import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./StyleFooter";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../../redux/appSlice";
import { Badge } from "react-native-paper";

function Footer(props) {
  const navigation = useNavigation();

  const icons = [
    { name: "message1", route: "Home" },
    { name: "user-friends", route: "Contacts" },
    { name: "map", route: "Map"}, 
    { name: "clockcircleo", route: "Story" },
    { name: "user", route: "MyProfile" },
  ];

  const dispatch = useDispatch();
  const { currentScreen, badge } = useSelector((state) => state.app);

  const handlePress = (route) => {
    dispatch(setCurrentScreen(route));
    navigation.navigate(route, { phone: props?.phone });
  };

  return (
    <View>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(icon.route)}
            style={[
              styles.containerIcon,
              { flexDirection: "column", alignItems: "center" },
            ]}
          >
            <View>
              {icon.name === "message1" && (
                <AntDesign
                  name={icon.name}
                  size={20}
                  color={currentScreen === icon.route ? "blue" : "grey"}
                />
              )}
              {icon.name === "user-friends" && (
                <View style={{ position: "relative" }}>
                  {badge ? (
                    <Badge
                      style={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        zIndex: 2,
                      }}
                    >
                      {badge}
                    </Badge>
                  ) : null}
                  <FontAwesome5
                    name={icon.name}
                    size={20}
                    color={currentScreen === icon.route ? "blue" : "grey"}
                  />
                </View>
              )}
              
              {icon.name === "clockcircleo" && (
                <AntDesign
                  name={icon.name}
                  size={20}
                  color={currentScreen === icon.route ? "blue" : "grey"}
                />
              )}
              {icon.name === "map" && (
                <FontAwesome
                  name={icon.name}
                  size={20}
                  color={currentScreen === icon.route ? "blue" : "grey"}
                />
              )}
              {icon.name === "user" && (
                <FontAwesome
                  name={icon.name}
                  size={20}
color={currentScreen === icon.route ? "blue" : "grey"}
                />
              )}
            </View>
            <Text style={styles.textIcon}>
              {icon.name === "message1"
                ? "Tin nhắn"
                : icon.name === "user-friends"
                ? "Danh bạ"
                : icon.name === "clockcircleo"
                ? "Nhật ký"
                : icon.name === "map"
                ? "Bản đồ"
                : "Cá nhân"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Footer;
