import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";

const ChatWithLink = (props) => {
  const { title, desciption, image, url } = props;

  const handleView = () => {
    Linking.openURL(image);
  };
  return (
    <TouchableOpacity
      onPress={handleView}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: 200,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
        gap: 5,
      }}
    >
      <Image
        source={{ uri: image }}
        width={"100%"}
        height={100}
        resizeMode="cover"
      />
      <Text style={{ fontWeight: 600, fontSize: 20 }}>{title}</Text>
      <Text>
        {desciption.length > 100
          ? desciption.slice(0, 100) + "..."
          : desciption}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatWithLink;
