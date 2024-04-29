import React, { useMemo } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";
import styles from "./StyleContacts";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../Footer/Footer";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import socket from "../../services/socket";
import { useEffect } from "react";
import { api } from "../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import { Octicons } from "@expo/vector-icons";
import { setForward, setPopup, setReply } from "../../redux/chatSlice";
import { setGroupDetails } from "../../redux/groupSlice";
import { setConversation } from "../../redux/conversationSlice";

function Contacts() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { conversation } = useSelector((state) => state.conversation);

  const [selectedButton, setSelectedButton] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [listFriends, setListFriends] = useState([]);

  const phone = user?.phone;
  const groupLists = useMemo(() => {
    return conversation?.map((convers) => convers);
  }, [conversation]);

  // Thêm một state mới để lưu trữ danh sách lời mời kết bạn
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    if (!user) return navigation.navigate("Login");
    const getFriendRequests = async () => {
      const [allFriendRequests, allFriends] = await Promise.all([
        api.getAllFriendRequests(user.ID),
        api.getAllFriends(user.ID),
      ]);
      setFriendRequests(allFriendRequests.data);
      setListFriends(allFriends.data);
    };
    getFriendRequests();
  }, [user, receiverId]);

  const sreach = () => {
    // mở thanh tìm kiếm
  };

  const handleAccept = (item) => {
    api
      .handleFriendRequest({ id: item.id, type: "ACCEPTED" })
      .then((res) => {
        Alert.alert(res.data.message);
        setReceiverId(item.id);

        if (res.data.code === 1) {
          socket.emit("load_conversations", { IDUser: user.ID });
          socket.emit("load_conversations", {
            IDUser: res.data.senderID,
          });
        }
      })
      .catch((err) => {
        Alert.alert("Error handle friend requests");
      });
  };

  // reload conversation

  useEffect(() => {
    const handleLoadConversationsServer = (data) => {
      if (data) {
        dispatch(setConversation(data));
      }
    };

    socket.on("load_conversations_server", handleLoadConversationsServer);
  }, []);

  const handleReject = (id) => {
    // xóa cái item đó
    // Hiện thông báo đã từ chối
    api
      .handleFriendRequest({ id, type: "DENIED" })
      .then((res) => {
        Alert.alert(res.data.message);
        setReceiverId(id);
      })
      .catch((err) => {
        Alert.alert("Error handle friend requests");
      });
  };

  const AddFriend = () => {
    navigation.navigate("AddFriends", { phone: phone });
  };

  const renderList = () => {
    switch (selectedButton) {
      case "friends":
        return (
          <FlatList
            data={listFriends}
            renderItem={renderFriendItem}
            keyExtractor={(item, i) => {
              return `${item.ID} ${i.toString()}`;
            }}
          />
        );
      case "Group":
        return (
          <FlatList
            data={groupLists}
            renderItem={renderGroup}
            keyExtractor={(item, i) => {
              return `${item.ID} ${i.toString()}`;
            }}
          />
        );
      case "loimoi":
        // Lời mời kết bạn kèm theo chức năng chấp nhận hoặc từ chối, hiện icon chấp nhận và từ chối ra trong mỗi item
        return (
          <FlatList
            data={friendRequests}
            renderItem={renderFriendRequest}
            keyExtractor={(item, i) => {
              return `${item.ID} ${i.toString()}`;
            }}
          />
        );
      default:
        return (
          <FlatList
            data={listFriends}
            renderItem={renderFriendItem}
            keyExtractor={(item, i) => {
              return `${item.ID} ${i.toString()}`;
            }}
          />
        );
    }
  };

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderGroup = ({ item }) => {
    if (!item.isGroup) return;
    const { Receiver } = item;
    var imageItem =
      Receiver.urlavatar ??
      "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";
    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          dispatch(setReply({ show: false, data: null }));
          dispatch(setGroupDetails(item));
          dispatch(setForward({ show: false, data: null }));
          dispatch(setPopup({ show: false, data: null }));
          navigation.navigate("Chat", item);
        }}
      >
        <View style={styles.containerItem}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <Image
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: `${imageItem}` }}
              />
            </View>
          </View>
          <View style={styles.itemFriend_right}>
            <Text style={{ fontSize: 20 }}>{Receiver.fullname}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderFriendItem = ({ item }) => {
    const dataItem = groupLists.find((data) => data.IDReceiver === item.ID);
    var imageItem =
      item.urlavatar ??
      "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";
    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          dispatch(setReply({ show: false, data: null }));
          dispatch(setGroupDetails(dataItem));
          dispatch(setForward({ show: false, data: null }));
          dispatch(setPopup({ show: false, data: null }));
          navigation.navigate("Chat", dataItem);
        }}
      >
        <View style={styles.containerItem}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <Image
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: `${imageItem}` }}
              />
            </View>
          </View>
          <View style={styles.itemFriend_right}>
            <Text style={{ fontSize: 20 }}>{item.fullname}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderFriendRequest = ({ item }) => {
    // console.log(item);

    var imageItem =
      item.sender.urlavatar ??
      "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";

    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          navigation.navigate("Chat", {
            id: item.id,
            name: item.name,
            image: imageItem,
            lastMessage: item.lastMessage,
            time: item.time,
            isFriendRequest: true,
          });
        }}
      >
        <View style={styles.containerItem}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <Image
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: `${imageItem}` }}
              />
            </View>
          </View>
          <View style={styles.itemFriend_right}>
            <Text style={{ fontSize: 20, color: "#000" }}>
              {item.sender.fullname}
            </Text>
          </View>
          <View style={styles.itemFriend_actions}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAccept(item)}
            >
              <FontAwesome name="check" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => handleReject(item.id)}
            >
              <FontAwesome name="times" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerIcon}>
          <EvilIcons name="search" size={30} color="white" onPress={sreach} />
        </View>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.containerIconRight}>
          <TouchableOpacity onPress={AddFriend} style={styles.containerIconAdd}>
            <Ionicons
              name="person-add"
              size={24}
              color="white"
              marginRight={10}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateGroup");
            }}
            style={styles.containerIconAdd}
          >
            <Ionicons name="people-circle" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.containerBody, { backgroundColor: "white" }]}>
        <View
          style={{ flex: 0.3, marginLeft: 5, marginRight: 5, marginTop: 10 }}
        >
          <TouchableOpacity
            onPress={() => handleButtonPress("friends")}
            style={[
              styles.containerBody_Row,
              selectedButton === "friends" && { backgroundColor: "#BFEFFF" }, // Sử dụng điều kiện để chỉ định màu cho mục đã chọn
            ]}
          >
            <Octicons
              name="feed-person"
              size={35}
              color="blue"
              marginLeft={5}
            />

            <Text style={{ fontSize: 18, marginLeft: 20 }}>
              Danh sách bạn bè
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress("Group")}
            style={[
              styles.containerBody_Row,
              selectedButton === "Group" && { backgroundColor: "#BFEFFF" }, // Sử dụng điều kiện để chỉ định màu cho mục đã chọn
            ]}
          >
            <FontAwesome
              name="address-book"
              size={35}
              color="blue"
              marginLeft={5}
            />
            <View style={{ flexDirection: "row", marginLeft: 4 }}>
              <Text style={{ fontSize: 18, marginLeft: 20 }}>
                Danh sách nhóm
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress("loimoi")}
            style={[
              styles.containerBody_Row,
              selectedButton === "loimoi" && { backgroundColor: "#BFEFFF" }, // Sử dụng điều kiện để chỉ định màu cho mục đã chọn
            ]}
          >
            <Icon name="person-circle-outline" size={42} color="blue" />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, marginLeft: 20 }}>
                Lời mời kết bạn
              </Text>
              <Text style={{ fontSize: 18, marginLeft: 5, color: "red" }}>
                [{friendRequests.length}]
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.8, backgroundColor: "white" }}>
          {renderList()}
        </View>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

export default Contacts;
