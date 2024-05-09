import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from "react-native";
import styles from "./StyleCreateGroup";
import { AntDesign, Feather, EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../apis/api";
import Checkbox from "expo-checkbox";
import { Buffer } from "buffer";
import socket from "../../services/socket";
import { Avatar } from "@ui-kitten/components";
import AvatarCustomer from "../../components/AvatarCustomer";
function CreateGroup({ route }) {
  const navigation = useNavigation();

  const [name, setName] = useState();
  const [phoneandname, setPhoneandName] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [dataResearch, setDataResearch] = useState([]);
  const [groupAvatar, setGroupAvatar] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (route.params?.member) setCheckedItems([route.params.member]);

    const fetchFriends = async () => {
      const resFriends = await api.getAllFriends(user.username);

      setListFriends(resFriends.data);
      setDataResearch(resFriends.data);
    };
    fetchFriends();
  }, []);

  const sdt = useMemo(() => /^\84\d{9}$/, []);
  useEffect(() => {
    if (!phoneandname) {
      setDataResearch(listFriends);
      return;
    }

    const lowerCaseName = phoneandname.toLowerCase();

    let rs = [];
    if (sdt.test(phoneandname)) {
      rs = users.filter(
        (fr) => fr.phone === phoneandname && fr.phone !== user.phone
      );
    } else {
      rs = listFriends.filter((fr) =>
        fr.fullname.toLowerCase().includes(lowerCaseName)
      );
    }
    setDataResearch(rs);
  }, [phoneandname, listFriends, users, user]);

  const toggleItem = (item) => {
    if (isChecked(item.ID)) {
      setCheckedItems(checkedItems.filter((item) => item.ID !== item.ID));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const isChecked = useCallback(
    (id) => {
      return checkedItems.find((item) => item.ID === id);
    },
    [checkedItems]
  );

  const renderItem = ({ item }) => {
    var image = item.urlavatar;
    return (
      <TouchableOpacity
        style={{
          height: 60,
          display: "flex",
          flexDirection: "row",
          flex: 1,
          marginBottom: 10,
        }}
        onPress={() => toggleItem(item)}
      >
        <View
          style={{ flex: 0.15, justifyContent: "center", alignItems: "center" }}
        >
          <Checkbox
            value={isChecked(item.ID)}
            style={{ height: 20, width: 20, borderRadius: 100 }}
            onValueChange={() => toggleItem(item)}
          />
        </View>
        <View style={{ flex: 0.15, borderRadius: 100 }}>
          <AvatarCustomer
            alt={item.fullname}
            source={{ uri: image }}
            style={{ flex: 1, borderRadius: 100, width: 60 }}
          />
        </View>
        <View style={{ flex: 0.7, marginLeft: 10, justifyContent: "center" }}>
          <Text style={{ fontSize: 22 }}>{item.fullname}</Text>
          <Text style={{ fontSize: 18, color: "grey" }}>2 giờ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled) {
        const image = result.assets.flatMap((img) =>
          Buffer.from(img.base64, "base64")
        );

        setImageSelected(`data:image/jpeg;base64,${result.assets[0].base64}`);

        setGroupAvatar(image[0]);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Không thể chọn ảnh");
    }
  };

  const createGroup = async () => {
    if (checkedItems.length <= 1) {
      Alert.alert("Nhắc nhỡ", "Tạo nhóm phải 2 người trở lên");
      return;
    }
    if (!name) {
      Alert.alert("Nhắc nhỡ", "Nhập tên nhóm");
      return;
    }
    if (!groupAvatar) {
      Alert.alert("Nhắc nhỡ", "Chọn ảnh nhóm");
      return;
    }
    const data = {
      IDOwner: user.ID,
      groupName: name,
      groupMembers: [user.ID, ...checkedItems.flatMap((item) => item.ID)],
      groupAvatar,
    };

    try {
      socket.emit("create_group_conversation", data);

      Alert.alert("Thành công", "Tạo nhóm thành công");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Thất bại", "Tạo nhóm thất bại");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerIcon}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.button}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}> Tạo nhóm mới</Text>
        </View>
      </View>
      <View style={styles.containerBody}>
        <View style={styles.containerBodyHeader}>
          <View style={styles.containerBodyHeader_Image}>
            <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
              {imageSelected ? (
                <Image
                  source={{ uri: imageSelected }}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 100,
                  }}
                />
              ) : (
                <Feather name="camera" size={32} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.containerBodyHeader_Input}>
            <TextInput
              onChangeText={(x) => setName(x)}
              value={name}
              placeholder="Đặt tên nhóm"
              style={{ fontSize: 22, flex: 1, marginLeft: 10 }}
            />
          </View>
        </View>
        <View style={styles.containerBodySearch}>
          <View style={styles.containerBodySearchItem}>
            <View style={{ flex: 0.1, alignItems: "center" }}>
              <EvilIcons name="search" size={32} color="black" />
            </View>
            <View style={{ flex: 0.8 }}>
              <TextInput
                onChangeText={(x) => setPhoneandName(x)}
                value={phoneandname}
                placeholder="Tìm tên hoặc số điện thoại"
                style={{
                  fontSize: 18,
                  flex: 1,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
            </View>
            <View style={{ flex: 0.1, alignItems: "center" }}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => setPhoneandName("")}
              />
            </View>
          </View>
        </View>
        <View style={styles.flatList}>
          <SwipeListView
            nestedScrollEnabled={true}
            data={dataResearch}
            renderItem={renderItem}
            keyExtractor={(item, i) => item.ID + i}
          />
        </View>
        <View style={styles.buttonCreate}>
          <FlatList
            horizontal
            data={checkedItems}
            keyExtractor={(item, i) => item.ID + i}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleItem(item)}
                style={{ marginRight: 5 }}
              >
                <AvatarCustomer
                  source={{ uri: item.urlavatar }}
                  alt={item.fullname}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={createGroup}
            style={styles.buttonCreateGroup}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CreateGroup;
