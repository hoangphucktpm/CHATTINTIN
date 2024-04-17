import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    display: "flex",
    width: "100%",
    flex: 0.08,
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "#0091ff",
  },
  containerText: {
    flex: 0.8,
    justifyContent: "center",
  },
  text: {
    width: "100%",
    fontSize: 24,
    padding: 10,
    paddingLeft: 10,
    color: "white",
  },
  containerIcon: {
    justifyContent: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  containerBody: {
    flex: 0.92,
  },
  containerBodyHeader: {
    flex: 0.1,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
  },
  containerBodyHeader_Image: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    // paddingRight:15,
    // paddingLeft:15,
    // paddingTop:15,
    // paddingBottom:15,
    backgroundColor: "#DDDDDD",
    borderRadius: 100,
  },
  containerBodyHeader_Input: {
    flex: 0.8,
  },
  containerBodySearch: {
    flex: 0.1,
    justifyContent: "center",
  },
  containerBodySearchItem: {
    flex: 0.7,
    backgroundColor: "#DDDDDD",
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
  },
  flatList: {
    flex: 0.65,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  buttonCreate: {
    flex: 0.1,
    marginTop: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 5,
  },
  buttonCreateGroup: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: "#1C86EE",
    borderRadius: 100,
  },
});
export default styles;
