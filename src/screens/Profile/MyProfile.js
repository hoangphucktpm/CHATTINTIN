import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import styles from "./StyleMyProfile";
import { Feather, Entypo } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, differenceInYears } from "date-fns"; // Import differenceInYears function
import { useNavigation } from "@react-navigation/native";
import { api, http } from "../../apis/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeData } from "../../utils/localStorageConfig";
import { logout, setUser } from "../../redux/authSclice";
import Footer from "../Footer/Footer";
import * as ImagePicker from "expo-image-picker";
import { setConversation } from "../../redux/conversationSlice";
import AvatarCustomer from "../../components/AvatarCustomer";
import { setBadge } from "../../redux/appSlice";

const MyProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const phone = user?.phone;

  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState(user ? user.ismale : false);
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [editingProfileInfo, setEditingProfileInfo] = useState(false);
  const [isPasswordVisibleOld, setPasswordVisibleOld] = useState(false);
  const [isPasswordVisibleNew, setPasswordVisibleNew] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  const handleAvatarPress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled) {
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "avatar.jpg",
        });
        // full name
        formData.append("fullname", user.fullname);

        const res = await http.post(`auth/update-info/${user.ID}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setAvatarImage(res.data.data.urlavatar);
        dispatch(setUser({ ...user, urlavatar: res.data.data.urlavatar }));
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image");
    }
  };

  const handleUpdatePress = () => {
    setEditingPassword(true);
    setShowPasswordFields(true);
  };

  const handleCancelPress = () => {
    setShowConfirmDialog(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmCancel = () => {
    setShowConfirmDialog(false);
    setShowPasswordFields(false);
    setEditingPassword(false);
    setEditingProfile(false);
  };

  useEffect(() => {
    if (!user) return navigation.navigate("Login");
    setFullName(user.fullname);
    setGender(user.ismale);
    user.birthday && setBirthday(new Date(user.birthday));
    setAvatarImage(user.urlavatar);
  }, [user]);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  const handleUpdateProfile = async () => {
    if (!editingProfileInfo) {
      setEditingProfileInfo(true);
      setEditingProfile(true);
    } else {
      try {
        const age = differenceInYears(new Date(), birthday); // Calculate age
        if (age < 16) {
          Alert.alert("Thông báo", "Tuổi của bạn không được nhỏ hơn 16");
          return;
        }
        const data = {
          fullname: fullname,
          sex: gender ? "male" : "female",
          birthday: format(birthday, "yyyy-MM-dd"),
        };
        // console.log(data);
        await api.updateInfo(user.ID, data);
        Alert.alert("Thông báo", "Cập nhật thông tin cá nhân thành công");
        dispatch(
          setUser({
            ...user,
            ...data,
            ismale: gender,
          })
        );
        setEditingProfileInfo(false);
        setEditingProfile(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Thông báo", "Cập nhật thông tin cá nhân thất bại");
      }
    }
  };

  const handleLogoutPress = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          await removeData("user-phone").then(() => {
            dispatch(logout());
            dispatch(setConversation(null));
            dispatch(setUser(null));
            dispatch(setBadge(0));
            navigation.navigate("DashBoard");
          });
        },
        style: "destructive",
      },
    ]);
  };

  const togglePasswordVisibilityOld = () => {
    setPasswordVisibleOld(!isPasswordVisibleOld);
  };

  const togglePasswordVisibilityNew = () => {
    setPasswordVisibleNew(!isPasswordVisibleNew);
  };

  const onUpdatePass = async () => {
    if (oldPassword === "") {
      Alert.alert("Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    if (newPassword === "") {
      Alert.alert("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (oldPassword === newPassword) {
      Alert.alert("Mật khẩu mới không được trùng với mật khẩu cũ");
      return;
    }
    if (!validatePassword(newPassword)) {
      Alert.alert(
        "Mật khẩu mới không đáp ứng yêu cầu. Mật khẩu cần có ít nhất một ký tự viết hoa, một ký tự viết thường, một số, một ký tự đặc biệt và có ít nhất 8 ký tự."
      );
      return;
    }

    try {
      const res = await api.updatePassword({
        username: phone,
        oldpassword: oldPassword,
        newpassword: newPassword,
      });

      if (res?.data?.message === "Old password is incorrect") {
        Alert.alert("Mật khẩu cũ không đúng");
        return;
      }
      if (res?.data?.message === "Password is the same") {
        Alert.alert("Mật khẩu mới không được trùng với mật khẩu cũ");
        return;
      }
      if (res?.data?.message === "Update password success") {
        Alert.alert("Cập nhật mật khẩu thành công");
        setEditingPassword(false);
        setShowPasswordFields(false);
        return;
      }
      if (res?.data?.message === "Update password failed") {
        Alert.alert("Cập nhật mật khẩu thất bại");
        return;
      }
      if (res?.data?.message === "User not found") {
        Alert.alert("Người dùng không tồn tại");
        return;
      }
    } catch (error) {
      Alert.alert("Cập nhật mật khẩu thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTabBar}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 15,
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>
            Thông tin cá nhân
          </Text>
        </View>
      </View>

      <ScrollView
        style={{
          paddingBottom: 0,
        }}
      >
        <View style={styles.containerBody}>
          {!showPasswordFields && (
            <>
              <View style={styles.containerBody_Top}>
                <TouchableOpacity onPress={handleAvatarPress}>
                  {avatarImage ? (
                    <AvatarCustomer
                      style={styles.containerBody_Top_Avt}
                      source={{ uri: avatarImage }}
                      alt={fullname}
                    />
                  ) : (
                    <Image
                      style={styles.containerBody_Top_Avt}
                      source={require("../../../assets/avata.jpg")}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.containerInput}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: 2,
                    marginRight: 10,
                    marginTop: 20,
                    marginLeft: 10,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 0.15, alignItems: "center" }}>
                    <Feather name="user" size={32} color="black" />
                  </View>
                  <TextInput
                    onChangeText={(text) => setFullName(text)}
                    value={fullname}
                    placeholder={`Tên của bạn: ${fullname}`}
                    style={{
                      marginRight: 15,
                      height: 50,
                      fontSize: 22,
                      flex: 0.85,
                    }}
                    editable={editingProfile}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 20, marginRight: 10 }}>
                  Giới tính:
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => setGender(value)}
                  value={gender}
                  disabled={!editingProfile && !editingPassword}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton.Item
                      label="Nam"
                      value={true}
                      disabled={!editingProfile && !editingPassword}
                    />
                    <RadioButton.Item
                      label="Nữ"
                      value={false}
                      disabled={!editingProfile && !editingPassword}
                    />
                  </View>
                </RadioButton.Group>
              </View>

              <View style={styles.containerInput}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 20, marginRight: 10, marginLeft: 10 }}
                  >
                    Ngày sinh:
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 22, marginLeft: 10, marginRight: 10 }}
                    >
                      {format(birthday, "dd-MM-yyyy")}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      disabled={!editingProfile && !editingPassword}
                    >
                      <Feather name="calendar" size={32} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={birthday}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    disabled={!editingProfile && !editingPassword}
                  />
                )}
              </View>
            </>
          )}

          {showPasswordFields && editingPassword && (
            <>
              <View style={styles.containerInput}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: 2,
                    marginHorizontal: 10,
                    borderRadius: 20,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{ flex: 0.15, alignItems: "center" }}>
                    <Feather name="lock" size={32} color="black" />
                  </View>
                  <TextInput
                    onChangeText={(x) => setOldPassword(x)}
                    value={oldPassword}
                    placeholder="Password hiện tại"
                    style={{
                      marginRight: 20,
                      height: 50,
                      fontSize: 22,
                      flex: 0.85,
                    }}
                    secureTextEntry={!isPasswordVisibleOld}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibilityOld}>
                    {isPasswordVisibleOld ? (
                      <Entypo name="eye" size={24} color="black" />
                    ) : (
                      <Entypo
                        name="eye-with-line"
                        size={24}
                        color="black"
                        marginRight={35}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerInput}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: 2,
                    marginHorizontal: 10,
                    borderRadius: 20,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{ flex: 0.15, alignItems: "center" }}>
                    <Feather name="lock" size={32} color="black" />
                  </View>
                  <TextInput
                    onChangeText={(x) => setNewPassword(x)}
                    value={newPassword}
                    placeholder="Password mới"
                    style={{
                      marginRight: 15,
                      height: 50,
                      fontSize: 22,
                      flex: 0.85,
                    }}
                    secureTextEntry={!isPasswordVisibleNew}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibilityNew}>
                    {isPasswordVisibleNew ? (
                      <Entypo name="eye" size={24} color="black" />
                    ) : (
                      <Entypo
                        name="eye-with-line"
                        size={24}
                        color="black"
                        marginRight={35}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerBottom2}>
                <TouchableOpacity
                  onPress={handleCancelPress}
                  style={[styles.bottom, { backgroundColor: "red" }]}
                >
                  <Text
                    style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}
                  >
                    Hủy
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onUpdatePass} style={styles.bottom}>
                  <Text
                    style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}
                  >
                    Cập nhật Pass
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {!showPasswordFields && (
            <View style={styles.containerBottom2}>
              <TouchableOpacity
                onPress={handleUpdateProfile}
                style={{ margin: 15, marginTop: 25 }}
              >
                <Text
                  style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}
                >
                  {editingProfileInfo ? "Lưu" : "Cập nhật thông tin cá nhân"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!showPasswordFields && (
            <View style={styles.containerBottom2}>
              <TouchableOpacity
                onPress={handleLogoutPress}
                style={[[styles.bottom2, { backgroundColor: "red" }]]}
              >
                <Text
                  style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                >
                  Đăng xuất
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdatePress}
                style={styles.bottom2}
              >
                <Text
                  style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                >
                  Cập nhật mật khẩu
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showConfirmDialog}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCancelConfirm}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bạn muốn hủy cập nhật?</Text>
              <View style={{ flexDirection: "row", marginTop: 0 }}>
                <TouchableOpacity
                  style={[styles.openButton, { marginRight: 50 }]}
                  onPress={handleCancelConfirm}
                >
                  <Text style={styles.modalStyle}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.openButton]}
                  onPress={handleConfirmCancel}
                >
                  <Text style={styles.modalStyle}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  );
};

export default MyProfile;
