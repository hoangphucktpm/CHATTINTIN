import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleRegister";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import auth from "@react-native-firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Ensure that you import auth

import { firebaseConfig } from "../../../config";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Register = () => {
  const [phone, setPhone] = useState("+84");
  const [confirm, setConfirm] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const regexPhone = /^\+84\d{9}$/;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const otpInputs = useRef([]);
  const recaptchaVerifier = useRef(null);

  const hanldPressDashBoard = () => {
    navigation.navigate("DashBoard");
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

  const confirmCode = async () => {
    try {
      console.log("otp", otp.join(""));
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        otp.join(""),
      );

      console.log(credential);
      navigation.navigate("InputPass", { phoneNumber: phone });
    } catch (error) {
      console.log(error);
      Alert.alert("Invalid OTP. Please try again.");
    }
  };

  const handleOTPChange = (value, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOtp(updatedOTP);
    if (value && index < otp.length - 1) {
      // Focus the next input
      otpInputs.current[index + 1].focus();
    }
  };

  const onRegister = async () => {
    if (!phone) {
      Alert.alert("Vui lòng nhập số điện thoại");
      return;
    }
    if (!regexPhone.test(phone)) {
      Alert.alert("Số điện thoại không đúng định dạng");
      return;
    }
    try {
      const res = await api.getUserByPhone(phone);
      if (!res.data || res.data.message === "User not found") {
        await getOtp();
      } else {
        Alert.alert("Số điện thoại đã tồn tại");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        return await getOtp();
      }
      Alert.alert("Lỗi", "Không thể thực hiện yêu cầu");
      setShowOtp(false);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent />
      <View style={{ height: StatusBar.currentHeight }}></View>
      <View style={styles.containerTabBar}>
        <TouchableOpacity
          onPress={hanldPressDashBoard}
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
          style={{ width: "73%", justifyContent: "center", paddingTop: 10 }}
        >
          <Text style={{ fontSize: 22, color: "white" }}>Đăng Ký</Text>
        </View>
      </View>
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      /> */}
      {showOtp ? (
        <>
          <View style={styles.containerText}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Vui lòng nhập mã OTP để xác thực số điện
            </Text>
          </View>
          <View style={styles.containerInput}>
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
                <Feather name="phone" size={32} color="black" />
              </View>
              <TextInput
                value={phone}
                style={{
                  marginRight: 15,
                  height: 50,
                  fontSize: 22,
                  flex: 0.85,
                  color: "black",
                  fontWeight: "bold",
                }}
                keyboardType="phone-pad"
                editable={false}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              {[...Array(6)].map((_, index) => (
                <View key={index} style={{ width: 40, marginHorizontal: 5 }}>
                  <View style={{ borderBottomWidth: 1, borderRadius: 0 }}>
                    <TextInput
                      onChangeText={(text) => handleOTPChange(text, index)}
                      value={otp[index]}
                      placeholder=""
                      style={{
                        height: 50,
                        fontSize: 22,
                        textAlign: "center",
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      ref={(ref) => (otpInputs.current[index] = ref)}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        // Focus the next input
                        if (index < otp.length - 1) {
                          otpInputs.current[index + 1].focus();
                        }
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.containerText}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Vui lòng nhập số điện thoại để đăng ký tài khoản
            </Text>
          </View>
          <View style={styles.containerInput}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderWidth: 1,
                marginRight: 10,
                marginLeft: 10,
                borderRadius: 20,
                backgroundColor: "#DCDCDC",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 0.15, alignItems: "center" }}>
                <Feather name="phone" size={32} color="black" />
              </View>
              <TextInput
                onChangeText={(x) => setPhone(x)}
                value={phone}
                defaultValue="+84"
                placeholder="Vui lòng nhập số điện thoại"
                style={{
                  marginRight: 15,
                  height: 50,
                  fontSize: 22,
                  flex: 0.85,
                }}
                keyboardType="phone-pad"
                id="phonenumber"
              />
            </View>

            <TouchableOpacity
              onPress={(hanldPressLogin) => {
                navigation.navigate("Login");
              }}
              style={{ marginTop: 25, alignItems: "center", width: "100%" }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontSize: 20, marginRight: 10 }}>
                  {" "}
                  Đã có tài khoản?
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginRight: 10,
                    color: "#F4A460",
                  }}
                >
                  {" "}
                  Đăng nhập
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.containerBottom}>
        <TouchableOpacity
          onPress={showOtp ? confirmCode : onRegister}
          style={styles.bottom}
        >
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            {showOtp ? "Xác nhận OTP" : "Nhận mã OTP"}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" />}
    </SafeAreaView>
  );
};

export default Register;
