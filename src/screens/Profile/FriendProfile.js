import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./StyleFriendProfile";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { api } from "../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../services/socket";
import AvatarCustomer from "../../components/AvatarCustomer";
import { setBadge, setCurrentScreen } from "../../redux/appSlice";

function FriendProfile({ route }) {
  const { phone, fullname, urlavatar, ID } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversation } = useSelector((state) => state.conversation);

  const [isAdd, setIsAdd] = useState(false);
  const [add, setAdd] = useState("Kết bạn");
  const [isRequest, setIsRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allFriendsRequest, setAllFriendsRequest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigation.navigate("Login");
        return;
      }

      try {
        const allFriendsRequest = await api.getAllFriendRequests(user.ID);
        setAllFriendsRequest(allFriendsRequest.data);
        const hasRequested = allFriendsRequest.data?.some(
          (rq) => rq.ID === phone || rq.ID === ID
        );
        setIsRequest(!!hasRequested);

        const checkRequestFromSelf = await api.checkRequest({
          senderId: user.ID,
          receiverId: phone || ID,
        });
        const checkRequestFromFriend = await api.checkRequest({
          senderId: phone || ID,
          receiverId: user.ID,
        });

        const isSelfRequested = checkRequestFromSelf.data;
        const isFriendRequested = checkRequestFromFriend.data;

        console.log({ isSelfRequested, isFriendRequested });
        if (+isFriendRequested?.code === 0) setAdd("Hủy lời mời");
        if (isFriendRequested?.code === 2 || isSelfRequested?.code === 2)
          setIsAdd(true);
        if (isSelfRequested?.code === 0) setIsRequest(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user, ID, phone]);

  useEffect(() => {
    socket.on("send friend request server", (data) => {
      if (data?.code === 1) {
        Alert.alert("Gửi lời mời kết bạn", "Đã gửi lời mời kết bạn thành công");
        setAdd("Hủy lời mời");
      } else if (data?.code === 0) {
        Alert.alert(
          "Gửi lời mời kết bạn",
          "Lời mời kết bạn đã được gửi trước đó"
        );
      } else if (data?.code === 2) {
        Alert.alert("Gửi lời mời kết bạn", "Đã có trong danh sách bạn bè");
      }
    });

    return () => {
      socket.off("send friend request server");
    };
  }, []);

  const handleRequest = async (type) => {
    const id = allFriendsRequest.find(
      (item) => item?.sender?.ID === ID || phone
    )?.id;

    await api
      .handleFriendRequest({ id, type })
      .then((res) => {
        // setReceiverId(ID || phone);
        if (res?.data?.code === 1) {
          socket.emit("load_conversations", {
            IDUser: user?.ID,
          });
          socket.emit("load_conversations", {
            IDUser: ID || phone,
          });
        }
        dispatch(setCurrentScreen("Contacts"));
        // dispatch(setBadge(0));
        // navigation.goBack();
        navigation.navigate("Contacts");
      })
      .catch((err) => {
        Alert.alert("Lỗi", "Không thể thực hiện yêu cầu");
      });
  };

  const handleAddFriend = async () => {
    if (isAdd) {
      setAdd("Kết bạn");
      setIsAdd(false);
    } else if (add === "Hủy lời mời") {
      // await handleRequest("DENIED");
    } else {
      try {
        socket.emit("new friend request client", {
          senderId: user.ID,
          receiverId: route.params.ID,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.containerTabBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            width: "73%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Trang cá nhân</Text>
        </View>
      </View>
      <ScrollView style={{ paddingBottom: 0 }}>
        <View style={styles.containerBody}>
          <ImageBackground
            source={{
              uri: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/background-dep-don-gian-de-thiet-ke-780x521.jpg",
            }}
            style={styles.containerBody_Top}
          >
            <AvatarCustomer
              style={styles.containerBody_Top_Avt}
              source={{
                uri: urlavatar,
              }}
              alt={fullname}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "black",
                marginTop: 10,
              }}
            >
              {fullname}
            </Text>
          </ImageBackground>
          <View style={styles.containerBody_Mid}>
            <View style={styles.containerBody_Mid_Bottom}>
              {isAdd || !isRequest ? null : (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <TouchableOpacity
                      onPress={() => handleRequest("ACCEPTED")}
                      style={styles.bottom}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Chấp nhấn
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{
                      ...styles.bottom,
                      width: "40%",
                      backgroundColor: "red",
                    }}
                    onPress={() => handleRequest("DENIED")}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginLeft: 0,
                        color: "white",
                      }}
                    >
                      Từ chối
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.containerBody_Mid_Bottom_Item}>
                {isAdd || isRequest ? null : (
                  <View style={{ marginRight: 10 }}>
                    <TouchableOpacity
                      onPress={handleAddFriend}
                      style={styles.bottom}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          marginLeft: 0,
                          color: "white",
                        }}
                      >
                        {add}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.bottom}
                  onPress={() =>
                    navigation.navigate("Chat", {
                      id: phone,
                      fullname: fullname,
                      image: urlavatar,
                      IDConversation: conversation?.find(
                        (con) =>
                          !con?.isGrounp && con?.Receiver?.ID === (phone || ID)
                      ).IDConversation,
                    })
                  }
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginLeft: 0,
                      color: "white",
                    }}
                  >
                    Nhắn tin
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default FriendProfile;
