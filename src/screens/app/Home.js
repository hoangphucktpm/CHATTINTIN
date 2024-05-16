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
  const conversation = useSelector((state) => state.conversation.conversation);
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

  useEffect(() => {
    if (!conversation || !conversation?.length) {
      user && socket.emit("load_conversations", { IDUser: user.ID });
    }
  }, [conversation]);

  useFocusEffect(
    useCallback(() => {
      if (phone) {
        console.log("load_conversations", phone);
        socket.emit("load_conversations", { IDUser: phone });
      }
      socket.emit("load_conversations_server", (data) => {
        setConversations(data);
        dispatch(setConversation(data));
      });
    }, [phone])
  );

  useEffect(() => {
    const handleLoadConversationsServer = (data) => {
      console.log("get cdata");
      setConversations(data);
      dispatch(setConversation(data));
    };

    const handleLoadConversation = () => {
      socket.emit("load_conversations", { IDUser: phone });
    };

    const handleNewFriendRequest = async (data) => {
      if (data.code === 1) {
        const allFriendRequests = await api.getAllFriendRequests(phone);
        console.log("count friend request", allFriendRequests.data.length);
        dispatch(setBadge(allFriendRequests.data.length));
        Alert.alert("Có lời mời kết bạn mới");
      }
    };

    const handlePhoneCome = async (data) => {
      if (data.IDCallee === phone) {
        const res = await api.getUserByPhone(data.IDCaller);
        res.data &&
          props.navigation.navigate("VideoCallCome", { ...res.data, data });
      }
    };

    // socket.on("webRTC-signaling", (data) => console.log("data123"));
    socket.on("pre-offer-single", handlePhoneCome);
    socket.on("load_conversations_server", handleLoadConversationsServer);
    socket.on("new_group_conversation", handleLoadConversation);
    socket.on("load_member_of_group_server", handleLoadConversation);
    socket.on("changeStateMessage", handleLoadConversation);
    socket.on("un_block_friend_server", handleLoadConversation);
    // socket.on("block_friend_server", handleLoadConversation);
    socket.on("new friend request server", handleNewFriendRequest);

    return () => {
      socket.off("new_group_conversation", handleLoadConversation);
      socket.off("load_member_of_group_server", handleLoadConversation);
      // socket.off("pre-offer-single", handlePhoneCome);
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
