import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  rtcView: {
    width: '100%', //dimensions.width,
    height: '50%', //dimensions.height / 2,
    backgroundColor: 'gray',
  },
  rtcViewCall: {
    width: 0,
    height: 0,
  },
  callerInfo: {
    flexDirection: "column", // Change this line
    alignItems: "center",
    padding: 50,
    justifyContent: "center",
  },
  callerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countTime: {
    fontSize: 16,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // Remove marginRight
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
    fontSize: 16,
    fontWeight: "600",
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

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },

  button: {
    // backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: "5%",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30, // Để biến button thành hình tròn,
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

export default styles;