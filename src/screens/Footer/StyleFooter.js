import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "8%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    bottom: 0,
  },
  containerIcon: {
    justifyContent: "center",
  },
  textIcon: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    paddingTop: 3,
    fontFamily: "Times New Roman",
  },
});

export default styles;
