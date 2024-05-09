import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import socket from "../../../services/socket";
import { useSelector } from "react-redux";

const VideoCallCome = ({ route }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const navigation = useNavigation();

  const localVideoRef = useRef(null); // Placeholder for local video view

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // check permission microphone
    const getMicrophonePermission = async () => {
      if (Platform.OS === "android") {
        try {
          const isGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          );
          if (isGranted) return startCall();
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: "Microphone Permission",
              message: "This app needs access to your microphone.",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Microphone permission granted");
            startCall();
          } else {
            console.log("Microphone permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        console.log("Platform not supported for permission request");
      }
    };
    getMicrophonePermission();
  }, []);

  useEffect(() => {
    socket.on("webRTC-signaling", (data) => console.log("data2", data));

    socket.on("pre-offer-single-answer", (data) => {
      if (data.preOfferAnswer === "CALL_REJECTED") navigation.navigate("Home");
    });
    socket.on("pre-offer-single", (data) => {
      console.log("pre-offer-single", data);
      signalingFunc(data.IDCaller, "OFFER");
    });
    return () => {
      socket.off("pre-offer-single-answer");
    };
  }, []);

  const signalingFunc = (connectedUserSocketId, signaling) => {
    const data = {
      signaling,
      connectedUserSocketId,
    };
    socket.emit("webRTC-signaling", data);
  };

  const startCall = async () => {
    // Code for starting the call

    const data = {
      IDCaller: user.phone,
      IDCallee: route.params?.id,
      callType: "SOUND_PERSONAL_CODE",
    };

    socket.emit("pre-offer-single", data);
    signalingFunc(route.params?.id, "OFFER");
  };

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

  add = () => {
    Alert.alert("Thông báo", "Chức năng đang phát triển");
  };

  const toggleMicrophone = () => {
    setIsMicrophoneMuted(!isMicrophoneMuted);
    // Code for toggling microphone
  };

  const accept = () => {
    // Code for accepting the call

    socket.emit("pre-offer-single-answer", {
      ...route.params.data,
      preOfferAnswer: "CALL_ACCEPTED",
    });

    const data = {
      signaling: "ANSWER",
      connectedUserSocketId: route.params.data.socketIDCallee,
    };

    socket.emit("webRTC-signaling", data);
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
            source={{
              uri: route.params?.callOut
                ? route.params?.image
                : route.params?.urlavatar || "https://i.pravatar.cc/100",
            }}
          />
          <Text style={styles.callerName}>Caller Name</Text>
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
