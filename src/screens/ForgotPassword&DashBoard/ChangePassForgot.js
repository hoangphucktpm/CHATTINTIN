import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";
import styles from "../Login&Register/StyleInputPass";
import { Ionicons } from "@expo/vector-icons";

function ChangePassForgot(props) {
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordAgain, setIsPasswordAgain] = useState(true);
  const [passWord, setPassWord] = useState("");
  const [passWordAgain, setPassWordAgain] = useState("");

  const navigation = useNavigation();
  const { phoneNumber } = props?.route?.params;

  const handlePressDashboard = () => {
    navigation.goBack();
  };

  // Biểu thức chính quy cho yêu cầu mật khẩu mới
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Kiểm tra mật khẩu mới với biểu thức chính quy
  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  // mở mật khẩu
  const handlePressPass = () => {
    if (isPassword) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  // mở mật khẩu
  const handlePressPassAgain = () => {
    if (isPasswordAgain) {
      setIsPasswordAgain(false);
    } else {
      setIsPasswordAgain(true);
    }
  };

  const handleChangePassword = async () => {
    if (passWord === "") {
      Alert.alert("Thông báo", "Mời bạn nhập mật khẩu mới");
      // } else if (!validatePassword(passWord)) {
      //   Alert.alert(
      //     "Thông báo",
      //     "Mật khẩu không đáp ứng yêu cầu. Vui lòng kiểm tra lại."
      //   );
    } else if (passWord !== passWordAgain) {
      Alert.alert(
        "Thông báo",
        "Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại."
      );
    } else {
      try {
        const res = await api.resetPassword({
          username: phoneNumber,
          newpassword: passWord,
        });
        if (res?.data) {
          Alert.alert("Đổi mật khẩu thành công!", "Vui lòng đăng nhập lại!");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Lỗi", "Không thể thực hiện yêu cầu");
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"default"}
        translucent
        backgroundColor={"transparent "}
      />
      <View style={styles.containerTabBar}>
        <TouchableOpacity
          onPress={handlePressDashboard}
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
          <Text style={{ fontSize: 22, color: "white" }}>Quên mật khẩu</Text>
        </View>
      </View>

      <View style={styles.containerInput}>
        <View
          style={{
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
            <FontAwesome5 name="phone" size={32} color="black" />
          </View>
          <TextInput
            value={phoneNumber}
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
            onChangeText={(x) => setPassWord(x)}
            value={passWord}
            secureTextEntry={isPassword}
            placeholder="Vui lòng nhập mật khẩu mới"
            style={{ height: 50, fontSize: 22, flex: 0.7 }}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.15,
            }}
            onPress={handlePressPass}
          >
            {isPassword ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
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
            onChangeText={(x) => setPassWordAgain(x)}
            value={passWordAgain}
            secureTextEntry={isPasswordAgain}
            placeholder="Vui lòng nhập lại mật khẩu mới"
            style={{ height: 50, fontSize: 22, flex: 0.7 }}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.15,
            }}
            onPress={handlePressPassAgain}
          >
            {isPasswordAgain ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={handleChangePassword} style={styles.bottom}>
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            {" "}
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChangePassForgot;
