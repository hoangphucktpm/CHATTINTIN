import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image, TouchableHighlight, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setGroupDetails } from "../../redux/groupSlice";
import { setForward, setPopup, setReply } from "../../redux/chatSlice";
import styles from "./StyleItemFriend";
import AvatarCustomer from "../../components/AvatarCustomer";

const ItemFriend = React.memo(({ navigation }) => {
  const { conversation } = useSelector((state) => state.conversation);

  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(conversation);
  }, [conversation]);

  const dispatch = useDispatch();

  const handleChat = useCallback(
    (item) => {
      // console.log(item);
      dispatch(setReply({ show: false, data: null }));
      dispatch(setGroupDetails(item));
      dispatch(setForward({ show: false, data: null }));
      dispatch(setPopup({ show: false, data: null }));
      navigation.navigate("Chat", item);
    },
    [dispatch, navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableHighlight
        onPress={() => handleChat(item)}
        underlayColor="#E6E6FA"
        style={styles.touchHightLight}
      >
        <View style={styles.container}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <AvatarCustomer
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: item.Receiver?.urlavatar }}
                alt={item.groupName || item.Receiver?.fullname}
              />
            </View>
          </View>
          <View style={styles.itemFriend_right}>
            <View style={styles.itemFriend_message}>
              <Text style={styles.itemFriend_name}>
                {item.Receiver?.fullname}
              </Text>
              {/* <Text style={styles.itemFriend_content}>
                {item.Receiver?.lastMessage}
              </Text> */}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    ),
    [handleChat]
  );

  if (!data) {
    return (
      <View>
        <Text style={{ textAlign: "center" }}>Chưa có tin nhắn</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
});

export default ItemFriend;
