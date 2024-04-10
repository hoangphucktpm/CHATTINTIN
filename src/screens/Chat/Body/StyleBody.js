import { StyleSheet } from "react-native";

const stylesBody = StyleSheet.create({
  container: {
    backgroundColor: "#EEE0E5",
    flex: 1,
    padding: 10,
  },
  chatItemRight: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    maxWidth: "60%",
    borderRadius: 10,
    backgroundColor: " #FFC0CB",
    padding: 10,
  },
  messageContainer: {
    backgroundColor: "#FFC0CB",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    paddingRight: 20,
  },
  messageText: {
    Bottom: 10,
    fontSize: 16,
  },
});

export default stylesBody;
