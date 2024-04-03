import { View, Text, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import { AntDesign, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleInputPass";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../apis/api";
// Import FireBase

function InputPass(props) {
    const [isPassword, setIsPassword] = useState(true);
    const [isPasswordAgain, setIsPasswordAgain] = useState(true);

    const [passWord, setPassWord] = useState("");
    const [passWordAgain, setPassWordAgain] = useState("");

    const navigation = useNavigation();
    const { phoneNumber } = props?.route?.params;
    const hanldPressDashBoard = () => {
        navigation.navigate("OTP");
    };

    const hanldPressPass = () => {};
    const hanldPressPassAgain = () => {};
    const hanldPressRegister = async () => {
        if (passWord != passWordAgain) {
            Alert.alert("Thông báo", "Mật khẩu xác nhận không giống với mật khẩu trên");
        } else if (passWord == "" || passWordAgain == "") {
            Alert.alert("Thông báo", "Mời bạn nhập mật khẩu");
        } else {
            try {
                const res = await api.register({
                    username: phoneNumber,
                    password: passWord,
                });
                if (res?.data) {
                    Alert.alert("Đăng ký thành công");
                    console.log("resid", res?.data?.id);
                    navigation.navigate("InputProfile", { idNewUser: res?.data?.ID });
                }
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    };

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
                    <Text style={{ fontSize: 22, color: "white" }}>Đăng Ký</Text>
                </View>
            </View>
            <View style={styles.containerText}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>Vui lòng nhập mật khẩu để đăng ký tài khoản</Text>
            </View>
            <View style={styles.containerInput}>
                {/* <TextInput onChangeText={x=>setuserName(x)} value={userName} placeholder="Vui lòng nhập Tên người dùng" style={{marginLeft:15,marginRight:15,height:50,fontSize:22,borderBottomWidth:1,}}/> */}
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
                        style={{ justifyContent: "center", alignItems: "center", flex: 0.15 }}
                        onPress={hanldPressPass}
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
                        onChangeText={(x) => setPassWordAgain(x)}
                        value={passWordAgain}
                        secureTextEntry={isPasswordAgain}
                        placeholder="Vui lòng nhập lại mật khẩu"
                        style={{ height: 50, fontSize: 22, flex: 0.7 }}
                    />
                    <TouchableOpacity
                        style={{ justifyContent: "center", alignItems: "center", flex: 0.15 }}
                        onPress={hanldPressPassAgain}
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
                <TouchableOpacity onPress={hanldPressRegister} style={styles.bottom}>
                    <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}> Đăng ký</Text>
                </TouchableOpacity>
            </View>

            {/*
             */}
        </View>
    );
}

export default InputPass;
