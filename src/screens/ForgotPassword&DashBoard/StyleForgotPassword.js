import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  containerTabBar: {
    height: "8%",
    padding: 5,
    backgroundColor: "#1E90FF",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  containerText: {
    height: "5%",
    backgroundColor: "#F5FFFA",
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    alignItems: "center",
  },

  containerBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingTop: 60,
    paddingLeft: 100,
  },
  bottom: {
    padding: 20,
    backgroundColor: "#1C86EE",
    borderRadius: 100,
    alignItems: "center",
  },
});

export default styles;
