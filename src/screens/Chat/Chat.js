import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { setMessages } from "../../redux/chatSlice";
import PopUpOptions from "../../components/PopUpOptions";

function Chat({ route }) {
  const { ID, name, image, owner } = route.params;

  const { conversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // get messages
    dispatch(setMessages([]));
    const getMessages = async () => {
      if (!conversation.length) return;
      const IDConversation = conversation.find(
        (convers) => convers.IDReceiver === ID
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
      <Header fullname={name} id={ID} image={image} owner={owner} />
      <Body id={ID} owner={owner} nameGroup={name} imageGroup={image} />
      <Footer ID={ID} />
      <PopUpOptions />
    </View>
  );
}

export default Chat;
