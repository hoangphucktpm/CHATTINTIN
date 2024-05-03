import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
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