import React, { useCallback, useEffect, useState } from "react";
import styles from "./App_Style";
import { ActivityIndicator, View } from "react-native";
import Search from "../Search/Search";
import ListFriend from "../ListFriend/ListFriend";
import Footer from "../Footer/Footer";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getData } from "../../utils/localStorageConfig";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../../apis/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSclice";
import socket from "../../services/socket";
import { setConversation } from "../../redux/conversationSlice";
import { updateMessages } from "../../redux/chatSlice";

function Home(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [user, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const phone = await getData("user-phone");
      if (!phone) return navigation.navigate("Login");
      const res = await api.getUserByPhone(phone);
      setUserData(res.data);
      dispatch(setUser(res.data));
      setIsLoading(false);
    };
    getUser();
  }, []);
  const phone = user?.phone;

  useFocusEffect(
    useCallback(() => {
      user && socket.emit("load_conversations", { IDUser: user.ID });
    }, [user])
  );

  useEffect(() => {
    socket.on("load_conversations_server", (data) => {
      if (data) dispatch(setConversation(data));
    });
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
