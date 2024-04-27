import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/chatSlice";
import { A } from "@expo/html-elements";
import { MaterialIcons } from "@expo/vector-icons";
import ImageMessage from "./ImageMessage";
import VideoMessage from "./VideoMessage";

const MessageItem = ({ item, user }) => {
  const dispatch = useDispatch();

  if (item?.isRemove) return null;

  const handleLongPress = () => {
    dispatch(setPopup({ show: true, data: item }));
  };

  const getItemAlignment = () => {
    return item.IDSender === user.ID ? "flex-end" : "flex-start";
  };

  const getItemBackgroundColor = () => {
    return item.IDSender === user.ID ? "#0094FF" : "#fff";
  };

  const getItemTextColor = () => {
    return item.IDSender === user.ID ? "white" : "black";
  };

  return (
    <View
      style={{
        margin: 10,
        alignSelf: getItemAlignment(),
        backgroundColor: getItemBackgroundColor(),
        borderRadius: 8,
        marginBottom: 5,
        maxWidth: "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {item.isRecall ? (
        <Text
          style={{
            fontStyle: "italic",
            color: getItemTextColor(),
            padding: 5,
          }}
        >
          Tin nhắn đã bị thu hồi
        </Text>
      ) : item.type === "image" ? (
        <TouchableOpacity
          onPress={() => handleShowFullImage(item.content)}
          style={{ padding: 5 }}
        >
          <ImageMessage url={item.content} />
        </TouchableOpacity>
      ) : item.type === "video" ? (
        <VideoMessage uri={item.content} />
      ) : item.type === "file" ? (
        <View style={{ padding: 5 }}>
          <MaterialIcons name="download" size={20} color={getItemTextColor()} />
          <A
            href={item.content}
            style={{
              color: getItemTextColor(),
              textDecorationLine: "none",
              fontStyle: "italic",
              fontWeight: "600",
            }}
          >
            Download file
          </A>
        </View>
      ) : item.type === "link" ? (
        <View style={{ padding: 5 }}>
          <A
            href={item.content}
            style={{
              color: getItemTextColor(),
              textDecorationLine: "underline",
              fontStyle: "italic",
            }}
          >
            {item.content}
          </A>
        </View>
      ) : (
        <TouchableOpacity onLongPress={handleLongPress} style={{ padding: 5 }}>
          <Text
            style={{
              fontSize: 20,
              color: getItemTextColor(),
            }}
          >
            {item.content}
          </Text>
        </TouchableOpacity>
      )}
      <Text
        style={{
          color: getItemTextColor(),
          fontSize: 10,
          alignSelf: "flex-end",
          padding: 5,
          paddingTop: 0,
        }}
      >
        {format(item.dateTime, "HH:mm:s")}
      </Text>
    </View>
  );
};

export default MessageItem;
