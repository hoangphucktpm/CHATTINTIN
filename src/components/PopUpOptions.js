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
  
  const PopUpOptions = () => {
    const popupOptions = useSelector((state) => state.chat.popup);
  
    const dispatch = useDispatch();
  
    const handleClose = () => dispatch(setPopup({ show: false, data: null }));
  
    const handlePress = () => {
      Alert.alert(
        "Thông báo",
        "Bạn có chắc chắn muốn xóa?",
        [
          {
            text: "Không",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Có", onPress: () => handleClose() },
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
            <TouchableOpacity>
              <Text style={styles.modalText}>Trả lời</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.modalText}>Thu hồi</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalText}>Chuyển tiếp</Text>
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
      marginBottom: 15,
      textAlign: "center",
    },
  });
  
  export default PopUpOptions;