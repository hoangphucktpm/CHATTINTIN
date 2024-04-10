import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "white",
  },
  containerInput: {
    flex: 1,
    marginRight: 10,
    marginTop: 5,
  },
  container: {
    display: "flex",
    width: "100%",
    height: "10%",
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "#0091ff",
  },
  containerIcon: {
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "center",
  },
  iconSeach: {
    margin: "auto",
  },
  containerIconRight: {
    width: "22%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  containerIconAdd: {
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  containerIconQR: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});
export default styles;
