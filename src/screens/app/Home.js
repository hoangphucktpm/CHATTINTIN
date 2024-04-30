import React, { useCallback, useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../apis/api";
import socket from "../../services/socket";
import { getData } from "../../utils/localStorageConfig";
import { setUser } from "../../redux/authSclice";
import { setConversation } from "../../redux/conversationSlice";
import Search from "../Search/Search";
import ListFriend from "../ListFriend/ListFriend";
import Footer from "../Footer/Footer";
import styles from "./App_Style";

const Home = (props) => {
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
    }, [phone, dispatch])
  );

  useEffect(() => {
    const handleLoadConversationsServer = (data) => {
      setConversations(data);
      dispatch(setConversation(data));
    };

    const handleLoadConversation = () => {
      socket.emit("load_conversations", { IDUser: phone });
    };

    const handleNewFriendRequest = (data) => {
      if (data.code === 1) {
        Alert.alert("New friend request");
        handleLoadConversation();
      }
    };

    socket.on("load_conversations_server", handleLoadConversationsServer);
    socket.on("new_group_conversation", handleLoadConversation);
    socket.on("load_member_of_group_server", handleLoadConversation);
    socket.on("new_friend_request_server", handleNewFriendRequest);

    return () => {
      socket.off("load_conversations_server", handleLoadConversationsServer);
      socket.off("new_group_conversation", handleLoadConversation);
      socket.off("load_member_of_group_server", handleLoadConversation);
      socket.off("new_friend_request_server", handleNewFriendRequest);
    };
  }, [phone, dispatch]);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      const updatedConversations = conversations.map((conversation) =>
        conversation.IDConversation === data.IDConversation
          ? data
          : conversation
      );
      setConversations(updatedConversations);
      dispatch(setConversation(updatedConversations));
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [conversations, dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#0091ff"} />
      <View style={styles.containerItem}>
        <Search style={styles.containerSearch} />
        <View style={styles.containerList}>
          {user && phone && <ListFriend {...props} style={styles.main} />}
        </View>
        <Footer phone={phone} style={styles.footer} />
      </View>
    </View>
  );
};

export default Home;
