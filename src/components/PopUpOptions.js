import {
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
  Pressable,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setForward,
  setMessages,
  setPopup,
  setReply,
  updateMessages,
} from "../redux/chatSlice";
import { FontAwesome } from "@expo/vector-icons";
import { api } from "../apis/api";
import socket from "../services/socket";
import * as FileSystem from "expo-file-system";
import { Permissions } from "expo";
import * as MediaLibrary from "expo-media-library";

const PopUpOptions = ({ setMessageData }) => {
  const popupOptions = useSelector((state) => state.chat.popup);
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

  const dispatch = useDispatch();

  const allowDown =
    popupOptions.data?.type === "image" || popupOptions.data?.type === "video";

  if (!popupOptions.show) return null;

  const handleClose = () => dispatch(setPopup({ show: false, data: null }));

  const handlePress = () => {
    if (popupOptions.data.IDSender !== user.ID) return;

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

  const handleReply = () => {
    dispatch(
      setReply({
        show: true,
        data: popupOptions.data,
      })
    );
    handleClose();
  };

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
            setMessageData((prev) => {
              const newData = prev.map((item) => {
                if (
                  item.IDMessageDetail === popupOptions.data.IDMessageDetail
                ) {
                  return { ...item, isRemove: true };
                }
                return item;
              });
              return newData;
            });
            handleClose();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDown = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const fileUri =
          FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;
        const { uri } = await FileSystem.downloadAsync(
          popupOptions.data.content,
          fileUri
        );
        await saveFile(uri);
        Alert.alert("Download", "Tải xuống thành công");
        handleClose();
      } else {
        console.log("Permission denied");
      }
    } catch (err) {
      console.log("Download Error: ", err);
    }
  };

  const saveFile = async (fileUri) => {
    try {
      // Ensure MEDIA_LIBRARY permission is granted
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      if (!mediaLibraryPermission.granted) {
        console.log("Permission to access media library denied");
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album === null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      console.log("File saved successfully.");
    } catch (err) {
      console.log("Save Error: ", err);
    }
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
            onPress={handleReply}
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
            onPress={() => {
              dispatch(
                setForward({
                  show: true,
                  data: popupOptions.data,
                })
              );
              handleClose();
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={styles.modalText}>Chuyển tiếp</Text>
            <FontAwesome name="send-o" size={20} color="green" />
          </TouchableOpacity>
          {popupOptions.data.userSender.ID === user.ID && (
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
          )}
          {allowDown && (
            <TouchableOpacity
              onPress={handleDown}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={styles.modalText}>Tải xuống</Text>
              <FontAwesome name="download" size={20} color="orange" />
            </TouchableOpacity>
          )}

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
