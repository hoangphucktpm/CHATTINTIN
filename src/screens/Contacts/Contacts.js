import React from "react";
import {
  StyleSheet,
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
import { set } from "date-fns";
import { useRoute } from "@react-navigation/native";
import { api } from "../../apis/api";
import { useSelector } from "react-redux";
import { Octicons } from "@expo/vector-icons";

function Contacts() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);


  const [selectedButton, setSelectedButton] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [listFriends, setListFriends] = useState([]);

  const phone = user?.phone;

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

  useEffect(() => {
    console.log("receiverId", receiverId);
    // Listen for a 'friend request received' event from the server
    socket.on("friend request received", (response) => {
      if (response.receiverId === receiverId) {
        Alert.alert("Thông báo", "Bạn đã nhận được lời mời kết bạn");

        // Cập nhật danh sách lời mời kết bạn
        setFriendRequests((prevRequests) => [...prevRequests, response]);
        setReceiverId(null);
      }
    });

    // Clean up the effect
    return () => socket.off("friend request received");
  }, [receiverId]);

  const Data1 = [
    {
      id: "1",
      name: "Nhóm 1",
      image:
        "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
      lastMessage: "Chào bạn",
      time: "2022-01-01",
    },
    {
      id: "2",
      name: "Nhóm 2",
      image:
        "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
      lastMessage: "Chào bạn",
      time: "2022-01-01",
    },
  ];

  // Lời mời kết bạn kèm theo chức năng chấp nhận hoặc từ chối
  const Data2 = [
    {
      id: "1",
      name: "Nguyễn Văn AAA",
      image:
        "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
      lastMessage: "Chào bạn",
      time: "2022-01-01",
    },
    {
      id: "2",
      name: "Nguyễn Văn B",
      image:
        "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
      lastMessage: "Chào bạn",
      time: "2022-01-01",
    },
    {
      id: "3",
      name: "Nguyễn Văn B",
      image:
        "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
      lastMessage: "Chào bạn",
      time: "2022-01-01",
    },
  ];

  const hanldPress = () => {
    navigation.navigate("ScannerQR");
  };
  const hanldPressCreateGroup = () => {
    navigation.navigate("CreateGroup");
  };

  const sreach = () => {
    // mở thanh tìm kiếm
  };

  const handleAccept = (id) => {
    api
      .handleFriendRequest({ id, type: "ACCEPTED" })
      .then((res) => {
        Alert.alert(res.data.message);
        setReceiverId(id);
      })
      .catch((err) => {
        Alert.alert("Error handle friend requests");
      });
  };

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
            renderItem={renderItem}
            keyExtractor={(item) => item.ID}
          />
        );
      case "Group":
        return (
          <FlatList
            data={Data1}
            renderItem={renderItem1}
            keyExtractor={(item) => item.ID}
          />
        );
      case "loimoi":
        // Lời mời kết bạn kèm theo chức năng chấp nhận hoặc từ chối, hiện icon chấp nhận và từ chối ra trong mỗi item
        return (
          <FlatList
            data={friendRequests}
            renderItem={renderItem2}
            keyExtractor={(item) => item.ID}
          />
        );
      default:
        return (
          <FlatList
            data={listFriends}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID}
          />
        );
    }
  };

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderItem = ({ item }) => {
    console.log(item);
    var imageItem =
      item.urlavatar ??
      "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";
    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          const id = item.ID;
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
            <Text style={{ fontSize: 20 }}>{item.fullname}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderItem2 = ({ item }) => {
    var imageItem =
      item.sender.urlavatar ??
      "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";

    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          const id = item.id;
          // dispatch(roomAPI.getListChat()({ accessToken, id }));
          // dispatch(roomAPI.saveRoomId()(id))
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
              onPress={() => handleAccept(item.id)}
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

  const renderItem1 = ({ item }) => {
    var imageItem =
      item.image == undefined
        ? "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
        : item.image;
    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          const id = item.id;
          // dispatch(roomAPI.getListChat()({ accessToken, id }));
          // dispatch(roomAPI.saveRoomId()(id))
          navigation.navigate("Chat", {
            id: item.id,
            name: item.name,
            image: imageItem,
            lastMessage: item.lastMessage,
            time: item.time,
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
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerIcon}>
        <EvilIcons
            name="search"
            size={30}
            color="white"
            onPress={sreach}
          />
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
            <Ionicons name="person-add" size={24} color="white" marginRight={10} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddGroup");
            }}
            style={styles.containerIconAdd}
          >
            <Ionicons name="md-people" size={26} color="white" />
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

            <Octicons name="feed-person" size={35} color="blue" marginLeft={5} />

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
            <FontAwesome name="address-book" size={35} color="blue" marginLeft={5} />
            <View style={{ flexDirection: "row", marginLeft: 4 }}>
            <Text style={{ fontSize: 18, marginLeft: 20 }}>Danh sách nhóm</Text>
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
          {/* <SwipeListView  nestedScrollEnabled={true} data ={Data} renderItem={renderItem} /> */}
          {renderList()}
        </View>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

export default Contacts;
