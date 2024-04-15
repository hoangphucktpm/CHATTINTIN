import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "./StyleCreateGroup";
import { AntDesign, Feather, EvilIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";
import { useDispatch } from "react-redux";
import { api } from "../../apis/api";
import Checkbox from "expo-checkbox";

function CreateGroup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [phoneandname, setPhoneandName] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [dataResearch, setDataResearch] = useState([]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchFriends = async () => {
      const [resFriends, resUsers] = await Promise.all([
        api.getAllFriends(user.username),
        api.getUsers(),
      ]);
      setListFriends(resFriends.data);
      setDataResearch(resFriends.data);
      setUsers(resUsers.data);
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

  const toggleItem = (id) => {
    if (isChecked(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const isChecked = (id) => {
    return checkedItems.includes(id);
  };

  const renderItem = ({ item }) => {
    var image =
      item.urlavatar ??
      "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";
    return (
      <TouchableOpacity
        style={{
          height: 60,
          display: "flex",
          flexDirection: "row",
          flex: 1,
          marginBottom: 10,
        }}
        onPress={() => toggleItem(item.ID)}
      >
        <View
          style={{ flex: 0.15, justifyContent: "center", alignItems: "center" }}
        >
          <Checkbox
            value={isChecked(item.ID)}
            style={{ height: 20, width: 20, borderRadius: 100 }}
            onValueChange={() => toggleItem(item.ID)}
          />
        </View>
        <View style={{ flex: 0.15, borderRadius: 100 }}>
          <Image
            source={{ uri: image }}
            style={{ flex: 1, borderRadius: 100 }}
          />
        </View>
        <View style={{ flex: 0.7, marginLeft: 10, justifyContent: "center" }}>
          <Text style={{ fontSize: 22 }}>{item.fullname}</Text>
          <Text style={{ fontSize: 18, color: "grey" }}>2 giờ</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const createGroup = () => {
    if (checkedItems.length <= 1) {
      Alert.alert("Nhắc nhỡ", "Tạo nhóm phải 2 người trở lên");
      return;
    }
    if (!name) {
      alert("Nhắc nhỡ", "Nhập tên nhóm");
      return;
    }
    axios
      .post(
        `http://54.254.183.128/api/rooms`,
        {
          userIds: checkedItems,
          name: name,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((r) => {
        dispatch(userAPI.updateListRoomUI()(r.data));
      })
      .catch((err) => {
        console.log(err);
      });
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
            <TouchableOpacity style={styles.buttonImage}>
              <Feather name="camera" size={32} color="black" />
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
