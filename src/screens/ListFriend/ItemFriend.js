import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setGroupDetails } from "../../redux/groupSlice";
import { setForward, setPopup, setReply } from "../../redux/chatSlice";
import styles from "./StyleItemFriend";
import AvatarCustomer from "../../components/AvatarCustomer";
import socket from "../../services/socket";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const ItemFriend = React.memo(({ navigation }) => {
  const { conversation } = useSelector((state) => state.conversation);

  const [data, setdata] = useState([]);
  const user = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   if (!conversation || !conversation?.length) {
  //     user && socket.emit("load_conversations", { IDUser: user.ID });
  //   }
  //   console.log(2);
  // }, [conversation]);

  // useEffect(() => {
  //   console.log(1);
  //   setdata(conversation);
  // }, [conversation]);

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

  const isSended = (id) => id === user.ID;

  const renderItem = useCallback(
    ({ item }) => {
      // if (item?.isBlock) return;
      return (
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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={styles.itemFriend_name}>
                    {item.Receiver?.fullname}
                  </Text>
                  <Text>
                    {formatDistanceToNow(
                      new Date(item?.lastChange || item?.dateTime),
                      { addSuffix: true, locale: vi }
                    )}{" "}
                  </Text>
                </View>
                <Text style={styles.itemFriend_content}>
                  {isSended(item?.MessageDetail?.IDSender) && "Bạn: "}{" "}
                  {item?.MessageDetail?.type === "image"
                    ? "Hình ảnh"
                    : item?.MessageDetail?.type === "file"
                    ? "Tệp đính kèm"
                    : item?.MessageDetail?.type === "link"
                    ? "Đường dẫn"
                    : item?.MessageDetail?.type === "video"
                    ? "Video"
                    : item?.MessageDetail?.content}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    },
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
      data={conversation}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
});

export default ItemFriend;
