import { Platform, StatusBar, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    // width: '100%',
    borderColor: "#ccc",
    flexDirection: "row",
    backgroundColor: "#0091ff",
    height: 50,
    alignItems: "center",
  },

  container_left: {
    width: "70%",
    flexDirection: "row",
    alignContent: "center",
  },
  containerIcon: {
    justifyContent: "flex-end",
    justifyContent: "center",
  },
  container_friend_Name: {
    paddingLeft: 5,
    width: "88%",
    justifyContent: "flex-end",
    justifyContent: "center",
  },
  friend_Name: {
    color: "white",
    fontSize: 24,
  },
  iconSeach: {
    margin: "auto",
  },
  container_right: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  container_right_icon: {
    justifyContent: "flex-end",
    paddingBottom: 8,
    paddingRight: 70,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonMenu: {
    backgroundColor: "red",
  },
});

export default styles;
