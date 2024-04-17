import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../utils/localStorageConfig";
import { api } from "../../apis/api";
import { setUser } from "../../redux/authSclice";
import socket from "../../services/socket";
import { setConversation } from "../../redux/conversationSlice";
import { updateMessages } from "../../redux/chatSlice";
import Search from "../Search/Search";
import ListFriend from "../ListFriend/ListFriend";
import Footer from "../Footer/Footer";
import styles from "./App_Style";

function Home(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const phone = await getData("user-phone");
      if (!phone) return navigation.navigate("Login");
      const res = await api.getUserByPhone(phone);
      setUserData(res.data);
      dispatch(setUser(res.data));
      setIsLoading(false);
      socket.emit("load_conversations", { IDUser: res.data.ID });
    };
    fetchData();

    return () => {
      socket.off("new_group_conversation");
      socket.off("load_conversations_server");
    };
  }, []);

  const phone = userData?.phone;
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      const handleNewGroupConversation = (data) => {
        socket.emit("load_conversations", { IDUser: user.ID });
      };
      socket.on("new_group_conversation", handleNewGroupConversation);
      return () => {
        socket.off("new_group_conversation", handleNewGroupConversation);
      };
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!userData) return;
      socket.emit("load_conversations", { IDUser: userData.ID });

      return () => {
        socket.off("load_conversations", { IDUser: userData.ID });
      };
    }, [userData])
  );

  useEffect(() => {
    const handleLoadConversationsServer = (data) => {
      console.log(data);
      if (data) dispatch(setConversation(data));
    };

    socket.on("load_conversations_server", handleLoadConversationsServer);

    return () => {
      socket.off("load_conversations_server", handleLoadConversationsServer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <Search style={styles.containerSearch} />
        <View style={styles.containerList}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ListFriend {...props} style={styles.main} />
          )}
        </View>
        <Footer phone={phone} style={styles.footer} />
      </View>
    </View>
  );
}

export default Home;
