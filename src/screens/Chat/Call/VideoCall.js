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
import { RNCamera } from "react-native-camera";
import { Camera } from "expo-camera";

const VideoCall = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const navigation = useNavigation();

  const localVideoRef = useRef(null); // Placeholder for local video view
  let cameraRef = useRef(null);
  useEffect(() => {
    // check camera permission
    const getCameraPermission = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "This app needs access to your camera.",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission granted");
            await takePicture();
          } else {
            console.log("Camera permission denied");
            return navigation.goBack();
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        console.log("Platform not supported for permission request");
        return navigation.goBack();
      }
    };
    getCameraPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      // Check if cameraRef is not null
      try {
        const options = {
          quality: 0.5,
          base64: true,
          width: 1000, // Set a valid width
          height: 1000, // Set a valid height
        };
        const data = await cameraRef.current.takePictureAsync(options); // Use current property to access ref
        console.log(data.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };
  const startCall = async () => {
    // Code for starting the call
  };

  const endCall = () => {
    navigation.goBack();
    Alert.alert("Thông báo", "Cuộc gọi đã kết thúc");
    // Code for ending the call
  };

  add = () => {
    Alert.alert("Thông báo", "Chức năng đang phát triển");
  };

  const toggleMicrophone = () => {
    setIsMicrophoneMuted(!isMicrophoneMuted);
    // Code for toggling microphone
  };

  const toggleCamera = () => {
    setIsCameraMuted(!isCameraMuted);
    // Code for toggling camera
  };

  const flipCamera = () => {
    // Code for flipping the camera
  };

  const goBack = () => {
    navigation.goBack();
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.buttonheader} onPress={goBack}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonheader} onPress={flipCamera}>
            <MaterialIcons name="flip-camera-android" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Thêm avatar và tên của người được gọi dưới header */}
        <View style={styles.callerInfo}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://i.pravatar.cc/100" }}
          />
          <Text style={styles.callerName}>Caller Name</Text>
          <Text style={styles.callerName}>Đang đổ chuông...</Text>
        </View>
      </View>

      <Camera
        ref={cameraRef}
        style={styles.preview}
        type={Camera.Constants.Type.front} // Specify front camera
      />

      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCamera}>
            <MaterialCommunityIcons
              name={isCameraMuted ? "video-off-outline" : "video-outline"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Camera</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleMicrophone}>
            <FontAwesome
              name={isMicrophoneMuted ? "microphone-slash" : "microphone"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Mic</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonend} onPress={endCall}>
            <MaterialCommunityIcons
              name="phone-hangup"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Kết thúc</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={add}>
            <Entypo name="dots-three-horizontal" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Thêm</Text>
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
    flexDirection: "column", // Change this line
    alignItems: "center",
    padding: 10,
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

export default VideoCall;
