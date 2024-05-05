import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";


const VideoCallCome = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const navigation = useNavigation();

  const localVideoRef = useRef(null); // Placeholder for local video view

  const startCall = async () => {
    // Code for starting the call
  };

  const refuse = () => {
    navigation.goBack();
    Alert.alert("Thông báo", "Cuộc gọi đã từ chối");
    // Code for ending the call
  };

  add = () => {
    Alert.alert("Thông báo", "Chức năng đang phát triển");
  };

  const toggleMicrophone = () => {
    setIsMicrophoneMuted(!isMicrophoneMuted);
    // Code for toggling microphone
  };

  const accept = () => {
    // Code for accepting the call
  };


  return (
    <View style={styles.container}>
      {localStream && (
        <View style={styles.localVideo} ref={localVideoRef}>
          {/* Display the local video/image here (replace with appropriate component) */}
        </View>
      )}

      {remoteStream && (
        <View style={styles.remoteVideo}>
          {/* Display the remote video/image here (replace with appropriate component) */}
        </View>
      )}

      <View style={styles.container}>
      

      {/* Thêm avatar và tên của người được gọi dưới header */}
      <View style={styles.callerInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://i.pravatar.cc/100" }}
        />
        <Text style={styles.callerName}>Caller Name</Text>
        <Text style={styles.callerName}>Đang gọi đến...</Text>
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
          <Text style={styles.iconLabel}>Từ chối</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={accept}>
            <Entypo name="phone" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Chấp nhận</Text>
        </View>
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
    flexDirection: 'column', // Change this line
    alignItems: 'center',
    padding: 50,
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // Remove marginRight
  },
  callerName: {
    fontSize: 18,
    fontWeight: 'bold',
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
