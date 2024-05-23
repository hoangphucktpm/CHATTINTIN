import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert,
  FlatList,
  ScrollView,
  LogBox,
} from "react-native";
import styles from "./StyleContacts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons, EvilIcons, Octicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { setForward, setPopup, setReply } from "../../redux/chatSlice";
import { setGroupDetails } from "../../redux/groupSlice";

import Footer from "../Footer/Footer";
import socket from "../../services/socket";
import { api } from "../../apis/api";
import AvatarCustomer from "../../components/AvatarCustomer";
import { setBadge } from "../../redux/appSlice";

function Contacts() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { conversation } = useSelector((state) => state.conversation);

  const [selectedButton, setSelectedButton] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [listFriends, setListFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const phone = user?.phone;
  const groupLists = useMemo(() => {
    return conversation?.map((convers) => convers);
  }, [conversation]);

  // Thêm một state mới để lưu trữ danh sách lời mời kết bạn
  const [friendRequests, setFriendRequests] = useState([]);

  const getFriendRequests = useCallback(async () => {
    const allFriendRequests = await api.getAllFriendRequests(user.ID);
    setFriendRequests(allFriendRequests.data);
    dispatch(setBadge(allFriendRequests.data.length));
  }, [conversation]);

  useEffect(() => {
    socket.on("new friend request server", (data) => {
      if (data.code === 1) {
        Alert.alert("Có một lời mời kết bạn mới");
        getFriendRequests();
      }
    });
    return () => {
      socket.off("new friend request server");
    };
  }, [conversation]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!user) return navigation.navigate("Login");
      const getFriendRequests = async () => {
        const [allFriendRequests, allFriends] = await Promise.all([
          api.getAllFriendRequests(user.ID),
          api.getAllFriends(user.ID),
        ]);
        dispatch(setBadge(allFriendRequests.data.length));
        setFriendRequests(allFriendRequests.data);
        setListFriends(allFriends.data);
        setIsLoading(false);
      };
      getFriendRequests();
    }, [user, receiverId])
  );

  const handleRequest = (id, type) => {
    api
      .handleFriendRequest({ id, type })
      .then((res) => {
        // Alert.alert(res.data.message);
        setReceiverId(id);

        if (res.data.code === 1) {
          socket.emit("load_conversations", { IDUser: user.ID });
          socket.emit("load_conversations", {
            IDUser: res.data.senderID,
          });
          getFriendRequests();
        }
      })
      .catch((err) => {
        Alert.alert("Lỗi", "Không thể thực hiện yêu cầu");
      });
  };

  // reload conversation

  const AddFriend = () => {
    navigation.navigate("AddFriends", { phone: phone });
  };

  const searchData = useMemo(() => {
    if (!searchQuery) return listFriends;
    return listFriends.filter((item) => {
      return item?.fullname?.toLowerCase().includes(searchQuery?.toLowerCase());
    });
  }, [searchQuery, listFriends]);

  const renderList = () => {
    switch (selectedButton) {
      case "friends":
        return (
          <FlatList
            data={searchData}
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
        return (
          <FlatList
            data={friendRequests}
            renderItem={renderFriendRequest}
            keyExtractor={(item, i) => {
              return `${item.ID} ${i.toString()}`;
            }}
          />
        );
      case "block":
        return (
          <FlatList
            data={
              !conversation
                ? []
                : conversation
                    .filter((con) => con?.isBlock)
                    .flatMap((item) => item?.Receiver)
            }
            renderItem={renderFriendBlockedItem}
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
    var imageItem = Receiver.urlavatar;
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
              <AvatarCustomer
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: `${imageItem}` }}
                alt={Receiver.fullname}
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
    const isBlocked = conversation?.find(
      (con) => con?.Receiver?.ID === item?.ID
    )?.isBlock;
    if (isBlocked) return;
    const dataItem = !groupLists?.length
      ? []
      : groupLists.find((data) => data.IDReceiver === item.ID);
    if (!dataItem) return;
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
              <AvatarCustomer
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: item.urlavatar }}
                alt={item.fullname}
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
  const renderFriendBlockedItem = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          dispatch(setReply({ show: false, data: null }));
          dispatch(setGroupDetails(item));
          dispatch(setForward({ show: false, data: null }));
          dispatch(setPopup({ show: false, data: null }));
          const data = {
            ...item,
            isBlock: "blocked",
          };
          navigation.navigate("Chat", data);
        }}
      >
        <View style={styles.containerItem}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <AvatarCustomer
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: item.urlavatar }}
                alt={item.fullname}
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
    var imageItem = item.sender.urlavatar;

    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          navigation.navigate("Chat", item?.sender);
        }}
      >
        <View style={styles.containerItem}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <AvatarCustomer
                style={styles.itemFriend_avatar_avatar}
                source={{ uri: `${imageItem}` }}
                alt={item.sender.fullname}
              />
            </View>
          </View>
          <View style={styles.itemFriend_right}>
            <Text style={{ fontSize: 20, color: "#000" }}>
              {item.sender.fullname}
            </Text>
            <Text style={{ fontSize: 15, color: "#000" }}>Muốn kết bạn !</Text>
          </View>
          <View style={styles.itemFriend_actions}>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => handleRequest(item.id, "DENIED")}
              activeOpacity={0.6}
            >
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Từ chối
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => handleRequest(item.id, "ACCEPTED")}
              activeOpacity={0.6}
            >
              <Text style={{ color: "blue", fontWeight: "bold" }}>Đồng ý</Text>
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
          <EvilIcons name="search" size={30} color="white" />
        </View>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="white"
            onChangeText={(text) => setSearchQuery(text)}
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
        <View style={{ marginLeft: 5, marginRight: 5, marginTop: 10 }}>
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
              selectedButton === "loimoi" && { backgroundColor: "#BFEFFF" },
            ]}
          >
            <Icon name="person-circle-outline" size={42} color="blue" />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, marginLeft: 20 }}>
                Lời mời kết bạn
              </Text>
              <Text style={{ fontSize: 18, marginLeft: 5, color: "red" }}>
                ({friendRequests.length})
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => handleButtonPress("block")}
            style={[
              styles.containerBody_Row,
              selectedButton === "block" && { backgroundColor: "#BFEFFF" }, // Sử dụng điều kiện để chỉ định màu cho mục đã chọn
            ]}
          >
            <Ionicons name="lock-closed" size={42} color="blue" />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, marginLeft: 20 }}>Đã chặn</Text>
              <Text style={{ fontSize: 18, marginLeft: 5, color: "red" }}>
                [{conversation.filter((con) => con?.isBlock).length}]
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>

        <ScrollView style={{ flex: 0.8, backgroundColor: "white" }}>
          {renderList()}
        </ScrollView>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

export default Contacts;