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
import auth from '@react-native-firebase/auth';
import { api } from "../../apis/api";
// import { firebaseConfig } from "../../../config";
import "firebase/compat/auth";
import styles from "./StyleForgotPassword";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("+84");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef(null);

  const sdtRegex = /^\84\d{9}$/;

  const hanldPressDashBoard = () => {
    navigation.navigate("Login");
  };

  const getOtp = async () => {
    setLoading(true);
    try {
      const confirm = await auth().verifyPhoneNumber(phone);
      setConfirm(confirm);
      setShowOtp(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to send OTP. Please try again.");
      setShowOtp(false);
    } finally {
      setLoading(false);
    }
  };

  const hanldPressLinkResert = async () => {
    if (!phone) {
      Alert.alert("Vui lòng nhập số điện thoại");
      return;
    }
    // if (!sdtRegex.test(phone)) {
    //   Alert.alert("Số điện thoại không đúng định dạng");
    //   return;
    // }
    try {
      setLoading(true);
      const res = await api.getUserByPhone(phone);
      console.log(res.data);
      if (res.data?.ID || !res.data.message === "User not found") {
        await getOtp();
        setShowOtp(true);
      } else {
        Alert.alert("Số điện thoại không tồn tại");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await getOtp();
      } else {
        Alert.alert("Lỗi", "Không thể thực hiện yêu cầu");
        setShowOtp(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
      const userCredential =  await auth().currentUser.linkWithCredential(credential);
      console.log(userCredential);
      navigation.navigate("ChangePassForgot", {
        phoneNumber: phone,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Invalid OTP. Please try again.");
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
        <Text style={{ color: "white", fontWeight: 600, fontSize: 22 }}>
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
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      /> */}
      {showOtp ? (
        <>
          <View style={styles.containerInput}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="phone" size={32} color="black" />
              <TextInput
                onChangeText={(x) => setCode(x)}
                value={code}
                placeholder="Vui lòng nhập mã OTP"
                style={{ height: 50, fontSize: 22, flex: 0.7 }}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="keyboard" size={24} color="black" />
              <TextInput
                onChangeText={setCode}
                value={code}
                placeholder="Vui lòng nhập mã OTP"
                style={styles.textInput}
                keyboardType="numeric"
                maxLength={6}
              />
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
