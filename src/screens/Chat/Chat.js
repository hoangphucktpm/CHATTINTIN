import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { setMessages, updateMessages } from "../../redux/chatSlice";
import PopUpOptions from "../../components/PopUpOptions";
import socket from "../../services/socket";
import { ViewImageFullScreen } from "../../components/ImageMessage";
import BlurViewMessage from "../../components/BlurView";

function Chat({ route }) {
  const { ID, fullname, urlavatar, owner } = route.params;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { conversation } = useSelector((state) => state.conversation);
  const popupOptions = useSelector((state) => state.chat.popup);
  const [messageData, setMessageData] = useState([]);

  async function fetchMessages() {
    try {
      dispatch(setMessages([])); // Clear previous messages
      if (!conversation.length) return;
      const IDConversation = conversation.find(
        (convers) => convers.IDReceiver === ID
      )?.IDConversation;
      if (!IDConversation) return;
      const response = await api.getMessageByConversationId({
        IDConversation,
        IDNextBucket: null,
      });
      if (response.data) {
        setMessageData(response.data.listMessageDetail);
        dispatch(setMessages(response.data.listMessageDetail));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [conversation, dispatch, ID, popupOptions.show]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageData((prev) => [data, ...prev]);
    };
    socket.on("sending_message", (data) => {});

    socket.on("receive_message", handleReceiveMessage);
    return () => {
      // socket.off("receive_message");
      socket.off("sending_message");
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header fullname={fullname} id={ID} image={urlavatar} owner={owner} />
      <Body
        id={ID}
        owner={owner}
        nameGroup={fullname}
        imageGroup={urlavatar}
        isLoading={isLoading}
        messageData={messageData}
      />
      <ViewImageFullScreen />
      {/* <BlurViewMessage /> */}
      <Footer ID={ID} />
      <PopUpOptions />
    </View>
  );
}

export default Chat;
