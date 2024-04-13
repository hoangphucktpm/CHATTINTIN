import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/chatSlice";

const MessageItem = ({ item, user }) => {
  const dispatch = useDispatch();
  const handleLongPress = (item) => {
    dispatch(setPopup({ show: true, data: item }));
  };

  const getItemAlignment = (item) => {
    return item.IDSender === user.ID ? "flex-end" : "flex-start";
  };

  const getItemBackgroundColor = (item) => {
    return item.IDSender === user.ID ? "#0094FF" : "#fff";
  };
  const getItemTextColor = (item) => {
    return item.IDSender === user.ID ? "white" : "black";
  };
  return (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={{
        margin: 10,
        padding: 10,
        alignSelf: getItemAlignment(item),
        backgroundColor: getItemBackgroundColor(item),
        borderRadius: 8,
        marginBottom: 5,
        maxWidth: "70%",
        display: "flex",
        gap: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: getItemTextColor(item),
        }}
      >
        {item.content}
      </Text>
      <Text style={{ color: getItemTextColor(item) }}>
        {format(item.dateTime, "HH:mm:s")}
      </Text>
    </TouchableOpacity>
  );
};

export default MessageItem;
