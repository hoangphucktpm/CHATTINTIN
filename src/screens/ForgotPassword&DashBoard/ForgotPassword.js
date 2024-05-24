import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons, Feather, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { api } from "../../apis/api";
import { firebaseConfig } from "../../../config";
import "firebase/compat/auth";
import styles from "./StyleForgotPassword";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("84");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const sdtRegex = /^\84\d{9}$/;
  const otpInputs = useRef([]);

  const hanldPressDashBoard = () => {
    navigation.navigate("Login");
  };

  const hanldPressLinkResert = async () => {
    if (!phone) {
      Alert.alert("Vui lòng nhập số điện thoại");
      return;
    }
    if (!sdtRegex.test(phone)) {
      Alert.alert("Số điện thoại không đúng định dạng");
      return;
    }
    try {
      setLoading(true);
      const res = await api.getUserByPhone(phone);
      if (res.data?.ID || !res.data.message === "User not found") {
        setShowOtp(true);
      } else {
        Alert.alert("Số điện thoại không tồn tại");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setShowOtp(true);
      } else {
        Alert.alert("Lỗi", "Không thể thực hiện yêu cầu");
        setShowOtp(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = () => {
    if (code.length === 6) {
      navigation.navigate("ChangePassForgot", {
        phoneNumber: phone,
      });
    } else {
      Alert.alert("Mã OTP không hợp lệ. Vui lòng nhập 6 chữ số.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} backgroundColor={"#188CFF"} />
      <View style={styles.containerTabBar}>
        <TouchableOpacity
          onPress={hanldPressDashBoard}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontWeight: "600", fontSize: 22 }}>
          Lấy lại mật khẩu
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={{ fontSize: 20 }}>
          {showOtp
            ? "Vui lòng nhập mã OTP để xác thực số điện thoại"
            : "Vui lòng nhập số điện thoại để lấy lại mật khẩu"}
        </Text>
      </View>
      {showOtp ? (
        <>
          <View style={styles.containerInput}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {[...Array(6)].map((_, index) => (
                <View key={index} style={{ marginHorizontal: 5 }}>
                  <View style={{ borderBottomWidth: 1 }}>
                    <TextInput
                      onChangeText={(text) => {
                        let tempCode = [...code]; // Sao chép mã OTP hiện tại
                        tempCode[index] = text; // Cập nhật số trong ô hiện tại
                        setCode(tempCode.join("")); // Cập nhật mã OTP mới
                        if (text === "" && index > 0) {
                          // Nếu người dùng xóa số và đang ở ô không phải là ô đầu tiên
                          // Di chuyển về ô trước đó
                          otpInputs.current[index - 1].focus();
                        } else if (text !== "" && index < 5) {
                          // Nếu người dùng nhập số mới và không phải ở ô cuối cùng
                          // Di chuyển tới ô tiếp theo
                          otpInputs.current[index + 1].focus();
                        }
                      }}
                      value={code[index] || ""}
                      placeholder=""
                      style={{
                        height: 50,
                        fontSize: 22,
                        textAlign: "center",
                        width: 40,
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        // Focus the next input
                        if (index < 5) {
                          otpInputs.current[index + 1].focus();
                        }
                      }}
                      onKeyPress={({ nativeEvent: { key } }) => {
                        // Xử lý sự kiện khi ấn nút Backspace
                        if (key === "Backspace" && !code[index] && index > 0) {
                          let tempCode = [...code]; // Sao chép mã OTP hiện tại
                          tempCode[index - 1] = ""; // Xóa số ở ô trước đó
                          setCode(tempCode.join("")); // Cập nhật mã OTP mới
                          // Di chuyển về ô trước đó
                          otpInputs.current[index - 1].focus();
                        }
                      }}
                      ref={(ref) => (otpInputs.current[index] = ref)}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={[styles.containerBottom, styles.centered]}>
            <TouchableOpacity onPress={confirmCode} style={styles.bottom}>
              <Text style={styles.bottomText}>Xác nhận OTP</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderWidth: 1,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              borderRadius: 20,
              backgroundColor: "#DCDCDC",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 0.15, alignItems: "center" }}>
              <FontAwesome5 name="keyboard" size={24} color="black" />
            </View>
            <TextInput
              onChangeText={(x) => setPhone(x)}
              value={phone}
              placeholder="Vui lòng nhập số điện thoại"
              style={{ height: 50, fontSize: 22, flex: 0.7 }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.containerBottom}>
            <View />
            <TouchableOpacity
              onPress={hanldPressLinkResert}
              style={styles.bottom}
            >
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default ForgotPassword;
