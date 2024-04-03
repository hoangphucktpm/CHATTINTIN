import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleForgotPassword";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";

function ForgotPassword() {
    const [username, setUsername] = useState("");
    const navigation = useNavigation();
    const hanldPressDashBoard = () => {
        navigation.navigate("Login");
    };

    // Connect FireBase

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const hanldPressLinkResert = async () => {
        if (!username) {
            Alert.alert("Vui lòng nhập số điện thoại");
            return;
        }
        try {
            const res = await api.checkUserExist({
                username: username,
            });
            if (!res.data.status) {
                navigation.navigate("OTPPassForgot", { phoneNumber: username });
                return;
            } else {
                Alert.alert("Số điện thoại không tồn tại");
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    console.log(username);
    return (
        <View style={styles.container}>
            <View style={styles.containerTabBar}>
                <TouchableOpacity
                    onPress={hanldPressDashBoard}
                    style={{ paddingLeft: 10, paddingRight: 10, justifyContent: "center", paddingTop: 10 }}
                >
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{ width: "73%", justifyContent: "center", paddingTop: 10 }}>
                    <Text style={{ fontSize: 22, color: "white" }}>Lấy lại mật khẩu</Text>
                </View>
            </View>
            <View style={styles.containerText}>
                <Text style={{ fontSize: 18 }}>Vui lòng nhập số điện thoại để lấy lại mật khẩu</Text>
            </View>
            <View style={styles.containerInput}>
                <TextInput
                    onChangeText={(x) => setUsername(x)}
                    value={username}
                    placeholder="Vui lòng nhập số điện thoại"
                    style={{ marginLeft: 15, marginRight: 15, height: 50, fontSize: 22, borderBottomWidth: 1 }}
                />
            </View>
            <View style={styles.containerBottom}>
                <View></View>
                <TouchableOpacity onPress={hanldPressLinkResert} style={styles.bottom}>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ForgotPassword;
