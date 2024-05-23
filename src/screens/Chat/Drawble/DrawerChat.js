import React, { useCallback, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import styles from "./StyleDrawerChat";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import DrawerChatModal from "./DrawerChatModal";
import { setDrawerModal } from "../../../redux/chatSlice";
import AvatarCustomer from "../../../components/AvatarCustomer";
import { api } from "../../../apis/api";
import socket from "../../../services/socket";

function DrawerChat({ navigation, route }) {
  const { fullname, phone, urlavatar, IDConversation, isBlock } = route.params;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const { conversation } = useSelector((state) => state.conversation);

  const groupLists = useMemo(() => {
    return conversation
      ?.map((convers) => convers)
      .filter(
        (data) =>
          data.isGroup &&
          (data.rules.IDOwner === user.ID ||
            data.rules.listIDCoOwner.includes(user.ID)) &&
          !data.groupMembers.includes(phone)
      );
  }, [conversation]);

  useFocusEffect(
    useCallback(() => {
      const imgs = messages
        .filter((msg) => msg.type === "image" && !msg.isRecall)
        .flatMap((msg) => msg.content);
      setImages(imgs);

      // socket.emit("get_block_friend", { IDUser: user.ID, friendID: phone });
    }, [messages])
  );

  // Add navigation prop here
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [name, setName] = useState(fullname);
  const [isBFF, setIsBFF] = useState(false);
  const [images, setImages] = useState([]);

  const hanldPressGoBack = () => {
    navigation.goBack();
  };

  const updateName = async () => {
    setIsDialogVisible(false);
  };

  const onOpenDrawerModal = () => {
    dispatch(
      setDrawerModal({
        show: true,
        data: groupLists,
        selection: phone,
      })
    );
  };

  handleCreateGroup = () => {
    navigation.navigate("CreateGroup", {
      member: { ID: phone, urlavatar, fullname },
    });
  };

  const handleViewGeneralGroup = () => {
    const generalGroup = conversation
      ?.map((convers) => convers)
      .filter((data) => data.isGroup && data.groupMembers.includes(phone));
    dispatch(
      setDrawerModal({
        show: true,
        data: generalGroup,
      })
    );
  };

  const handleViewProfile = () => {
    navigation.navigate("FriendProfile", route.params);
  };

  const handleUnfriend = async () => {
    try {
      // alert confirm
      Alert.alert(
        "Hủy kết bạn",
        "Bạn có chắc chắn muốn hủy kết bạn với người này?",
        [
          {
            text: "Hủy",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const res = await api.unfriend({
                senderId: user.ID,
                receiverId: phone,
              });
              Alert.alert("Thông báo", "Hủy kết bạn thành công");
              socket.emit("load_conversations", { IDUser: phone });
              socket.emit("load_conversations", { IDUser: user.ID });
              navigation.navigate("Home");
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = () => {
    const data = {
      IDConversation1: IDConversation,
      IDSender: user.ID,
      IDReceiver: phone,
    };
    const data2 = {
      IDConversation1: IDConversation,
      IDSender: phone,
      IDReceiver: user.ID,
    };

    socket.emit("block_friend", data);
    // socket.emit("block_friend", data2);
    navigation.navigate("Home");
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.containerTabBar}>
          <TouchableOpacity onPress={hanldPressGoBack} style={styles.button}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
          </TouchableOpacity>
          <View
            style={{
              width: "73%",
              paddingTop: 10,
              paddingLeft: 10,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 24, color: "white" }}>Tùy chọn</Text>
          </View>
        </View>

        <ScrollView style={{ paddingBottom: 600 }}>
          <View style={styles.containerBody}>
            <View style={styles.containerBody_Top}>
              <AvatarCustomer
                style={styles.containerBody_Top_Avt}
                source={{ uri: urlavatar }}
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
                {name}
              </Text>
              <View style={styles.containerBody_Top_Icon}>
                <TouchableOpacity style={styles.containerBody_Top_Icon_Icon}>
                  <View style={styles.containerBody_Top_Icon_IconItem}>
                    <Ionicons name="search" size={20} color="black" />
                  </View>
                  <View style={styles.containerBody_Top_Icon_IconText}>
                    <Text style={{ color: "#4F4F4F", textAlign: "center" }}>
                      Tìm {"\n"} tin nhắn
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.containerBody_Top_Icon_Icon}
                  onPress={handleViewProfile}
                >
                  <View style={styles.containerBody_Top_Icon_IconItem}>
                    <AntDesign name="user" size={20} color="black" />
                  </View>
                  <View style={styles.containerBody_Top_Icon_IconText}>
                    <Text style={{ color: "#4F4F4F", textAlign: "center" }}>
                      Trang {"\n"} cá nhân
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerBody_Top_Icon_Icon}>
                  <View style={styles.containerBody_Top_Icon_IconItem}>
                    <AntDesign name="picture" size={20} color="black" />
                  </View>
                  <View style={styles.containerBody_Top_Icon_IconText}>
                    <Text style={{ color: "#4F4F4F", textAlign: "center" }}>
                      Đổi {"\n"} hình nền
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerBody_Top_Icon_Icon}>
                  <View style={styles.containerBody_Top_Icon_IconItem}>
                    <AntDesign name="bells" size={20} color="black" />
                  </View>
                  <View style={styles.containerBody_Top_Icon_IconText}>
                    <Text style={{ color: "#4F4F4F", textAlign: "center" }}>
                      Tắt {"\n"} thông báo
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerBody_Mid}>
              <View style={styles.containerBody_Mid_ChangeName}>
                {user.iD !== phone ? (
                  <TouchableOpacity
                    onPress={() => setIsDialogVisible(true)}
                    style={styles.containerBody_Mid_ChangeName_Item}
                  >
                    <Ionicons
                      name="pencil"
                      size={24}
                      color="#828282"
                      style={{ width: "15%", height: "100%" }}
                    />
                    <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                      <Text style={{ fontSize: 20, color: "black" }}>
                        Đổi tên gợi nhớ
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
                <View style={styles.containerBody_Mid_ChangeName_Item}>
                  <MaterialCommunityIcons
                    name="star-outline"
                    size={30}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Đánh dấu bạn thân
                    </Text>
                    <Switch
                      style={{ marginRight: 10, marginBottom: 15 }}
                      value={isBFF}
                      onValueChange={(value) => {
                        setIsBFF(value);
                      }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.containerBody_Mid_ChangeName_Item}
                >
                  <AntDesign
                    name="clockcircleo"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Nhật kí chung
                    </Text>
                    <AntDesign
                      name="right"
                      size={15}
                      color="black"
                      style={{ paddingRight: 10, paddingTop: 5 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerBody_Mid_File}>
              <TouchableOpacity
                style={styles.containerBody_Mid_File_Item}
                onPress={() => navigation.navigate("SourcesMessages", messages)}
              >
                <Ionicons
                  name="folder-outline"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_File_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Ảnh, file, link đã gửi
                  </Text>
                  <AntDesign
                    name="right"
                    size={15}
                    color="black"
                    style={{ paddingRight: 10 }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.containerBody_Mid_File_Item}>
                <View style={{ width: "15%", height: "100%" }} />
                <View style={styles.containerBody_Mid_File_Item_Img}>
                  {images.length > 0 ? (
                    images.slice(0, 4).map((img, index) => (
                      <TouchableOpacity key={index}>
                        <Image
                          style={styles.fileImg}
                          source={{
                            uri: img,
                          }}
                        />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text>
                      {" "}
                      Hình mới nhất của cuộc {"\n"} trò chuyện sẽ xuất hiện ở
                      đây
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SourcesMessages", messages)
                    }
                  >
                    <View style={styles.fileImg_View}>
                      <Feather name="arrow-right" size={24} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.containerBody_Mid_Group}>
              <TouchableOpacity
                style={styles.containerBody_Mid_ChangeName_Item}
                onPress={handleCreateGroup}
              >
                <MaterialIcons
                  name="groups"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Tạo nhóm với {fullname}
                  </Text>
                  <AntDesign
                    name="right"
                    size={15}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 5 }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerBody_Mid_ChangeName_Item}
                onPress={onOpenDrawerModal}
              >
                <AntDesign
                  name="addusergroup"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Thêm {fullname} vào nhóm
                  </Text>
                  <AntDesign
                    name="right"
                    size={15}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 5 }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerBody_Mid_ChangeName_Item}
                onPress={handleViewGeneralGroup}
              >
                <MaterialIcons
                  name="group"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Xem nhóm chung
                  </Text>
                  <AntDesign
                    name="right"
                    size={15}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 5 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/* Funtion */}
            <View style={styles.containerBody_Mid_Funtion}>
              <View style={styles.containerBody_Mid_ChangeName_Item}>
                <AntDesign
                  name="pushpino"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Ghim trò chuyện
                  </Text>
                  <Switch
                    style={{ marginRight: 10, marginBottom: 15 }}
                    value={isBFF}
                    onValueChange={(value) => {
                      setIsBFF(value);
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.containerBody_Mid_ChangeName_Item}
              >
                <AntDesign
                  name="filter"
                  size={24}
                  color="#828282"
                  style={{
                    width: "15%",
                    height: "100%",
                  }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <View>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Phân loại
                    </Text>
                    <Text style={{ fontSize: 16, color: "black" }}>
                      Ưu tiên
                    </Text>
                  </View>
                  <AntDesign
                    name="right"
                    size={15}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 5 }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.containerBody_Mid_ChangeName_Item}>
                <Entypo
                  name="eye-with-line"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Ẩn trò chuyện
                  </Text>
                  <Switch
                    style={{ marginRight: 10, marginBottom: 15 }}
                    value={isBFF}
                    onValueChange={(value) => {
                      setIsBFF(value);
                    }}
                  />
                </View>
              </View>
              <View style={styles.containerBody_Mid_ChangeName_Item}>
                <Feather
                  name="phone-incoming"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Báo cuộc gọi đến
                  </Text>
                  <Switch
                    style={{ marginRight: 10, marginBottom: 15 }}
                    value={isBFF}
                    onValueChange={(value) => {
                      setIsBFF(value);
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.containerBody_Mid_ChangeName_Item}
              >
                <FontAwesome5
                  name="users-cog"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Cài đặt cá nhân
                  </Text>
                  <AntDesign
                    name="right"
                    size={15}
                    color="black"
                    style={{ paddingRight: 10, paddingTop: 5 }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.containerBody_Mid_ChangeName_Item}>
                <MaterialIcons
                  name="lock-clock"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <View>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Tin nhắn tự xóa
                    </Text>
                    <Text style={{ fontSize: 16, color: "black" }}>
                      Không tự xóa
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Report */}
            <View style={styles.containerBody_Mid_Report}>
              <TouchableOpacity
                style={styles.containerBody_Mid_ChangeName_Item}
              >
                <MaterialIcons
                  name="report-problem"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>Báo xấu</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerBody_Mid_ChangeName_Item}
                onPress={handleBlock}
              >
                <Entypo
                  name="block"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {isBlock !== "blocled" ? " Chặn" : "Bỏ Chặn"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUnfriend}
                style={styles.containerBody_Mid_ChangeName_Item}
              >
                <Entypo
                  name="circle-with-minus"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Hủy kết bạn
                  </Text>
                </View>
              </TouchableOpacity>
              {user.ID !== phone ? (
                <TouchableOpacity
                  style={styles.containerBody_Mid_ChangeName_Item}
                >
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "red" }}>
                      Xóa cuộc trò chuyện
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}
          >
            <Dialog.Title style={{ fontSize: 23 }}>
              Nhập tên cần đổi
            </Dialog.Title>
            <Dialog.Content>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{ fontSize: 24, borderBottomWidth: 1 }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsDialogVisible(false)}>Thoát</Button>
              <Button onPress={updateName}>Xác nhận</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <DrawerChatModal />
    </Provider>
  );
}
export default DrawerChat;