import { StyleSheet } from "react-native";

export const stylesBody = StyleSheet.create({
  container: {
    backgroundColor: "#EEE0E5",
    flex: 1,
    padding: 10,
  },
  chatItemRight: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    justifyContent: "flex-end",
    maxWidth: "60%",
    borderRadius: 10,
    backgroundColor: "#E5EFFF",
    padding: 10,
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    paddingRight: 20,
  },
  messageText: {
    fontSize: 16,
  },
  time: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
});

export default stylesBody;