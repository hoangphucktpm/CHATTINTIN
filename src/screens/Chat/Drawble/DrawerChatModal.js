import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerModal } from "../../../redux/chatSlice";
import ItemGroupModal from "./ItemGroupModal";
import socket from "../../../services/socket";

const DrawerChatModal = () => {
  const { data, show, selection } = useSelector(
    (state) => state.chat.drawerModal
  );
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch((state) => state.chat.drawerModal);

  const onClose = () => {
    dispatch(
      setDrawerModal({
        show: false,
        data: [],
        selection: false,
      })
    );
  };

  const handleAddToGroup = (IDConversation) => {
    if (!selection) return;
    socket.emit("add_member_to_group", {
      IDConversation: IDConversation,
      IDUser: user.IDUser,
      groupMembers: [selection],
    });
    onClose();
  };

  return (
    <Layout style={styles.container} level="1">
      <Modal visible={show}>
        <Card disabled={true}>
          <View style={{ maxHeight: 300 }}>
            {data?.length ? (
              data.map((group) => {
                return (
                  <View key={group.IDConversation}>
                    <ItemGroupModal
                      handleAddToGroup={() =>
                        handleAddToGroup(group.IDConversation)
                      }
                      name={group.groupName}
                      avatar={group.groupAvatar}
                    />
                  </View>
                );
              })
            ) : (
              <Text style={{ textAlign: "center" }} category="h6">
                Không còn nhóm để thêm!!
              </Text>
            )}
          </View>
          <Button onPress={onClose}>Đóng</Button>
        </Card>
      </Modal>
    </Layout>
  );
};

export default DrawerChatModal;
const styles = StyleSheet.create({});
