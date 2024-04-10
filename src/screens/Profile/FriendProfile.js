import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./StyleFriendProfile";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { api } from "../../apis/api";
import { useSelector } from "react-redux";

function FriendProfile({ route }) {
  const { phone, fullname, urlavatar } = route.params;
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const [friendRequests, setFriendRequests] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [add, setAdd] = useState("Kết bạn");
  const [isRequest, setIsRequest] = useState(false);

  useEffect(() => {
    if (!user) return navigation.navigate("Login");
    const getFriendRequests = async () => {
      const [allFriendsRequest, checkRequestFromSelf, checkRequestFromFriend] =
        await Promise.all([
          api.getAllFriendRequests(user.ID),
          api.checkRequest({
            senderId: user.ID,
            receiverId: route.params.ID,
          }),
          api.checkRequest({
            senderId: route.params.ID,
            receiverId: user.ID,
          }),
        ]);
      if (allFriendsRequest.data?.find((rq) => rq.ID === route.params.ID))
        setIsRequest(true);
      if (
        (checkRequestFromSelf.data && checkRequestFromSelf.data.code == 2) ||
        (checkRequestFromFriend.data && checkRequestFromFriend.data.code == 2)
      )
        setIsAdd(true);
    };
    getFriendRequests();
  }, [user, isAdd, route.params.ID]);

  const hanldPressGoBack = () => {
    navigation.goBack();
  };

  // const infoState = useSelector(state => state.info);
  // const token = tokenService.getAccessToken();

  const handelPress = () => {
    if (isAdd) {
      setAdd("Kết bạn");
      setIsAdd(false);
    } else {
      try {
        api
          .handleSendFriendRequest({
            senderId: user.ID,
            receiverId: route.params.ID,
          })
          .then((res) => {
            console.log(res.data);
            Alert.alert("Thông báo", res.data.message);
            setAdd("Hủy lời mời");
            setIsAdd(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRequest = (type) => {
    api
      .handleFriendRequest({ id: route.params.ID, type })
      .then((res) => {
        Alert.alert(res.data.message);
        setReceiverId(id);
      })
      .catch((err) => {
        Alert.alert("Error handle friend requests");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTabBar}>
        <TouchableOpacity
          onPress={hanldPressGoBack}
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
            <Image
              style={styles.containerBody_Top_Avt}
              source={{
                uri:
                  urlavatar ||
                  "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
              }}
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
              {!isRequest ? null : (
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
                {isAdd ? null : (
                  <View style={{ marginRight: 10 }}>
                    <TouchableOpacity
                      onPress={handelPress}
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
                      name: fullname,
                      image: urlavatar,
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
