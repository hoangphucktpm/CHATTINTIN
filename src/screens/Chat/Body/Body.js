import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "../../../components/MessageItem";
import ImageMessage, {
  ViewImageFullScreen,
} from "../../../components/ImageMessage";
import VideoMessage from "../../../components/VideoMessage";
import { SimpleLineIcons } from "@expo/vector-icons";
import socket from "../../../services/socket";
import { Ionicons } from "@expo/vector-icons";
import {
  setPopup,
  setViewFullImage,
  updateMessages,
} from "../../../redux/chatSlice";
import { A } from "@expo/html-elements";
import { format } from "date-fns";
import { Icon } from "react-native-paper";
function Body({ isLoading, messageData }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getItemAlignment = (item) => {
    return item.IDSender === user.ID ? "flex-end" : "flex-start";
  };

  const getItemBackgroundColor = (item) => {
    return item.IDSender === user.ID ? "#0094FF" : "#fff";
  };

  const getItemTextColor = (item) => {
    return item.IDSender === user.ID ? "white" : "black";
  };

  const handleDownload = (url) => {
    Linking.openURL(url);
  };

  const handleLongPress = (item) => {
    if (item.IDSender !== user.ID) return;
    dispatch(setPopup({ show: true, data: item }));
  };

  const handleShowFullImage = (url) => {
    dispatch(setViewFullImage({ show: true, data: url }));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item?.isRemove) return null;
          if (item.isRecall)
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

          if (item?.type === "image")
            return (
              <TouchableOpacity
                onPress={() => handleShowFullImage(item.content)}
                onLongPress={() => handleLongPress(item)}
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
              </TouchableOpacity>
            );
          if (item?.type === "video")
            return (
              <TouchableOpacity
                onLongPress={() => handleLongPress(item)}
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
              </TouchableOpacity>
            );

          if (item?.type === "file")
            return (
              <TouchableOpacity
                onLongPress={() => handleLongPress(item)}
                onPress={() => handleDownload(item.content)}
                style={{
                  margin: 10,
                  alignSelf: getItemAlignment(item),
                  backgroundColor: getItemBackgroundColor(item),
                  borderRadius: 8,
                  marginBottom: 5,
                  maxWidth: "70%",
                  padding: 5,
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Ionicons name="document" size={50} color={getItemTextColor(item)} /> 
                <Text style={{ color: getItemTextColor(item) }}>{item.fileName}</Text>
                <Text style={{ color: getItemTextColor(item) }}>Tải xuống</Text>
                <SimpleLineIcons
                  name="cloud-download"
                  size={24}
                  color={getItemTextColor(item)}
                />
              </TouchableOpacity>
            );

          if (item?.type === "link")
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
                  onLongPress={() => handleLongPress(item)}
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

          return <MessageItem item={item} user={user} />;
        }}
        inverted={true}
      />
    </View>
  );
}

export default Body;
