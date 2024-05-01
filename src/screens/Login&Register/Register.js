import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleRegister";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";
import auth from "@react-native-firebase/auth";
// import * as firebase from "expo-firebase-app";

const Register = () => {
  const [phone, setPhone] = useState("+84");
  const [confirm, setConfirm] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [code, setCode] = useState("");
  const regexPhone = /^\+84\d{9}$/;
  const navigation = useNavigation();
  const hanldPressDashBoard = () => {
    navigation.navigate("DashBoard");
  };
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   firebase.initializeApp({
  //     apiKey: "AIzaSyC7FA8yKIkJwQEETOQLXVXHkdxOyFmdGdE",
  //     authDomain: "galvin-store.firebaseapp.com",
  //     projectId: "galvin-store",
  //     storageBucket: "galvin-store.appspot.com",
  //     messagingSenderId: "486065082388",
  //     appId: "1:486065082388:web:97d081a1ec75fef9339701",
  //     measurementId: "G-NFNHM5W5YV",
  //   });
  // }, []);

  const getOtp = async () => {
    setShowOtp(true);
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber("0987651053");
      setConfirm(confirmation);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      if (!res.data) {
        await getOtp();
      } else {
        Alert.alert("Số điện thoại đã tồn tại");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return await getOtp();
      }
      Alert.alert(error.message);
      setShowOtp(false);
      setLoading(false);
    }
  };

  const onConfirm = async () => {
    if (code === "") {
      Alert.alert("Thông báo", "Mã OTP không được rỗng");
      return;
    }
    try {
      const res = await confirm?.confirm(code);
      navigation.navigate("InputPass", { phoneNumber: res?.user?.phoneNumber });
    } catch (error) {
      Alert.alert("Thông báo", "Mã OTP không hợp lệ");
    }
  };

  return (
    <View style={styles.container}>
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
      {showOtp ? (
        <>
          <View style={styles.containerText}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Vui lòng nhập mã OTP để xác thực số điện thoại
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
                onChangeText={(x) => setCode(x)}
                value={code}
                placeholder="Vui lòng nhập mã OTP"
                style={{ height: 50, fontSize: 22, flex: 0.7 }}
                keyboardType="numeric"
                maxLength={6}
              />
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
          onPress={showOtp ? onConfirm : onRegister}
          style={styles.bottom}
        >
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            {showOtp ? "Xác nhận OTP" : "Nhận mã OTP"}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default Register;
