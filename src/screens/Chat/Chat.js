import React, { memo, useEffect, useState, useCallback } from "react";
import { StatusBar, View } from "react-native";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { setLoadingUpload, setMessages } from "../../redux/chatSlice";
import PopUpOptions from "../../components/PopUpOptions";
import socket from "../../services/socket";
import ForwardModal from "../../components/ForwardModal";
import { ViewImageFullScreen } from "../../components/ImageFullView";

const Chat = memo(({ route }) => {
  const { IDConversation, isGroup } = route.params;
  const { ID, fullname, urlavatar, IDSender } =
    route.params.Receiver ?? route.params;

  const dispatch = useDispatch();

  const [messageData, setMessageData] = useState([]);

  const fetchMessages = useCallback(async () => {
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
  }, [IDConversation, dispatch]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleReceiveMessage = (data) => {
    if (!data.isPass) {
      setMessageData((prev) => [data, ...prev]);
      dispatch(setLoadingUpload(false));
    }
  };

  useEffect(() => {
    socket.on("new_group_conversation", () => {
      socket.emit("load_conversations", { IDUser: user.ID });
    });

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("new_group_conversation");
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [handleReceiveMessage, user.ID]);

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
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header
        fullname={fullname}
        id={ID ?? route.params.IDSender}
        image={urlavatar}
        isGroup={isGroup}
        IDConversation={IDConversation}
        isBlock={route.params?.isBlock}
      />
      <Body
        id={IDConversation}
        dataSender={route.params.Receiver}
        messageData={messageData}
      />
      <ViewImageFullScreen />
      <Footer IDConversation={IDConversation} />
      <PopUpOptions setMessageData={setMessageData} />
      <ForwardModal />
    </View>
  );
});

export default Chat;
