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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // get messages
    dispatch(setMessages([]));
    const getMessages = async () => {
      if (!conversation.length) return;
      const IDConversation = conversation.find(
        (convers) => convers.IDReceiver === route.params.ID
      )?.IDConversation;
      try {
        if (!IDConversation) return;
        const response = await api.getMessageByConversationId({
          IDConversation,
          IDNextBucket: null,
        });

        if (response.data) {
          dispatch(setMessages(response.data.listMessageDetail));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
