import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import styles from "./StyleMyProfile";
import { Ionicons, Feather, FontAwesome5, Entypo } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, set } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import is from "date-fns/locale/is";
import { api } from "../../apis/api";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { differenceInYears } from "date-fns";
import { launchImageLibrary } from "react-native-image-picker";
import { PermissionsAndroid, Platform } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeData } from "../../utils/localStorageConfig";
import { logout } from "../../redux/authSclice";



const MyProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [fullname, setFullName] = useState("");
  const [idUser, setIdUser] = useState("");
  const [gender, setGender] = useState("");
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
  const [isPasswordVisibleOld, setPasswordVisibleOld] = useState(false); // State for password visibility
  const [isPasswordVisibleNew, setPasswordVisibleNew] = useState(false); // State for password visibility


  // useEffect(() => {
  //   loadUserProfile();
  // }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  const handleAvatarPress = async () => {
    try {
      const permissionsGranted = await requestPermissions();
      if (permissionsGranted) {
        const result = await openImagePicker();
        if (!result.didCancel && result.assets.length > 0) {
          setAvatarImage(result.assets[0].uri);
        }
      } else {
        console.log("Người dùng từ chối cấp quyền truy cập thư viện ảnh");
      }
    } catch (error) {
      console.log("Đã xảy ra lỗi khi xử lý ảnh:", error);
    }
  };

  const openImagePicker = () => {
    return new Promise((resolve, reject) => {
      const options = {
        mediaType: "photo",
        cameraType: "back",
      };
      launchImageLibrary(options, (response) => {
        resolve(response);
      });
    });
  };

  const requestPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        const photoPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return (
          cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
          photoPermission === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        return true;
      }
    } catch (error) {
      console.log("Đã xảy ra lỗi khi yêu cầu quyền:", error);
      return false;
    }
  };


  const hanldPressGoBack = () => {
    navigation.goBack();
  };

  const handleUpdatePress = () => {
    setEditingPassword(true);
    setShowPasswordFields(true);
    // setEditingProfile(true); // Cho phép chỉnh sửa thông tin cá nhân
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



  const {user} = useSelector((state) => state.auth);
  const route = useRoute();
  const phone = user?.phone;

  useEffect(() => {
    if (!user) return navigation.navigate("Login");
    console.log(user);
    setFullName(user.fullname);
          setGender(user.ismale);
          const formattedBirthday = new Date(user.birthday);
          setBirthday(formattedBirthday);
          setBirthday(new Date(user.birthday));
          setAvatarImage(user.urlavatar);
          setIdUser(user.ID);
  }, [user])
  
  // Load user profile info from server when the screen is loaded for the first time (useEffect) or when the user presses the "Refresh" button
  // Không cần bấm button gì

  // const loadUserProfile = async () => {
  //   try {
  //     const res = await api.getUserByPhone(phone);
  //     console.log(res);

  //     if (res?.data) {
  //       setFullName(res.data.fullname);
  //       setGender(res.data.ismale);
  //       const formattedBirthday = new Date(res.data.birthday);
  //       setBirthday(formattedBirthday);
  //       setBirthday(new Date(res.data.birthday));
  //       setAvatarImage(res.data.urlavatar);
  //       setIdUser(res.data.ID);
  //     }
  //   } catch (error) {
  //     Alert.alert("Lỗi", "Không thể tải thông tin cá nhân");

  //   }
  // };




  // Biểu thức chính quy cho yêu cầu mật khẩu mới
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Kiểm tra mật khẩu mới với biểu thức chính quy
  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  const handleRegisterPress = async () => {
    if (!editingProfileInfo) {
      // Nếu đang ở chế độ xem thông tin, chuyển sang chế độ chỉnh sửa thông tin cá nhân
      setEditingProfileInfo(true);
      setEditingProfile(true); // Cập nhật trạng thái chỉnh sửa thông tin cá nhân
    } else {
      // Nếu đang ở chế độ chỉnh sửa thông tin

      try {
        await api.updateInfo(idUser, {
          fullname: fullname,
          ismale: gender ? 1 : 0,
          birthday: birthday.format("yyyy-MM-dd"),
          urlavatar: avatarImage,
        });
      } catch (error) {}
      if (editingPassword) {
        // Nếu đang chỉnh sửa mật khẩu
        // Kiểm tra mật khẩu mới có trùng với mật khẩu cũ không
        if (oldPassword === newPassword) {
          Alert.alert(
            "Thông báo",
            "Mật khẩu mới không được trùng với mật khẩu cũ"
          );
          return;
        }

        if (!validatePassword(newPassword)) {
          Alert.alert(
            "Thông báo",
            "Mật khẩu mới không đáp ứng yêu cầu. Mật khẩu cần có ít nhất một ký tự viết hoa, một ký tự viết thường, một số, một ký tự đặc biệt và có ít nhất 8 ký tự."
          );
          return;
        }


        // Kiểm tra xem ngày sinh đã đủ điều kiện chưa
        const currentYear = new Date().getFullYear();
        const selectedYear = birthday.getFullYear();
        const age = currentYear - selectedYear;
        if (age < 16) {
          Alert.alert("Thông báo", "Tuổi của bạn phải từ 16 năm trở lên");
          return; // Không thực hiện các bước cập nhật khi tuổi không đủ điều kiện
        }

        // Code xử lý cập nhật mật khẩu ở đây
        setShowPasswordFields(false);
        setEditingPassword(false);
        Alert.alert("Thông báo", "Cập nhật mật khẩu thành công");
      }

      // Code lưu thông tin cá nhân ở đây
      setEditingProfileInfo(false);
      setEditingProfile(false); // Chuyển về trạng thái xem thông tin cá nhân

      // Hiển thị thông báo cập nhật thành công
      Alert.alert("Thông báo", "Cập nhật thông tin cá nhân thành công");
    }

    // Hiển thị thông báo cập nhật thành công
  };


  const handleLogoutPress = () => {
    // Ask if you want to log out
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          await removeData('user-phone').then(() => {
            dispatch(logout())
            navigation.navigate("DashBoard")
          })
        },
        style: "destructive",
      },
    ]);
  };



  
  const togglePasswordVisibilityOld = () => {
    setPasswordVisibleOld(!isPasswordVisibleOld); // Toggle password visibility state
  };

  const togglePasswordVisibilityNew = () => {
    setPasswordVisibleNew(!isPasswordVisibleNew); // Toggle password visibility state
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

      // Kiểm tra phản hồi từ server
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
  }
  



  return (
    <View style={styles.container}>
      <View style={styles.containerTabBar}>
        <TouchableOpacity
          onPress={hanldPressGoBack}
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
          style={{
            width: "73%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>
            Cập nhật thông tin
          </Text>
        </View>
      </View>

      <ScrollView style={{ paddingBottom: 0 }}>
        <View style={styles.containerBody}>
          {!showPasswordFields && (
            <>
<View style={styles.containerBody_Top}>
  <TouchableOpacity onPress={handleAvatarPress}>
    {avatarImage ? (
      <Image
        style={styles.containerBody_Top_Avt}
        source={{ uri: avatarImage }}
      />
    ) : (
      <Image
        style={styles.containerBody_Top_Avt}
        source={require('../../../assets/avata.jpg')}

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
                    secureTextEntry={!isPasswordVisibleOld} // Toggle secureTextEntry based on isPasswordVisible state
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
                    secureTextEntry={!isPasswordVisibleNew} // Toggle secureTextEntry based on isPasswordVisible state
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
                onPress={handleRegisterPress}
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
    </View>
  );
};

export default MyProfile;
