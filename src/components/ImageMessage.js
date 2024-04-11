import React from "react";
import { Image, Modal } from "react-native";

export const ViewImageFullScreen = ({ uri, open }) => (
  <Modal
    visible={this.state.modalVisible}
    transparent={true}
    onRequestClose={() => this.setState({ modalVisible: false })}
  >
    <ImageViewer imageUrls={IMAGES} />
  </Modal>
);

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
