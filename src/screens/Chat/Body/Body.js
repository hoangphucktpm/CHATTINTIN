import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import styles from "./stylesBody";
import MessageItem from "./MessageItem";
import MyMessagaItem from "./MyMessagaItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import socket from "../../../services/socket";
import { setMessages, setPopup } from "../../../redux/chatSlice";
import { format } from "date-fns";

function Body({ id, owner }) {
  const { messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const { user } = useSelector((state) => state.auth);

  const [messagesData, setMessagesData] = useState([]);

  useEffect(() => {
    setMessagesData(messages);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesData((prev) => [...prev, data]);
    });
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const reverseData = useMemo(() => {
    const currentMessages = [...messagesData];
    currentMessages.reverse();
    return currentMessages;
  }, [messagesData]);

  const handleLongPress = (item) => {
    dispatch(
      setPopup({
        show: true,
        data: item,
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={(ref) => (scrollViewRef.current = ref)}
        data={reverseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleLongPress(item)}
            style={{
              margin: 10,
              padding: 10,
              alignSelf: item.IDSender === user.ID ? "flex-end" : "flex-start",
              backgroundColor: item.IDSender === user.ID ? "#0094FF" : "#fff",
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
                color: item.IDSender === user.ID ? "white" : "black",
              }}
            >
              {item.content}
            </Text>
            <Text
              style={{
                ...styles.time,
                color: item.IDSender === user.ID ? "white" : "black",
              }}
            >
              {format(item.dateTime, "HH:mm:s")}
            </Text>
          </TouchableOpacity>
        )}
        inverted={true}
      />
    </View>
  );
}
export default Body;
