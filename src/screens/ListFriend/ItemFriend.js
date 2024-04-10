import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "./StyleItemFriend";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

const ItemFriend = ({ navigation }) => {
  const [chatLists, setChatLists] = useState([]);

  // Function to handle delete action
  const deleteGroupHandleClick = () => {
    // Implement delete action here
    console.log("Delete action clicked");
  };

  // Function to handle Ghim action
  const GhimHandleClick = () => {
    // Implement Ghim action here
    console.log("Ghim action clicked");
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
      >
        <View style={styles.container}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <Image
                style={styles.itemFriend_avatar_avatar}
                source={{
                  uri: "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
                }}
              />
            </View>
          </View>
          <View style={styles.itemFriend_right}>
            <View style={styles.itemFriend_message}>
              <Text style={styles.itemFriend_name}>{item.name}</Text>
              <Text style={styles.itemFriend_content}>{item.lastMessage}</Text>
            </View>
            <View style={styles.itemFriend_timeBlock}>
              <Text style={styles.itemFriend_time}>1 phút trước</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const HiddenItemWithActions = () => {
    return (
      <View style={styles.rowBack}>
        <View style={styles.rowBackLeft}></View>
        <View style={styles.rowBackRight}>
          <View style={styles.rowBackRight_Left}>
            <Feather name="more-horizontal" size={24} color="white" />
            <Text style={styles.txtItemRowBack}>Thêm</Text>
          </View>
          <TouchableOpacity
            style={styles.rowBackRight_Mid}
            onPress={GhimHandleClick}
          >
            <AntDesign name="pushpino" size={24} color="white" />
            <Text style={styles.txtItemRowBack}>Ghim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteGroupHandleClick}
            style={styles.rowBackRight_Right}
          >
            <AntDesign name="delete" size={24} color="white" />
            <Text style={styles.txtItemRowBack}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHideItem = ({ item, index }) => {
    return <HiddenItemWithActions />;
  };

  return !chatLists.length ? (
    <View>
      <Text style={{ textAlign: "center" }}>Chưa có tin nhắn</Text>
    </View>
  ) : (
    <SwipeListView
      nestedScrollEnabled={true}
      data={chatLists}
      renderItem={renderItem}
      renderHiddenItem={renderHideItem}
      rightOpenValue={-230}
    />
  );
};

export default ItemFriend;
