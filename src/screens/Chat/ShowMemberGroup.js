import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

function MemberGroup() {
    const navigator = useNavigation();
  
    const renderBackAction = () => {
      navigator.goBack();
    };
  
    const item = {
      name: 'Phúc',
      time: '2 giờ',
      image: 'https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg',
    };
 
  
    const renderItem = (item) => {
      var imageItem = item.image;
      return (
          <View style={{ height: 60, display: 'flex', flexDirection: 'row', flex: 1, marginBottom: 20, }}>
              <View style={{ flex: 0.05, justifyContent: 'center', alignItems: 'center' }} ></View>
              <View style={{ flex: 0.15, }}>
                  <Image source={{ uri: imageItem }} style={{ borderRadius: 100, height: 50, width: 50, }} />
                  <View style={{ height: 20, alignItems: 'flex-end' }}>
                      <Entypo name="key" size={18} color="#CDAD00" />
                  </View>
              </View>
              <View style={{ flex: 0.8, marginLeft: 10, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 22, }}>{item.name}</Text>
                  <Text style={{ fontSize: 18, color: "grey" }}>{item.time}</Text>
              </View>
          </View>
      );
    };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerIcon}>
          <TouchableOpacity style={styles.button}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={renderBackAction}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>Thành viên</Text>
        </View>

        <View style={styles.buttonCreate}>
          <AntDesign name="addusergroup" size={24} color="white" />
        </View>
      </View>
      <View style={styles.containerBody}>{renderItem(item)}</View>
    </SafeAreaView>
  );
}


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
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
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
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
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

  buttonCreate: {
    flex: 0.15,
    marginRight: 20,
    marginLeft: 20,
    alignItems: "flex-end",
    justifyContent: "center",
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

export default MemberGroup;
