import {
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../redux/chatSlice";
import { FontAwesome } from "@expo/vector-icons";
import { api } from "../apis/api";
import socket from "../services/socket";

const PopUpOptions = () => {
  const popupOptions = useSelector((state) => state.chat.popup);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setPopup({ show: false, data: null }));

  const user = useSelector((state) => state.auth.user);

  const handlePress = () => {
    if (item.IDSender !== user.ID) return;

    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn muốn thu hồi?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Có",
          onPress: () => {
            socket.emit("recallMessage", {
              IDMessageDetail: popupOptions.data.IDMessageDetail,
              IDReceiver: user.ID,
            });
            handleClose();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleRepply = () => {};

  const handleDelete = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn muốn xóa tin nhắn này?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            await api.deleteMessage(popupOptions.data.IDMessageDetail);
            handleClose();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={popupOptions.show}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#555",
              fontStyle: "italic",
              marginBottom: 15,
            }}
          >
            {popupOptions.data?.content?.length > 20
              ? popupOptions.data?.content.slice(0, 20) + "..."
              : popupOptions.data?.content}
          </Text>
          <TouchableOpacity
            onPress={handleRepply}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={styles.modalText}>Trả lời</Text>
            <FontAwesome name="reply" size={20} color="#0091ff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePress}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={styles.modalText}>Thu hồi</Text>
            <FontAwesome name="repeat" size={20} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={styles.modalText}>Xóa</Text>
            <FontAwesome name="trash" size={20} color="red" />
          </TouchableOpacity>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleClose}
          >
            <Text style={styles.textStyle}>Hủy</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    minWidth: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    width: 80,
    alignItems: "flex-start",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    alignSelf: "flex-start",
  },
});

export default PopUpOptions;
