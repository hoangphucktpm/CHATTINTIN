import { Platform, StatusBar, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  containerTabBar: {
    height: "8%",
    padding: 5,
    backgroundColor: "#1E90FF",
    display: "flex",
    flexDirection: "row",
  },

  containerInput: {
    marginTop: 20,
    flex: 0.4,
    justifyContent: "center",
  },
  containerText: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  containerBottom: {
    flex: 0.1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 10,
  },
  bottom: {
    flex: 1,
    height: 60,
    backgroundColor: "#1C86EE",
    marginBottom: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 60,
    marginLeft: 60,
  },
});

export default styles;
