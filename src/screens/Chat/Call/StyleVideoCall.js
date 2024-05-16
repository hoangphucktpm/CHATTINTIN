import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  rtcView: {
    width: "100%",
    height: "50%",
    backgroundColor: "gray",
  },
  rtcViewCall: {
    width: 0,
    height: 0,
  },
  callerInfo: {
    flexDirection: "column",
    alignItems: "center",
    padding: 50,
    justifyContent: "center",
  },
  callerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  countTime: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  localVideo: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 2,
    margin: 16,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  iconLabel: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: "#4CAF50",
    fontStyle: "Bold",
  },
  cameraPaused: {
    opacity: 0.5,
  },
  remoteVideo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
    borderWidth: 2,
    borderColor: "#4CAF50",
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
    position: "absolute", // make the buttons overlay on the video
    bottom: 0, // position it at the bottom
    width: "100%", // make sure it spans the full width
    flexDirection: "row", // keep the buttons in a row
    justifyContent: "space-around", // distribute buttons evenly
    backgroundColor: "#f2f2f2", // keep the existing background color
    padding: 10, // keep the existing padding
  },
  button: {
    marginBottom: "5%",
    width: 50, // reduce button width
    height: 50, // reduce button height
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // adjust border radius to keep it circular
    backgroundColor: "#4CAF50",
  },
  buttonend: {
    backgroundColor: "#f44336",
    width: 50, // reduce button width
    height: 50, // reduce button height
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // adjust border radius to keep it circular
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    padding: 10,
    fontSize: 18,
  },
});

export default styles;
