import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#0091ff",
  },
  searchIconContainer: {
    marginRight: 10,
  },
  searchInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "white",
  },
  rightIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  promptText: {
    fontSize: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
export default styles;
