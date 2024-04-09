import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleAddFriends";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { api } from "../../apis/api";
import socket from "../../services/socket";
import { useEffect } from "react";
import { useSelector } from "react-redux";
 
// Import FireBase
const AddFriends = (props) => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState(""); // Số điện thoại người dùng nhập
  const [searchData, setSearchData] = useState([]); // Dữ liệu tìm kiếm
  const route = useRoute();
  const {user} = useSelector((state) => state.auth);
  const phone =user.phone;



  const hanldPressDashBoard = () => {
    navigation.navigate("Contacts");
  };

  const Search  = async () => {
    try {
      const res = await api.getUserByPhone(phoneNumber);
      console.log('Response from api.getUserByPhone:', res);
      if (res.data) {
        setSearchData([res.data]);
      } else {
        Alert.alert("Thông báo", "Không tìm thấy người dùng");
      }
    } catch (error) {
      Alert.alert("Thông báo", "Không tìm thấy người dùng");
    }
  };


  const renderItem = ({ item }) => {
    const urlavatar = item.urlavatar || "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";
    return (
      <TouchableHighlight
        underlayColor={"#E6E6FA"}
        style={styles.touchHightLight}
        onPress={() => {
          navigation.navigate("FriendProfile", item);
        }}
      >
        <View style={styles.containerItem}>
          <View style={styles.itemFriend_info}>
            <View style={styles.itemFriend_avatar}>
              <Image
                style={styles.itemFriend_avatar_avatar}
                source={{ uri : urlavatar }}
              />
            </View>
          </View>
          <View style={styles.itemFriend_right}>
            <Text style={{ fontSize: 20 }}>{item.fullname}</Text>
            <Text style={{ fontSize: 16 }}>{item.phone}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const hanldPressHuy = () => {
    navigation.navigate("Contacts");
  };

  useEffect(() => {
    // Listen for connect event
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  
    // Listen for disconnect event
    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
  
    // Listen for error event
    socket.on('error', (error) => {
      console.log('An error occurred:', error);
    });
  
    // Listen for reconnect event
    socket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected to the server after', attemptNumber, 'attempts');
    });
  
    // Clean up the effect
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('error');
      socket.off('reconnect');
    };
  }, []);
  
  const hanldPressAdd = () => {
    // Emit a 'new friend request client' event to the server with the senderId and receiverId
    socket.emit('new friend request client', { senderId: phone, receiverId: phoneNumber });
    Alert.alert("Thông báo", "Bạn đã gửi lời mời kết bạn thành công");

    console.log('senderId:', phone);
    console.log('receiverId:', phoneNumber);
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.containerTabBar}>
        <TouchableOpacity
          onPress={hanldPressDashBoard}
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
          style={{ width: "73%", justifyContent: "center", paddingTop: 10 }}
        >
          <Text style={{ fontSize: 22, color: "white" }}>Thêm bạn</Text>
        </View>
      </View>
      <View style={styles.containerInput}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            padding: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 10,
                backgroundColor: "#fff",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 24, marginRight: 20 }}>+84</Text>
              <TextInput
                value={phoneNumber.substring(3)} // Lấy phần tử từ index 3 đến hết để loại bỏ 84
                onChangeText={(text) => setPhoneNumber(`84${text}`)} // Thêm 84 vào đầu chuỗi số điện thoại
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                maxLength={9}
                style={{ flex: 1, fontSize: 24 }}
              />
            </View>
          </View>
          <TouchableOpacity onPress={Search } style={{ marginLeft: 10 }}>
            <Text
              style={{ color: "#1E90FF", fontSize: 20, fontWeight: "bold" }}
            >
              Tìm kiếm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.8, backgroundColor: "white" }} >

      {        console.log(Array.isArray(searchData))

}
        <FlatList
          data={searchData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <Button title="Hủy" onPress={hanldPressHuy} color="#808080" />
        <View style={{ width: 20 }} />
        <Button title="Kết bạn" onPress={hanldPressAdd} />
      </View>
    </View>
  );
};

export default AddFriends;
