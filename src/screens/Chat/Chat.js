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
import { ViewImageFullScreen } from "../../components/ImageMessage";
import ForwardModal from "../../components/ForwardModal";

const Chat = memo(({ route }) => {
  const { owner, IDConversation } = route.params;
  console.log("router", route.params);
  const { ID, fullname, urlavatar } = route.params.Receiver;

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
    return () => {
      socket.off("new_group_conversation");
      socket.off("sending_message");
      socket.off("changeStateMessage");
    };
  }, [fetchMessages]);

  const handleReceiveMessage = useCallback(
    (data) => {
      if (!data.isPass) {
        setMessageData((prev) => [data, ...prev]);
        dispatch(setLoadingUpload(false));
      }
    },
    [dispatch]
  );

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
      <Header fullname={fullname} id={ID} image={urlavatar} owner={owner} />
      <Body
        id={IDConversation}
        owner={owner}
        dataSender={route.params.Receiver}
        messageData={messageData}
        isGroup={route.params.isGroup}
      />
      <ViewImageFullScreen />
      <Footer IDConversation={IDConversation} />
      <PopUpOptions setMessageData={setMessageData} />
      <ForwardModal />
    </View>
  );
});

export default Chat;
