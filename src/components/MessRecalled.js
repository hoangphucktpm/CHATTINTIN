import { View, Text } from "react-native";
import React from "react";

const MessRecalled = () => {
  return (
    <View
      style={{
        display: "flex",
        borderColor: "gray",
        borderStyle: "solid",
        borderWidth: 1,
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 10,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          fontStyle: "italic",
          color: "gray",
        }}
      >
        Tin nhắn đã bị thu hồi
      </Text>
    </View>
  );
};

export default MessRecalled;
