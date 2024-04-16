import React from "react";
import { Modal, Image, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setViewFullImage } from "../redux/chatSlice";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const ViewImageFullScreen = () => {
  const tete = useSelector((state) => state.chat.viewFullImage);
  const dispatch = useDispatch();

  const handleClose = () => {
    // dispatch(setViewFullImage({ show: false, data: null }));
  };
  return (
    <Modal
      visible={tete.show}
      transparent={false}
      onRequestClose={handleClose}
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={{ uri: tete.data }} style={styles.image} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: "50%",
    width: windowWidth,
    height: 200,
  },
});

const ImageMessage = ({ url }) => {
  if (!url) return null;
  return (
    <Image
      resizeMode="cover"
      source={{ uri: url }}
      style={{
        width: 200,
        height: 100,
        borderRadius: 5,
      }}
    />
  );
};

export default ImageMessage;
