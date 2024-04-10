import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";
import socket from "../../services/socket";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { setMessages } from "../../redux/chatSlice";

function Chat({ route }) {
  const { id, name, image, owner } = route.params;

  const { conversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for connect event
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Listen for disconnect event
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    // Listen for error event
    socket.on("error", (error) => {
      console.log("An error occurred:", error);
    });

    // Listen for reconnect event
    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected to the server after", attemptNumber, "attempts");
    });
    // Clean up the effect
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("error");
      socket.off("reconnect");
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // get messages
    const getMessages = async () => {
      if (!conversation[0].IDConversation) return;
      try {
        const response = await api.getMessageByConversationId({
          IDConversation: conversation[0].IDConversation,
          IDNextBucket: null,
        });

        if (response.data) {
          dispatch(setMessages(response.data.listMessageDetail));
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [conversation]);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Header fullname={name} id={id} image={image} owner={owner} />
      <Body id={id} owner={owner} nameGroup={name} imageGroup={image} />
      <Footer />
    </View>
  );
}

export default Chat;
