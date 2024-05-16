import {
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import socket from "../../../services/socket";

const VideoCallCome = ({ route }) => {
  const navigation = useNavigation();
  const refuse = () => {
    // Code for ending the call
    if (route.params?.data) {
      socket.emit("pre-offer-single-answer", {
        ...route.params.data,
        preOfferAnswer: "CALL_REJECTED",
      });
      Alert.alert("Thông báo", "Cuộc gọi đã từ chối");
    }
    navigation.navigate("Home");
  };

  const accept = () => {
    socket.emit("pre-offer-single-answer", {
      ...route.params.data,
      preOfferAnswer: "CALL_ACCEPTED",
    });


    navigation.navigate("VideoCall", {
      ...route.params.data,
      callOut: false,
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {/* Thêm avatar và tên của người được gọi dưới header */}
        <View style={styles.callerInfo}>
          <Image
            style={styles.avatar}
            source={{
              uri: route.params.data?.image || "https://i.pravatar.cc/100",
            }}
          />
          
          {!route.params?.callOut ? (
            <Text style={styles.callerName}>{route.params?.fullname}</Text>
          ) : (
            <Text style={styles.callerName}>
              Đang gọi đến {route.params?.fullname || "..."}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonend} onPress={refuse}>
            <MaterialCommunityIcons
              name="phone-hangup"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>
            {route.params?.callOut ? "Kết thúc" : "Từ chối"}
          </Text>
        </View>

        {!route.params?.callOut && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={accept}>
              <Entypo name="phone" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>Chấp nhận</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  localVideo: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 2,
    margin: 16,
    borderWidth: 1,
    borderColor: "black",
  },

  callerInfo: {
    flexDirection: "column", // Change this line
    alignItems: "center",
    padding: 50,
    justifyContent: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // Remove marginRight
  },
  callerName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  iconLabel: {
    textAlign: "center",
    fontSize: 12,
    color: "#000",
  },

  remoteVideo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
    borderWidth: 1,
    borderColor: "black",
  },

  buttons: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: Dimensions.get("window").width - 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  button: {
    // backgroundColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "#4CAF50", // Màu xanh
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30, // Để biến button thành hình tròn
  },

  buttonheader: {
    // backgroundColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "#4CAF50", // Màu xanh
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30, // Để biến button thành hình tròn
  },

  buttonend: {
    // backgroundColor: "rgba(255, 255, 255, 0.3)",
    // màu đỏ
    backgroundColor: "red",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30, // Để biến button thành hình tròn
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  buttonText: {
    color: "black",
    padding: 10,
  },
});

export default VideoCallCome;
