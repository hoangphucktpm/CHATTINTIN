import { View,Text,TouchableOpacity,TextInput, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import styles from "./StyleForgotPassword";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function ForgotPassword(){
    
    const [email,setEmail] = useState("");
    const navigation = useNavigation();
    const hanldPressDashBoard = () => {
        navigation.navigate("Login");
    };
    
    // Connect FireBase

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const hanldPressLinkResert = ()=>{
        if(email == ""){
            console.log("Số điện thoại không rỗng")
        }
        else if(regexEmail.test(email)){
            sendPasswordResetEmail(auth,email).then(()=>{
                Alert.alert("Thông báo","OTP đã được gửi về số điện thoại của bạn");
                navigation.navigate("Login");
            }).catch((err)=>{
                console.log(err);
                Alert.alert("Thông báo","Xảy ra lỗi");
            });
            // Alert.alert("Thông báo","Đã gởi link đổi lại mật khẩu vào Email của bạn");
        }
        else{
            // Alert.alert("Thông báo","Email của bạn không hợp lệ")
        }
        // signInWithEmailAndPassword(auth,email,passWord)
        // .then(()=>{
        //     navigation.navigate("Home");
        // })
        // .catch(error =>{
        //     Alert.alert("Thông báo","Xảy ra lỗi! \n Mời bạn nhập lại tài khoản và mật khẩu")
        // })
    }
    return (
        <View style={styles.container}>
             <View style={styles.containerTabBar}>
                    <TouchableOpacity onPress={hanldPressDashBoard} style={{  paddingLeft:10,paddingRight:10,justifyContent:'center',paddingTop:10,}} >
                        <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={{width:"73%",justifyContent:'center',paddingTop:10,}}>
                        <Text style={{fontSize:22,color:'white',}}>Lấy lại mật khẩu</Text>
                    </View>
            </View>
            <View style={styles.containerText}>
                <Text style={{fontSize:18,}}>Vui lòng nhập số điện thoại để lấy lại mật khẩu</Text>
            </View>
            <View style={styles.containerInput}>
                <TextInput onChangeText={x=>setEmail(x)} value={email} placeholder="Vui lòng nhập số điện thoại" style={{marginLeft:15,marginRight:15,height:50,fontSize:22,borderBottomWidth:1,}}/>
            </View>
            <View style={styles.containerBottom}>
                <View></View>
                <TouchableOpacity onPress={hanldPressLinkResert} style={styles.bottom} >
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ForgotPassword;