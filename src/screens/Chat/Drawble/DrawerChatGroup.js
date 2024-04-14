import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
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

function DrawerChatGroup({ navigation }) {
  // Add navigation prop here
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [nameChange, setnameChange] = useState("Hehhee");
  const [isBFF, setIsBFF] = useState(false);
  const [avtChange, setavtChange] = useState(
    "https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi11-1.jpg"
  );
  const [owner, setOwner] = useState("1");
  const [userState, setUserState] = useState({
    user: {
      _id: "1",
    },
  });

  const pickImage = async () => {
    // Add code here
  };

  const outGroupHandleClick = async () => {
    // Add code here
  };

  const hanldPressGoBack = () => {
    navigation.goBack();
  };

  const hanldPressMemberGroup = () => {
    navigation.goBack();
  };

  const updateName = async () => {
    setIsDialogVisible(false);
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
              <Image
                style={styles.containerBody_Top_Avt}
                source={{ uri: avtChange }}
              />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "black",
                  marginTop: 10,
                }}
              >
                {nameChange}
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
                  onPress={hanldPressMemberGroup}
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
                {owner == userState.user._id ? (
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.containerBody_Top_Icon_Icon}
                  >
                    <View style={styles.containerBody_Top_Icon_IconItem}>
                      <FontAwesome5 name="brush" size={20} color="black" />
                    </View>
                    <View style={styles.containerBody_Top_Icon_IconText}>
                      <Text style={{ color: "#4F4F4F", textAlign: "center" }}>
                        Đổi {"\n"} hình nền
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
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
              <TouchableOpacity style={styles.containerBody_Mid_File_Item}>
                <Ionicons
                  name="ios-folder-outline"
                  size={24}
                  color="#828282"
                  style={{ width: "15%", height: "100%" }}
                />
                <View style={styles.containerBody_Mid_File_Item_Text}>
                  <Text style={{ fontSize: 20, color: "black" }}>
                    Ảnh, file , link đã gửi
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
                  <TouchableOpacity>
                    <Image
                      style={styles.fileImg}
                      source={{
                        uri: "https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi11-1.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={styles.fileImg}
                      source={{
                        uri: "https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi14-2.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={styles.fileImg}
                      source={{
                        uri: "https://i.pinimg.com/736x/a6/2c/c3/a62cc3642d8da0c8202c968d266ec96f.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={styles.fileImg}
                      source={{
                        uri: "https://i.pinimg.com/736x/1c/26/e2/1c26e224c5af80ac5decff6af5080efb.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
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
                    (5)
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
                    <Text style={{ fontSize: 16, color: "gray" }}>Ưu tiên</Text>
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
                  <Text style={{ fontSize: 20, color: "black" }}>Báo xấu</Text>
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

              {owner == userState.user._id ? (
                <TouchableOpacity
                  onPress={outGroupHandleClick}
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
    </Provider>
  );
}
export default DrawerChatGroup;
