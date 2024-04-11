import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { setMessages, updateMessages } from "../../redux/chatSlice";
import PopUpOptions from "../../components/PopUpOptions";
import socket from "../../services/socket";

function Chat({ route }) {
  const { ID, name, image, owner } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { conversation } = useSelector((state) => state.conversation);

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
        dispatch(setMessages(response.data.listMessageDetail));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [conversation, dispatch, ID]);

  return (
    <View style={styles.container}>
      <Header fullname={name} id={ID} image={image} owner={owner} />
      <Body
        id={ID}
        owner={owner}
        nameGroup={name}
        imageGroup={image}
        isLoading={isLoading}
      />
      {!isLoading && <Footer ID={ID} />}
      <PopUpOptions />
    </View>
  );
}

export default memo(Chat);
