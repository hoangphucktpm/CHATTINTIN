import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/chatSlice";
import ImageMessage from "./ImageMessage";
import VideoMessage from "./VideoMessage";
import { A } from "@expo/html-elements";
import { MaterialIcons } from "@expo/vector-icons";

const MessageItem = ({ item, user }) => {
  const dispatch = useDispatch();

  if (item?.isRemove) return null;

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

  if (item.isRecall) {
    return (
      <View
        style={{
          // margin: 10,
          alignSelf: getItemAlignment(item),
          backgroundColor: getItemBackgroundColor(item),
          borderRadius: 8,
          marginBottom: 5,
          maxWidth: "70%",
          display: "flex",
          gap: 5,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontStyle: "italic",
            color: getItemTextColor(item),
          }}
        >
          Tin nhắn đã bị thu hồi
        </Text>
      </View>
    );
  }

  if (item.type === "image")
    return (
      <TouchableOpacity
        onPress={() => handleShowFullImage(item.content)}
        style={{
          margin: 10,
          alignSelf: getItemAlignment(item),
          backgroundColor: getItemBackgroundColor(item),
          borderRadius: 8,
          marginBottom: 5,
          maxWidth: "70%",
          display: "flex",
          gap: 5,
        }}
      >
        <ImageMessage url={item.content} />
        <MessageItem item={item} user={user} />
        <Text style={{ color: getItemTextColor(item), fontSize: 12 }}>
          {format(item.dateTime, "HH:mm:s")}
        </Text>
      </TouchableOpacity>
    );

  if (item?.type === "video")
    return (
      <View
        style={{
          margin: 10,
          alignSelf: getItemAlignment(item),
          backgroundColor: getItemBackgroundColor(item),
          borderRadius: 8,
          marginBottom: 5,
          maxWidth: "70%",
        }}
      >
        <VideoMessage uri={item.content} />
        <MessageItem item={item} user={user} />
        <Text style={{ color: getItemTextColor(item), fontSize: 12 }}>
          {format(item.dateTime, "HH:mm:s")}
        </Text>
      </View>
    );

  if (item.type === "file") {
    return (
      <View
        style={{
          margin: 10,
          alignSelf: getItemAlignment(item),
          backgroundColor: getItemBackgroundColor(item),
          borderRadius: 8,
          marginBottom: 5,
          maxWidth: "70%",
          display: "flex",
          gap: 5,
          padding: 5,
          fontSize: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="download"
            size={20}
            color={item.IDSender === user.ID ? "white" : "black"}
          />
          <A
            href={item.content}
            style={{
              color: getItemTextColor(item),
              textDecorationLine: "none",
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            Download file
          </A>
        </View>
        <Text style={{ color: getItemTextColor(item) }}>
          {format(item.dateTime, "HH:mm:s")}
        </Text>
      </View>
    );
  }

  if (item.type === "link")
    return (
      <View
        style={{
          margin: 10,
          alignSelf: getItemAlignment(item),
          backgroundColor: getItemBackgroundColor(item),
          borderRadius: 8,
          marginBottom: 5,
          maxWidth: "70%",
          display: "flex",
          gap: 5,
          padding: 5,
          fontSize: 20,
        }}
      >
        <A
          href={item.content}
          style={{
            color: getItemTextColor(item),
            textDecorationLine: "underline",
            fontStyle: "italic",
          }}
        >
          {item.content}
        </A>
        <Text style={{ color: getItemTextColor(item) }}>
          {format(item.dateTime, "HH:mm:s")}
        </Text>
      </View>
    );

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
      <Text style={{ color: getItemTextColor(item), fontSize: 12 }}>
        {format(item.dateTime, "HH:mm:s")}
      </Text>
    </TouchableOpacity>
  );
};

export default MessageItem;
