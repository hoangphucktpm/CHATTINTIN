import { FlatList, Image, ScrollView, Text, View } from "react-native";
import React, { Component, useEffect, useRef, useState } from "react";
import styles from "./stylesBody";
import MessageItem from "./MessageItem";
import MyMessagaItem from "./MyMessagaItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import socket from "../../../services/socket";
import { setMessages } from "../../../redux/chatSlice";
import { format } from "date-fns";

function Body({ id, owner }) {
  const { messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const user = useSelector((state) => state.auth);

  const [messagesData, setMessagesData] = useState([]);

  useEffect(() => {
    setMessagesData(messages);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesData((prev) => [...prev, data]);
      console.log(1231);
    });
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.messages}>
      {messagesData.map((item, i) => (
        <View
          key={i}
          style={{
            margin: 10,
            padding: 10,
            alignSelf: item.IDSender !== user.ID ? "flex-end" : "flex-start",
            backgroundColor: item.IDSender !== user.ID ? "#0094FF" : "#fff",
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
              color: item.IDSender !== user.ID ? "white" : "black",
            }}
          >
            {item.content}
          </Text>
          <Text
            style={{
              ...styles.time,
              color: item.IDSender !== user.ID ? "white" : "black",
            }}
          >
            {format(item.dateTime, "HH:mm:s")}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
export default Body;
