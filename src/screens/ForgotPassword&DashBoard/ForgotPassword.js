import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleForgotPassword";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";
import auth from "@react-native-firebase/auth";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

function ForgotPassword() {
  const [phone, setPhone] = useState("+84");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigation = useNavigation();
  const hanldPressDashBoard = () => {
    navigation.navigate("Login");
  };
  const [loading, setLoading] = useState(false);

  const sdt = /^\+84\d{9}$/;

  const hanldPressLinkResert = async () => {
    if (!phone) {
      Alert.alert("Vui lòng nhập số điện thoại");
      return;
    }
    if (!sdt.test(phone)) {
      Alert.alert("Số điện thoại không đúng định dạng");
      return;
    }
    try {
      const res = await api.checkUserExist({
        phone: phone,
      });
      setLoading(true);
      setShowOtp(true);
      if (!res.data.status) {
        const confirmation = await auth().signInWithPhoneNumber(phone);
        setConfirm(confirmation);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("Số điện thoại không tồn tại");
      }
    } catch (error) {
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
      navigation.navigate("ChangePassForgot", {
        phoneNumber: res?.user?.phoneNumber,
      });
    } catch (error) {
      Alert.alert("Thông báo", "Mã OTP không hợp lệ");
    }
  };
  return (
    <View style={styles.container}>
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
          <Text style={{ fontSize: 22, color: "white" }}>Lấy lại mật khẩu</Text>
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={{ fontSize: 18 }}>
          {showOtp
            ? "Vui lòng nhập mã OTP để xác thực số điện thoại"
            : "Vui lòng nhập số điện thoại để lấy lại mật khẩu"}
        </Text>
      </View>
      {showOtp ? (
        <>
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
          <View style={[styles.containerBottom, { justifyContent: "center" }]}>
            <TouchableOpacity onPress={onConfirm} style={styles.bottom}>
              <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
                Xác nhận OTP
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.containerInput}>
            <TextInput
              onChangeText={(x) => setPhone(x)}
              value={phone}
              defaultValue="+84"
              placeholder="Vui lòng nhập số điện thoại"
              style={{
                marginLeft: 15,
                marginRight: 15,
                height: 50,
                fontSize: 22,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={styles.containerBottom}>
            <View></View>
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
}

export default ForgotPassword;
