import { Text, FlatList, TouchableOpacity, Button } from "react-native";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Modal } from "@ui-kitten/components";
import { setForward } from "../redux/chatSlice";
import socket from "../services/socket";
import AvatarCustomer from "./AvatarCustomer";

const ForwardModal = () => {
  const forward = useSelector((state) => state.chat.forward);
  const { conversation } = useSelector((state) => state.conversation);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const chatLists = useMemo(
    () => conversation?.map((convers) => convers).filter(Boolean) || [],
    [conversation]
  );

  if (!forward.show) return null;

  const handleClose = () => {
    dispatch(setForward({ show: false, data: null }));
  };

  const handleForward = (IDPassConversation) => {
    const data = {
      IDPassConversation,
      IDUser: user.ID,
      IDMessageDetail: forward.data.IDMessageDetail,
    };

    socket.emit("pass_message", data);
    handleClose();
  };

  return (
    <Modal visible={forward.show} style={{ height: "60%", width: "80%" }}>
      <Card disabled={true}>
        <Text style={{ fontSize: 25, fontWeight: 600, textAlign: "center" }}>
          Chuyển tin đến
        </Text>
        <FlatList
          data={chatLists}
          keyExtractor={(item) => item.IDConversation}
          renderItem={({ item }) => (
            // <ItemFriend item={item} navigation={navigation} />
            <TouchableOpacity
              onPress={() => handleForward(item.IDConversation)}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <AvatarCustomer
                source={{ uri: item.Receiver.urlavatar }}
                style={{ width: 40, height: 40 }}
                resizeMode="cover"
                alt={item.Receiver.fullname}
              />
              <Text style={{ fontSize: 20, fontWeight: 600 }}>
                {item.Receiver.fullname}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={{
            width: "100%",
            margin: "0 auto",
            backgroundColor: "orange",
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={handleClose}
        >
          <Text style={{ textAlign: "center", color: "white", padding: 10 }}>
            Hủy
          </Text>
        </TouchableOpacity>
      </Card>
    </Modal>
  );
};

export default ForwardModal;
