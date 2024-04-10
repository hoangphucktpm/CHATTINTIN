import { StyleSheet } from "react-native";
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
  containerText: {
    height: "5%",
    backgroundColor: "#F5FFFA",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerInput: {
    marginTop: 20,
    width: "100%",
    marginBottom: 20,
    display: "flex",
    backgroundColor: "#fff",
  },
  containerBottom: {
    // nằm ở dưới cùng
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
  },
  containerItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
    backgroundColor: "#fff",
  },

  bottom: {
    flex: 1,
    height: 60,
    backgroundColor: "#fff",
    marginBottom: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 60,
    marginLeft: 60,
  },
  itemFriend_avatar: {
    marginLeft: 15,
  },
  itemFriend_avatar_avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  itemFriend_info: {
    display: "flex",
    flexDirection: "row",
  },
  itemFriend_right: {
    marginLeft: 20,
  },
  touchHightLight: {
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default styles;
