import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./StyleProfile";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { PermissionsAndroid, Platform } from "react-native";
import { differenceInYears } from "date-fns";
import * as ImagePicker from "expo-image-picker";

import { api } from "../../apis/api";
import { storeData } from "../../utils/localStorageConfig";

const InputProfile = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const navigation = useNavigation();
  const [urlavatar, setUrlavatar] = useState("");

  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { idNewUser } = props?.route?.params;

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    const isoString = currentDate.toISOString();
    const dateString = isoString.split("T")[0]; // Tách ngày tháng năm từ chuỗi ISO 8601
    setBirthday(dateString);
  };

  const handleAvatarPress = async () => {
    if (Platform.OS === "android") {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert("Quyền truy cập ảnh bị từ chối");
        return;
      }
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled) {
        setAvatarImage(result.assets[0].uri);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image");
    }
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
    navigation.navigate("InputPass");
  };

  const hanldPressRegister = async () => {
    if (!name) {
      Alert.alert("Vui lòng nhập tên!");
      return;
    }
    if (!gender) {
      Alert.alert("Vui lòng chọn giới tính!");
      return;
    }
    if (!avatarImage) {
      Alert.alert("Vui lòng chọn ảnh đại diện!");
      return;
    }
    if (!birthday) {
      Alert.alert("Vui lòng chọn ngày sinh!");
      return;
    }

    if (birthday > new Date()) {
      Alert.alert("Ngày sinh không hợp lệ!");
      return;
    }

    const age = differenceInYears(new Date(), new Date(birthday));
    if (age < 16) {
      Alert.alert("Tuổi phải lớn hơn hoặc bằng 16!");
      return;
    }

    console.log({
      fullname: name,
      ismale: gender,
      birthday: birthday.toString(0, 10),
      urlavatar: avatarImage,
      idNewUser,
    });

    try {
      const res = await api.updateInfo(idNewUser, {
        fullname: name,
        ismale: gender,
        birthday: birthday.toString(0, 10),
        urlavatar: avatarImage,
      });

      console.log(res);
      Alert.alert("Đăng ký thành công");
      await storeData("user-phone", idNewUser);
      navigation.navigate("Home", { phone: idNewUser });
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thực hiện yêu cầu");
    }
  };

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
          <ImageBackground style={styles.containerBody_Top}>
            <TouchableOpacity onPress={handleAvatarPress}>
              {avatarImage ? (
                <Image
                  style={styles.containerBody_Top_Avt}
                  source={{ uri: avatarImage }}
                />
              ) : (
                <Image
                  style={styles.containerBody_Top_Avt}
                  source={require("../../../assets/avata.jpg")}
                />
              )}
            </TouchableOpacity>
          </ImageBackground>

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
                onChangeText={(x) => setName(x)}
                value={name}
                placeholder="Tên của bạn"
                style={{
                  marginRight: 15,
                  height: 50,
                  fontSize: 22,
                  flex: 0.85,
                }}
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
            <Text style={{ fontSize: 20, marginRight: 10 }}>Giới tính:</Text>
            <RadioButton.Group
              onValueChange={(value) => {
                console.log("Selected gender:", value);
                setGender(value);
              }}
              value={gender}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton.Item label="Nam" value="male" />
                <RadioButton.Item label="Nữ" value="female" />
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.containerInput}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, marginRight: 10, marginLeft: 10 }}>
                Ngày sinh:
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 22, marginLeft: 10, marginRight: 10 }}>
                  {format(birthday, "MM-dd-yyyy")}
                </Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
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
              />
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={hanldPressRegister} style={styles.bottom}>
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            Hoàn tất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputProfile;
