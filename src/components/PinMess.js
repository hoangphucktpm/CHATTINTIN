import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const PinMess = () => {
  return (
    <TouchableOpacity style={{ padding: 1, margin: 5 }}>
      <Text style={{ color: "blue", fontWeight: 600 }}>
        Tin nhắn đã ghim #1
      </Text>
      <Text style={{ color: "blue", fontWeight: 600 }}>
        Noi dung tin nhan ghim
      </Text>
    </TouchableOpacity>
  );
};

export default PinMess;
