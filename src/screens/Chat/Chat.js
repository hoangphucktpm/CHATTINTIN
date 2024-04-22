import React, { memo, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import {
  setLoadingUpload,
  setMessages,
  updateMessages,
} from "../../redux/chatSlice";
import PopUpOptions from "../../components/PopUpOptions";
import socket from "../../services/socket";
import { ViewImageFullScreen } from "../../components/ImageMessage";
import ForwardModal from "../../components/ForwardModal";

function Chat({ route }) {
  const { owner, IDConversation } = route.params;
  const { ID, fullname, urlavatar } = route.params.Receiver;

  const dispatch = useDispatch();

  const messages = useSelector((state) => state.chat.messages);

  const popupOptions = useSelector((state) => state.chat.popup);
  const [messageData, setMessageData] = useState([]);
  async function fetchMessages() {
    try {
      dispatch(setMessages([])); // Clear previous messages
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

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setMessageData([]);
    fetchMessages();
    return () => fetchMessages();
  }, [ID]);

  const handleReceiveMessage = (data) => {
    if (data.isPass) return;
    setMessageData((prev) => [data, ...prev]);

    dispatch(setLoadingUpload(false));
  };
  useEffect(() => {
    socket.on("new_group_conversation", (data) => {
      socket.emit("load_conversations", { IDUser: user.ID });
    });
    // socket.on("sending_message", (data) => {});

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("new_group_conversation");
      socket.off("sending_message");
    };
  }, []);

  useEffect(() => {
    socket.on("changeStateMessage", (data) => {
      setMessageData((prev) => {
        const newData = prev.map((item) => {
          if (item.IDMessageDetail === data.IDMessageDetail) {
            return { ...item, isRecall: data.isRecall };
          }
          return item;
        });
        return newData;
      });
    });

    dispatch(setLoadingUpload(false));
    return () => {
      socket.off("changeStateMessage");
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header fullname={fullname} id={ID} image={urlavatar} owner={owner} />
      <Body
        id={IDConversation}
        owner={owner}
        dataSender={route.params.Receiver}
        messageData={messageData}
        isGroup={route.params.isGroup}
      />
      <ViewImageFullScreen />
      {/* <BlurViewMessage /> */}
      <Footer IDConversation={IDConversation} />
      <PopUpOptions setMessageData={setMessageData} />
      <ForwardModal />
    </View>
  );
}

export default Chat;
