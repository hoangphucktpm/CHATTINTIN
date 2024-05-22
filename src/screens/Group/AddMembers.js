import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./StyleCreateGroup";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { TopNavigation } from "@ui-kitten/components";
import { api } from "../../apis/api";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import socket from "../../services/socket";
import { setGroupDetails, setMemberGroups } from "../../redux/groupSlice";
import AvatarCustomer from "../../components/AvatarCustomer";

const AddMembers = () => {
  const [phoneandname, setPhoneandName] = useState(null);
  const [dataResearch, setDataResearch] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.auth.user);
  const members = useSelector((state) => state.group.members);
  const groupDetails = useSelector((state) => state.group.groupDetails);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchFriends = async () => {
      const resFriends = await api.getAllFriends(user.username);

      const data = resFriends.data.filter((item) => {
        return members.find((mem) => mem.ID !== item.ID);
      });

      setListFriends(data);
      setDataResearch(data);
    };
    fetchFriends();
  }, []);

  const searchData = useMemo(() => {
    if (!searchQuery) return dataResearch;
    return dataResearch.filter((item) => {
      return (
        item?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.phone?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, dataResearch]);

  const toggleItem = (item) => {
    if (isChecked(item.ID)) {
      setCheckedItems(checkedItems.filter((i) => i.ID !== item.ID));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const isChecked = (id) => {
    return checkedItems.find((item) => item.ID === id);
  };
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    var image = item.urlavatar;
    return (
      <TouchableOpacity
        style={{
          height: 60,
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
          alignItems: "center",
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
            style={{ borderRadius: 100, width: 40, height: 40 }}
          />
        </View>
        <View style={{ flex: 0.7, marginLeft: 10, justifyContent: "center" }}>
          <Text style={{ fontSize: 22 }}>{item.fullname}</Text>
          <Text style={{ fontSize: 18, color: "grey" }}>2 giờ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleAdd = () => {
    if (checkedItems.length === 0) return;
    const data = {
      IDConversation: groupDetails.IDConversation,
      IDUser: user.ID,
      groupMembers: checkedItems.flatMap((item) => item.ID),
    };

    socket.emit("add_member_to_group", data);
    dispatch(setMemberGroups([...members, ...checkedItems]));
    dispatch(
      setGroupDetails({
        ...groupDetails,
        groupMembers: [...members, ...checkedItems],
      })
    );
    navigation.navigate("Chat", groupDetails);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TopNavigation
          accessoryLeft={() => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={32} color="black" />
            </TouchableOpacity>
          )}
          alignment="center"
          title="Thêm thành viên"
        />
        <View style={styles.containerBodySearch}>
          <View style={styles.containerBodySearchItem}>
            <View style={{ flex: 0.1, alignItems: "center" }}>
              <EvilIcons name="search" size={32} color="black" />
            </View>
            <View style={{ flex: 0.8 }}>
              <TextInput
                onChangeText={(text) => setSearchQuery(text)}
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
        <ScrollView style={styles.flatList}>
          {searchData.map((item) => {
            if (
              members.some((mem) => mem.ID === item.ID) ||
              item.ID === user.ID
            )
              return null;
            return renderItem({ item });
          })}
        </ScrollView>
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
            onPress={handleAdd}
            style={styles.buttonCreateGroup}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMembers;
