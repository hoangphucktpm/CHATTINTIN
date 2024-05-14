import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerIcon: {
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "center",
    flexShrink: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "white",
    flexShrink: 0,
  },
  iconSeach: {
    margin: "auto",
    flexShrink: 0,
  },
  containerInput: {
    flexGrow: 1,
    flex: 1,
    marginRight: 10,
    marginTop: 5,
    flexShrink: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  containerTabBar: {
    height: "8%",
    padding: 5,
    backgroundColor: "#0091ff",
    display: "flex",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flexShrink: 0,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    // backgroundColor: "red",
    opacity: 0.5,
    zIndex: 9999,
    position: "absolute",
    top: -999,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    backgroundColor: "white",
  },
  mapContainer: {
    flex: 1,
  },
  resultsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1,
  },
  placeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  
});

export default styles;
