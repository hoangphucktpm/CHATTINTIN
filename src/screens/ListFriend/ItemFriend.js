import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useMemo, useCallback } from "react";
import styles from "./StyleItemFriend";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setGroupDetails } from "../../redux/groupSlice";
import { setForward, setPopup, setReply } from "../../redux/chatSlice";

const ItemFriend = React.memo(({ navigation }) => {
  const { conversation } = useSelector((state) => state.conversation);

  const chatLists = useMemo(() => {
    return conversation?.filter(Boolean) || [];
  }, [conversation]);

  const dispatch = useDispatch();

  const handleChat = useCallback(
    (item) => {
      dispatch(setReply({ show: false, data: null }));
      dispatch(setGroupDetails(item));
      dispatch(setForward({ show: false, data: null }));
      dispatch(setPopup({ show: false, data: null }));
      navigation.navigate("Chat", item);
    },
    [dispatch, navigation]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <TouchableHighlight
          onPress={() => handleChat(item)}
          underlayColor={"#E6E6FA"}
          style={styles.touchHightLight}
        >
          <View style={styles.container}>
            <View style={styles.itemFriend_info}>
              <View style={styles.itemFriend_avatar}>
                <Image
                  style={styles.itemFriend_avatar_avatar}
                  source={{ uri: item.Receiver.urlavatar }}
                />
              </View>
            </View>
            <View style={styles.itemFriend_right}>
              <View style={styles.itemFriend_message}>
                <Text style={styles.itemFriend_name}>
                  {item.Receiver.fullname}
                </Text>
                <Text style={styles.itemFriend_content}>
                  {item.Receiver.lastMessage}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    },
    [handleChat]
  );

  const deleteGroupHandleClick = useCallback(() => {
    console.log("Delete action clicked");
  }, []);

  const GhimHandleClick = useCallback(() => {
    console.log("Ghim action clicked");
  }, []);

  const renderHideItem = useCallback(() => {
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
            style={styles.rowBackRight_Right}
            onPress={deleteGroupHandleClick}
          >
            <AntDesign name="delete" size={24} color="white" />
            <Text style={styles.txtItemRowBack}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [GhimHandleClick, deleteGroupHandleClick]);

  return !chatLists.length ? (
    <View>
      <Text style={{ textAlign: "center" }}>Chưa có tin nhắn</Text>
    </View>
  ) : (
    <FlatList
      data={chatLists}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
});

export default ItemFriend;
