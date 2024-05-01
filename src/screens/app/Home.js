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
import { setBadge } from "../../redux/appSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [phone, setPhone] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getPhone = async () => {
      let phoneUser;
      if (!user) {
        phoneUser = await getData("user-phone");
      } else {
        phoneUser = user.phone;
      }
      setPhone(phoneUser);
    };
    getPhone();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (phone) {
        socket.emit("load_conversations", { IDUser: phone });
      }
    }, [phone])
  );

  useEffect(() => {
    const handleLoadConversationsServer = (data) => {
      setConversations(data);
      dispatch(setConversation(data));
    };

    const handleLoadConversation = () => {
      socket.emit("load_conversations", { IDUser: phone });
    };

    const handleNewFriendRequest = async (data) => {
      console.log(data);
      if (data.code === 1) {
        const allFriendRequests = await api.getAllFriendRequests(phone);
        dispatch(setBadge(allFriendRequests.data.length));
        Alert.alert("New friend request");
      }
    };

    socket.on("load_conversations_server", handleLoadConversationsServer);
    socket.on("new_group_conversation", handleLoadConversation);
    socket.on("load_member_of_group_server", handleLoadConversation);
    socket.on("new friend request server", handleNewFriendRequest);

    return () => {
      socket.off("new_group_conversation", handleLoadConversation);
      socket.off("load_member_of_group_server", handleLoadConversation);
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
