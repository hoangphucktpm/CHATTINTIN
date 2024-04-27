import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../utils/localStorageConfig";
import { api } from "../../apis/api";
import { setUser } from "../../redux/authSclice";
import socket from "../../services/socket";
import { setConversation } from "../../redux/conversationSlice";
import Search from "../Search/Search";
import ListFriend from "../ListFriend/ListFriend";
import Footer from "../Footer/Footer";
import styles from "./App_Style";

function Home(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [phone, setPhone] = useState(null);
  const [conversations, setConversations] = useState([]);

  const getPhone = async () => {
    const phoneUser = await getData("user-phone");
    setPhone(phoneUser);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUserAndConversations = async () => {
        if (!phone) {
          getPhone();
        } else {
          socket.emit("load_conversations", { IDUser: phone });
          const res = await api.getUserByPhone(phone);
          dispatch(setUser(res.data));
        }
      };

      fetchUserAndConversations();

      socket.on("new_group_conversation", () => {
        if (phone) {
          socket.emit("load_conversations", { IDUser: phone });
        }
      });

      return () => {
        socket.off("new_group_conversation");
      };
    }, [phone])
  );

  useEffect(() => {
    socket.on("new_group_conversation", () => {
      if (phone) {
        socket.emit("load_conversations", { IDUser: phone });
      }
    });
    conversations.length &&
      socket.on("receive_message", (data) => {
        const currentIndex = conversations.findIndex(
          (conversation) => conversation.IDConversation === data.IDConversation
        );

        if (currentIndex > -1) {
          const updatedConversations = [
            conversations[currentIndex],
            ...conversations,
          ];

          updatedConversations.splice(currentIndex + 1, 1);

          dispatch(setConversation(updatedConversations));
        }
      });

    phone && socket.emit("load_conversations", { IDUser: phone });
  }, []);

  useEffect(() => {
    const handleLoadConversationsServer = (data) => {
      if (data) {
        setConversations(data);
        dispatch(setConversation(data));
      }
    };

    socket.on("load_conversations_server", handleLoadConversationsServer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <Search style={styles.containerSearch} />
        <View style={styles.containerList}>
          {user && phone && <ListFriend {...props} style={styles.main} />}
        </View>
        <Footer phone={phone} style={styles.footer} />
      </View>
    </View>
  );
}

export default Home;
