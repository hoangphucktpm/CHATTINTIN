import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "white",
    flexShrink: 0,
  },
  containerInput: {
    flex: 1,
    marginRight: 10,
    marginTop: 5,
    flexShrink: 0,
  },
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#0091ff",
    paddingVertical: 10,
    alignItems: "center",
  },
  containerIcon: {
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "center",
    flexShrink: 0,
  },
  iconSeach: {
    margin: "auto",
    flexShrink: 0,
  },
  containerIconRight: {
    width: "22%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexShrink: 0,
    alignItems: "center",
  },
  containerIconAdd: {
    justifyContent: "center",
    flexShrink: 0,
  },
  containerIconQR: {
    justifyContent: "center",
    flexShrink: 0,
  },
});
export default styles;
