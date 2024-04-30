import React from "react";
import { Image } from "react-native";

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
