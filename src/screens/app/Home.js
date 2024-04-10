// import React, { useEffect, useRef, useState } from "react";
// import styles from "./App_Style";
// import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from "react-native";
// import Footer from "../Footer/Footer";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import tokenService from "../../services/token.service";
// import userAPI from "../../redux/reducers/user/userAPI";
// import  io  from "socket.io-client";
// import roomAPI from "../../redux/reducers/Room/roomAPI";
// export let newSocket = io("http://54.254.183.128");

import React, { useEffect, useState } from "react";
import styles from "./App_Style";
import { View } from "react-native";
import Search from "../Search/Search";
import ListFriend from "../ListFriend/ListFriend";
import Footer from "../Footer/Footer";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getData } from "../../utils/localStorageConfig";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSclice";

function Home(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [user, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const phone = await getData("user-phone");
      if (!phone) return navigation.navigate("Login");
      const res = await api.getUserByPhone(phone);
      setUserData(res.data);
      dispatch(setUser(res.data));
    };
    getUser();
  }, []);
  const phone = user?.phone;
  // const [socket, setSocket] = useState(null);

  // const rooms = userState.rooms;

  // const token = tokenService.getAccessToken();
  // const roomId = useRef(roomState._id);
  // useEffect(() => {
  //     roomId.current = roomState._id;
  // });
  // const message = useRef(roomState.messageSent);
  // useEffect(() => {
  //     message.current = roomState.messageSent;
  // });
  // useEffect(() => {
  //     if (userState.is_login) {
  //         dispatch(userAPI.getUserInfo()(tokenService.getAccessToken()));
  //     }
  // }, []);
  // useEffect(() => {
  //     newSocket.disconnect();
  //     newSocket = io("http://54.254.183.128");
  //     newSocket?.on("server-send-message", function (data) {
  //         if (roomId.current === data.roomId) {
  //             dispatch(roomAPI.updateListChat()(data));
  //         }
  //     });
  //     newSocket?.on("connect", () => {
  //         console.log("connecting");
  //         newSocket.emit("start", { token: token });
  //     });
  //     newSocket?.on("disconnect", () => {
  //         console.log("disconnect");
  //     });

  //     // socket request add friend

  //     newSocket.on("send-friend-invite", function (data) {
  //         dispatch(
  //             userAPI.updateListRequestAddFriend()(data.friendInvite.user)
  //         );
  //     });
  //     // send icon vs thu tin nhan
  //     newSocket.on("react-message", function (data) {
  //         if (roomId.current === data.roomId) {
  //             dispatch(roomAPI.updateChangeIconMessage()(data));
  //         }
  //     });

  //     newSocket.on("unsend-message", function (data) {
  //         console.log(data);
  //         console.log(data.roomId);
  //         console.log(roomState._id);
  //         if (roomId.current === data.roomId) {
  //             console.log("vào");

  //             dispatch(roomAPI.updateChangeMessage()(data));
  //         }
  //     });

  //     // call video

  //     // navigator.mediaDevices
  //     //     .getUserMedia({ video: true, audio: true })
  //     //     .then((stream) => {
  //     //         setStream(stream);
  //     //         myVideo.current.srcObject = stream;
  //     //     });

  //     // newSocket.on("me", (id) => {
  //     //     setMe(id);
  //     // });

  //     // newSocket.on("callUser", (data) => {
  //     //     setReceivingCall(true);
  //     //     setCaller(data.from);
  //     //     setName(data.name);
  //     //     setCallerSignal(data.signal);
  //     // });

  //     // call video

  //     return () => {
  //         newSocket?.off("connect");
  //         newSocket?.off("disconnect");
  //         newSocket?.off("server-send-message");
  //     };
  //     // }
  // }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <Search style={styles.containerSearch} />
        <View style={styles.containerList}>
          <ListFriend {...props} style={styles.main} />
        </View>
        <Footer phone={phone} style={styles.footer} />
      </View>
    </View>
  );
}

export default Home;
