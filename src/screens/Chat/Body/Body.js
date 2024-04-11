import React, { memo, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { setPopup } from "../../../redux/chatSlice";
import socket from "../../../services/socket";
import MessageItem from "../../../components/MessageItem";
import ImageMessage from "../../../components/ImageMessage";
// import VideoMessage from "../../../components/VideoMessage";
// import * as DocumentPicker from "expo-document-picker";

function Body({ isLoading }) {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
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

  const handleViewImage = (url) => {};

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            if (item?.type === "image")
              return (
                <TouchableOpacity
                  onLongPress={() => handleViewImage(item.content)}
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
                    display: "flex",
                    gap: 5,
                  }}
                >
                  <Text>VIDEO</Text>
                  {/* <VideoMessage uri={item.content} /> */}
                </TouchableOpacity>
              );
            return <MessageItem item={item} user={user} />;
          }}
          inverted={true}
        />
      )}
    </View>
  );
}

export default memo(Body);
