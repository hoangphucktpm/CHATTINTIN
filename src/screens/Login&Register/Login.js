import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { AntDesign, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleLogin";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";
import { storeData } from "../../utils/localStorageConfig";

function Login() {
  //UseState
  const navigation = useNavigation();

  const [isPassword, setPassword] = useState(true);
  const [phone, setPhone] = useState("84");
  const [passWord, setPassWord] = useState("");
  //UseEffect
  const hanldPress = () => {
    if (isPassword) {
      setPassword(false);
    } else {
      setPassword(true);
    }
  };

  const hanldPressForgotPasswrod = () => {
    navigation.navigate("ForgotPassword");
  };
  const hanldPressDashBoard = () => {
    navigation.navigate("DashBoard");
  };
  const hanldPressLogin = async () => {
    try {
      const res = await api.login({
        username: phone,
        password: passWord,
      });

      await storeData("user-phone", phone);
      // Chỉ hiện thông báo lên thôi
      Alert.alert("Đăng nhập thành công");
      navigation.navigate("Home", { phone: res.data.data });
    } catch (error) {
      console.log(error.message);
      Alert.alert("Mật khẩu hoặc tài khoản không đúng");
    }
  };

  const hanldPressRegister = () => {};
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
          <Text style={{ fontSize: 22, color: "white" }}>Đăng nhập</Text>
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={{ fontSize: 18 }}>
          Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
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
            marginBottom: 10,
            marginTop: -50,
          }}
        >
          <View style={{ flex: 0.15, alignItems: "center" }}>
            <Feather name="phone" size={32} color="black" />
          </View>
          <TextInput
            onChangeText={(x) => setPhone(x)}
            value={phone}
            placeholder="Vui lòng nhập số điện thoại"
            style={{ marginRight: 15, height: 50, fontSize: 22, flex: 0.85 }}
            keyboardType="phone-pad"
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
            onChangeText={(x) => setPassWord(x)}
            value={passWord}
            secureTextEntry={isPassword}
            placeholder="Vui lòng nhập mật khẩu"
            style={{ height: 50, fontSize: 22, flex: 0.7 }}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.15,
            }}
            onPress={hanldPress}
          >
            {isPassword ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ margin: 15, marginTop: 25 }}
          onPress={hanldPressForgotPasswrod}
        >
          <Text style={{ fontSize: 20, color: "#63B8FF", fontWeight: "bold" }}>
            Lấy lại mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={hanldPressLogin} style={styles.bottom}>
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
            {" "}
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.15,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20 }}>Chưa có tài khoản?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ fontSize: 22, color: "#F4A460", fontWeight: "bold" }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
      {/*
       */}
    </View>
  );
}

export default Login;
