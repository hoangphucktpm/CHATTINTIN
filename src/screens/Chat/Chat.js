import React, { memo, useEffect, useState, useCallback } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
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

  const { conversation } = useSelector((state) => state.conversation);
  const popupOptions = useSelector((state) => state.chat.popup);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [messageData, setMessageData] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlock, setIsBlock] = useState(isBlock);

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
  }, [IDConversation, dispatch, conversation, popupOptions.show]);

  useEffect(() => {
    fetchMessages();
    if (route?.params?.isBlock) setIsBlock(route?.params?.isBlock);
  }, [fetchMessages]);

  const handleReceiveMessage = (data) => {
    if (!data.isPass) {
      setMessageData((prev) => [data, ...prev]);
      dispatch(setLoadingUpload(false));
    }
  };

  useEffect(() => {
    socket.on("new_group_conversation", () => {
      socket.emit("load_conversations", { IDUser: user?.ID });
    });

    socket.on("receive_message", handleReceiveMessage);
    socket.emit("get_block_friend", {
      IDConversation1: IDConversation,
      IDSender: user?.ID,
      IDReceiver: IDSender || ID,
    });

    socket.on("get_block_friend_server", (data) => setIsBlocked(data));

    return () => {
      socket.off("new_group_conversation");
      socket.off("receive_message", handleReceiveMessage);
      socket.off("get_block_friend");
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
      socket.off("get_block_friend_server");
    };
  }, [dispatch, isBlock]);

  const handleUnBlock = () => {
    const data = {
      IDConversation1: IDConversation,
      IDSender: user?.ID,
      IDReceiver: IDSender || ID,
    };

    socket.emit("un_block_friend", data);
    socket.on("un_block_friend_server", () => {
      setIsBlock(false);
    });
  };

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
        isGroup={isGroup}
      />
      <ViewImageFullScreen />
      {!isBlocked ? (
        <Footer IDConversation={IDConversation} />
      ) : !isBlock ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#ddd",
            opacity: 0.5,
            padding: 2,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 20,
              color: "red",
            }}
          >
            Bạn đã bị chặn
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleUnBlock}
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#ddd",
            opacity: 0.5,
            padding: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            Bỏ chặn người này
          </Text>
        </TouchableOpacity>
      )}
      <PopUpOptions setMessageData={setMessageData} />
      <ForwardModal />
    </View>
  );
});

export default Chat;