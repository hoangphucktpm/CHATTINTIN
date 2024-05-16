import React, { useCallback, useEffect, useMemo, useRef } from "react";
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
import styles from "./StyleDrawerChatGroup";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Avatar, Card, CheckBox, Input, Modal } from "@ui-kitten/components";
import { api, http } from "../../../apis/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { setGroupDetails, setMemberGroups } from "../../../redux/groupSlice";
import socket from "../../../services/socket";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from "buffer";
import AvatarCustomer from "../../../components/AvatarCustomer";

function DrawerChatGroup({ navigation }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [nameChange, setnameChange] = useState("");
  const [isBFF, setIsBFF] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const [images, setImages] = useState([]);
  const [searchQuery, seTsearchQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [isUserSelected, setIsUserSelected] = useState(null);
  const [dataResearch, setDataResearch] = useState([]);
  const [isDeleteGroup, setisDeleteGroup] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [newNameGroup, setNewNameGroup] = useState(null);
  const [isEditNameGroup, seTisEditNameGroup] = useState(false);

  const { conversation } = useSelector((state) => state.conversation);
  const groupDetails = useSelector((state) => state.group.groupDetails);
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.auth.user);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const dispatch = useDispatch();

  const isOwner = groupDetails?.rules?.IDOwner === user.ID;
  const allowUpdateInfoGroup =
    isOwner || groupDetails.rules.listIDCoOwner.includes(user.ID);

  useFocusEffect(
    useCallback(() => {
      const imgs = messages
        .filter((msg) => msg.type === "image" && !msg.isRecall)
        .flatMap((msg) => msg.content);
      setImages(imgs);
    }, [messages])
  );

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await api.getMembers({
        IDConversation: groupDetails.IDConversation,
        IDSender: user.ID,
      });
      dispatch(setMemberGroups(res.data));
      setMembers(res.data);
      setDataResearch(res.data.filter((item) => !item.isOwner));
    };
    fetchMembers();
  }, [user.ID, conversation]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (result.cancelled) {
        console.log("Image selection cancelled");
        return;
      }

      const formData = new FormData();
      formData.append("IDConversation", groupDetails.IDConversation);
      formData.append("groupName", groupDetails.groupName);
      formData.append("groupAvatar", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "avatar.jpg",
      });

      // log groupavatar form
      console.log("GroupAvatar form:", formData.getAll());

      await updateGroupInfo(formData, "Đổi ảnh đại diện nhóm thành công");
      setImageSelected(`data:image/jpeg;base64,${result.assets[0].base64}`);
      // dispatch(setGroupDetails({ ...groupDetails, groupAvatar: result.uri }));
    } catch (error) {
      console.error("Error picking image:", error);
      console.error("Error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server Error:", error.response.data);
        console.error("Status Code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response from server:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }
      Alert.alert("Không thể chọn ảnh");
    }
  };

  const handleEditNameGroup = async () => {
    try {
      const formData = new FormData();
      formData.append("IDConversation", groupDetails.IDConversation);
      formData.append("groupName", newNameGroup);
      // formData.append("groupAvatar", {
      //   uri: groupDetails.groupAvatar,
      //   type: "image/jpeg",
      //   name: "avatar.jpg",
      // });
      // formData.append("groupAvatar", undefined);

      await updateGroupInfo(formData, "Đổi tên nhóm thành công");
      dispatch(setGroupDetails({ ...groupDetails, groupName: newNameGroup }));
      seTisEditNameGroup(false);
    } catch (error) {
      console.error("Error update name group:", error);
      Alert.alert("Thất bại", "Đổi tên nhóm thất bại");
    }
  };

  const updateGroupInfo = async (formData, successMessage) => {
    await http.post("conversation/update-info-group", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    Alert.alert("Thành công", "Cập nhật thành công");
    socket.emit("load_member_of_group", {
      IDConversation: groupDetails.IDConversation,
    });
  };

  const hanldPressGoBack = () => {
    navigation.goBack();
  };

  const updateName = async () => {
    setIsDialogVisible(false);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handleLeaveGroup = async () => {
    if (groupDetails.rules.IDOwner === user.ID) {
      setIsLeave(false);
      return handlePresentModalPress();
    }
    try {
      await api.leaveGroup({
        IDConversation: groupDetails.IDConversation,
        IDSender: user.ID,
      });
      setIsLeave(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  const onSelection = (mem) => {
    setIsUserSelected(mem.ID);
  };

  const handleSearch = (text) => {
    seTsearchQuery(text);
    if (!text) setDataResearch(members.filter((item) => !item.isOwner));
    const data = members.filter((mem) => {
      return (
        mem.fullname.toLowerCase().includes(text.toLowerCase()) ||
        mem.ID.toLowerCase().includes(text.toLowerCase())
      );
    });
    setDataResearch(data.filter((item) => !item.isOwner));
  };

  const handleChangeOwner = () => {
    const data = {
      IDConversation: groupDetails.IDConversation,
      IDUser: user.ID,
      IDNewOwner: isUserSelected,
    };
    socket.emit("change_owner_group", data);
    setIsUserSelected(null);
    handleCloseModal();
    handleLeaveGroup();
    navigation.navigate("Home");
  };
  const handleDeleteGroup = async () => {
    if (groupDetails.rules.IDOwner !== user.ID) return;

    const data = {
      IDConversation: groupDetails.IDConversation,
      IDUser: user.ID,
    };
    socket.emit("delete_group", data);
    setisDeleteGroup(false);
    navigation.navigate("Home");
  };

  return (
    <Provider>
      <GestureHandlerRootView style={styles.container}>
        <View>
          <View style={styles.containerTabBar}>
            <TouchableOpacity onPress={hanldPressGoBack} style={styles.button}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={32}
                color="white"
              />
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

          <ScrollView>
            <View style={styles.containerBody}>
              <View style={styles.containerBody_Top}>
                <AvatarCustomer
                  style={styles.containerBody_Top_Avt}
                  source={{ uri: imageSelected || groupDetails.groupAvatar }}
                />
                <View style={{ position: "relative" }}>
                  {!isEditNameGroup ? (
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "black",
                        marginTop: 10,
                      }}
                    >
                      {groupDetails.groupName}
                    </Text>
                  ) : (
                    <TextInput
                      value={newNameGroup}
                      onChangeText={(text) => setNewNameGroup(text)}
                      style={{ fontSize: 30 }}
                    />
                  )}
                  {allowUpdateInfoGroup && (
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        backgroundColor: "#ddd",
                        borderRadius: 100,
                        padding: 5,
                        right: -30,
                      }}
                      onPress={() => {
                        if (isEditNameGroup) {
                          handleEditNameGroup();
                        } else {
                          seTisEditNameGroup(true);
                          setNewNameGroup(groupDetails.groupName);
                        }
                      }}
                    >
                      <MaterialIcons
                        name={isEditNameGroup ? "check" : "edit"}
                      />
                    </TouchableOpacity>
                  )}
                </View>
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
                    onPress={() => navigation.navigate("ShowMemberGroup")}
                    style={styles.containerBody_Top_Icon_Icon}
                  >
                    <View style={styles.containerBody_Top_Icon_IconItem}>
                      <AntDesign name="user" size={20} color="black" />
                    </View>
                    <View style={styles.containerBody_Top_Icon_IconText}>
                      <Text style={{ color: "#4F4F4F", textAlign: "center" }}>
                        Xem {"\n"} thành viên
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {allowUpdateInfoGroup && (
                    <TouchableOpacity
                      onPress={pickImage}
                      style={styles.containerBody_Top_Icon_Icon}
                    >
                      <View style={styles.containerBody_Top_Icon_IconItem}>
                        <FontAwesome5 name="brush" size={20} color="black" />
                      </View>
                      <View style={styles.containerBody_Top_Icon_IconText}>
                        <Text style={{ color: "#4F4F4F", textAlign: "center" }}>
                          Đổi {"\n"} avatar
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}

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
              <View style={styles.containerBody_Mid_File}>
                <TouchableOpacity
                  style={styles.containerBody_Mid_File_Item}
                  onPress={() =>
                    navigation.navigate("SourcesMessages", messages)
                  }
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
                    {images.slice(0, 4).map((img, index) => (
                      <TouchableOpacity key={index}>
                        <Image
                          style={styles.fileImg}
                          source={{
                            uri: img,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
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
                  onPress={() => navigation.navigate("ShowMemberGroup")}
                >
                  <MaterialIcons
                    name="groups"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Xem thành viên
                    </Text>
                    <Text
                      style={{ fontSize: 18, marginRight: 140, color: "gray" }}
                    >
                      ({groupDetails.groupMembers.length})
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
                >
                  <AntDesign
                    name="adduser"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Phê duyệt thành viên mới
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
                >
                  <AntDesign
                    name="link"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <View style={{ marginBottom: 15 }}>
                      <Text style={{ fontSize: 20, color: "black" }}>
                        Link tham gia nhóm
                      </Text>
                      <Text style={{ fontSize: 16, color: "gray" }}>
                        https://chatapp.com/123456
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
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <View style={{ marginBottom: 15 }}>
                      <Text style={{ fontSize: 20, color: "black" }}>
                        Mục hiển thị
                      </Text>
                      <Text style={{ fontSize: 16, color: "gray" }}>
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
                    <View style={{ marginBottom: 15 }}>
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
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Báo xấu
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerBody_Mid_ChangeName_Item}
                >
                  <Entypo
                    name="swap"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Chuyển quyền nhóm trưởng
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.containerBody_Mid_ChangeName_Item}
                >
                  <MaterialCommunityIcons
                    name="database"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Dung lượng trò chuyện
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.containerBody_Mid_ChangeName_Item}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="#828282"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      Xóa lịch sử trò chuyện
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsLeave(true)}
                  style={styles.containerBody_Mid_ChangeName_Item}
                >
                  <MaterialIcons
                    name="subdirectory-arrow-left"
                    size={24}
                    color="red"
                    style={{ width: "15%", height: "100%" }}
                  />
                  <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                    <Text style={{ fontSize: 20, color: "red" }}>Rời nhóm</Text>
                  </View>
                </TouchableOpacity>
                {groupDetails.rules.IDOwner === user.ID && (
                  <TouchableOpacity
                    onPress={() => setisDeleteGroup(true)}
                    style={styles.containerBody_Mid_ChangeName_Item}
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="red"
                      style={{ width: "15%", height: "100%" }}
                    />
                    <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
                      <Text style={{ fontSize: 20, color: "red" }}>
                        Giải tán nhóm
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
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
                  value={nameChange}
                  onChangeText={(text) => setnameChange(text)}
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

        {/* bottom sheet to change owner gr */}
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
          >
            <BottomSheetView
              style={{
                flex: 1,
                gap: 20,
                padding: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Chuyển quyền nhóm trưởng
              </Text>

              <Input
                accessoryLeft={() => (
                  <MaterialIcons name="search" size={30} color={"#333"} />
                )}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  fontSize: 20,
                }}
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChangeText={(nextValue) => handleSearch(nextValue)}
              />

              <ScrollView style={{ flex: 1 }}>
                {dataResearch.map((mem) => (
                  <TouchableOpacity
                    key={mem.ID}
                    onPress={() => onSelection(mem)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <AvatarCustomer
                        source={{ uri: mem.urlavatar }}
                        alt={mem.fullname}
                        width={60}
                        height={60}
                        resizeMode="cover"
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 600 }}>
                          {mem.fullname}
                        </Text>
                        <Text>{mem.isCoOwner ? "Phó nhóm" : "Thành Viên"}</Text>
                      </View>
                    </View>
                    <CheckBox
                      checked={mem.ID === isUserSelected}
                      onChange={() => onSelection(mem)}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {isUserSelected ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0094FF",
                    padding: 10,
                    display: "flex",
                  }}
                  onPress={handleChangeOwner}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Chuyển quyền cho{" "}
                    {members.find((mem) => mem.ID === isUserSelected)?.fullname}{" "}
                    và rời nhóm
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "orange",
                    padding: 10,
                    display: "flex",
                  }}
                  onPress={handleCloseModal}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Hủy
                  </Text>
                </TouchableOpacity>
              )}
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>

      {/* model leave group */}
      <Modal visible={isLeave}>
        <Card disabled={true}>
          <Text>Bạn có chắc chắn muốn rời khỏi nhóm?</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 20,
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                width: "45%",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "orange",
              }}
              onPress={() => setIsLeave(false)}
            >
              <Text
                style={{
                  color: "orange",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Quay lại
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                width: "45%",
                borderRadius: 10,
                backgroundColor: "red",
              }}
              onPress={handleLeaveGroup}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </Modal>
      {/* model delete group */}
      <Modal visible={isDeleteGroup}>
        <Card disabled={true}>
          <Text>Bạn có chắc chắn muốn giải tán nhóm?</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 20,
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                width: "45%",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "orange",
              }}
              onPress={() => setisDeleteGroup(false)}
            >
              <Text
                style={{
                  color: "orange",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Quay lại
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                width: "45%",
                borderRadius: 10,
                backgroundColor: "red",
              }}
              onPress={handleDeleteGroup}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </Modal>
    </Provider>
  );
}
export default DrawerChatGroup;
