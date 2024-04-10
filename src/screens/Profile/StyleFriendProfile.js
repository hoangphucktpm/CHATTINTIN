import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },

  containerTabBar: {
    height: "8%",
    padding: 5,
    backgroundColor: "#1E90FF",
    display: "flex",
    flexDirection: "row",
  },
  containerBody: {
    display: "flex",
    flexDirection: "column",
  },
  containerBody_Top: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    height: 250,
    paddingTop: 50,
  },
  containerBody_Top_Avt: {
    height: 100,
    width: 100,
    marginTop: 15,
    borderRadius: 100,
  },
  containerBody_Top_Icon: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
  containerBody_Top_Icon_IconItem: {
    height: 40,
    width: 40,
    backgroundColor: "#DCDCDC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  containerBody_Top_Icon_IconText: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBody_Top_Icon_Icon: {
    alignItems: "center",
  },
  containerBody_Mid: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    height: 500,
  },
  containerBody_Mid_Bottom: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  containerBody_Mid_Bottom_Item: {
    display: "flex",
    flexDirection: "row",
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#1E90FF",
    borderRadius: 10,
  },
  bottom1: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#1E90FF",
    borderRadius: 10,
  },
});
export default styles;
