import { View,Text,TouchableOpacity,TextInput, Image, Alert } from "react-native";
import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import styles from "./StyleOTP";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

// Import FireBase
const  OTP =()=>{
    const [phone,setPhone] = useState("");
    const [userName,setuserName] = useState("");
    const [otp, setOTP] = useState("");

    const navigation = useNavigation()

    const hanldPressDashBoard = () => {
        navigation.navigate("DashBoard");

    };

   
    // Connect FireBase

    const regexOTP = /^\d{6}$/; // Biểu thức chính quy kiểm tra 6 số
    const hanldPressRegister = () => {
        if (otp === "") {
            Alert.alert("Thông báo", "Mã OTP không được rỗng");
        } else if (!regexOTP.test(otp)) {
            Alert.alert("Thông báo", "Mã OTP không hợp lệ");
        } else {
            // sendPhoneVerification(auth.currentUser)
            //     .then(() => {
            //         Alert.alert("Thông báo", `Đăng ký thành công ! ${'\n'}Mời bạn kiểm tra điện thoại để xác nhận`);
                    
                   navigation.navigate("InputPass", { phone: "123" });
                // })
                // .catch(error => {
                //     Alert.alert("Thông báo", "Xảy ra lỗi! \n Mời bạn thử lại");
                // });
        }
    }
                // createUserWithPhoneAndPassword(auth,phone,passWord)
                // .then((userCredential)=>{
                //     var user = userCredential.user;
                    // sendPhoneVerification(user);
                //     Alert.alert("Thông báo",`Đăng ký thành công ! ${'\n'}Mời bạn kiểm tra điện thoại để xác nhận`);
                //     setPhone("");
                //     setuserName("");
                    // navigation.navigate("InputPass");
                // })
                // .catch(error =>{
                //     Alert.alert("Thông báo","Xảy ra lỗi! \n Mời bạn nhập lại tài khoản và mật khẩu")
                // })


    return (


        <View style={styles.container}>
             <View style={styles.containerTabBar}>
                    <TouchableOpacity onPress={hanldPressDashBoard} style={{  paddingLeft:10,paddingRight:10,justifyContent:'center',paddingTop:10,}} >
                        <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={{width:"73%",justifyContent:'center',paddingTop:10,}}>
                        <Text style={{fontSize:22,color:'white',}}>Đăng ký</Text>
                    </View>
            </View>
            <View style={styles.containerText}>
                <Text style={{fontSize:18,textAlign:'center'}}>Vui lòng nhập mã OTP để xác thực số điện thoại</Text>
            </View>
            <View style={styles.containerInput}>
                {/* <TextInput onChangeText={x=>setuserName(x)} value={userName} placeholder="Vui lòng nhập Tên người dùng" style={{marginLeft:15,marginRight:15,height:50,fontSize:22,borderBottomWidth:1,}}/> */}
                <View style={{display:'flex',flexDirection:'row',borderWidth:1,marginRight:10,marginLeft:10,borderRadius:20,backgroundColor:"#DCDCDC",alignItems:"center"}}>
                    <View style={{flex:0.15,alignItems:'center'}}>
                        <Feather name="phone" size={32} color="black" />
                    </View>
                    <TextInput
  onChangeText={x => setPhone(x)} value={"1234"}
  style={{
    marginRight: 15,
    height: 50,
    fontSize: 22,
    flex: 0.85,
    color: 'black', 
    fontWeight: 'bold', 
  }}
  keyboardType="phone-pad"
  editable={false}
/>
                </View>


                <View style={{display:'flex',flexDirection:'row',borderWidth:1,marginLeft:10,marginRight:10,marginTop:10,borderRadius:20,backgroundColor:"#DCDCDC",alignItems:"center"}}>
                    <View style={{flex:0.15,alignItems:'center',}}>
                        <FontAwesome5 name="keyboard" size={24} color="black" />
                    </View>
                    <TextInput onChangeText={x=>setOTP(x)} value={otp}  placeholder="Vui lòng nhập mã OTP" style={{height:50,fontSize:22,flex:0.7}} keyboardType="numeric" maxLength={6}/>
                    {/* <TouchableOpacity style={{justifyContent:'center',alignItems:'center',flex:0.15}} onPress={hanldPressPass}>
                        {
                            (isPassword)? <Entypo name="eye" size={24} color="black" /> : <Entypo name="eye-with-line" size={24} color="black" />
                        }
                    </TouchableOpacity> */}
                </View>
                
{/* 
                <TouchableOpacity onPress={hanldPressLogin} style={{marginTop:25,alignItems:'center',width:"100%"}} >
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <Text style={{fontSize:20,marginRight:10,}}> Đã có tài khoản?</Text>
                        <Text style={{fontSize:22,fontWeight:'bold',marginRight:10,color:'#F4A460'}}> Đăng nhập</Text>
                        
                    </View>
            </TouchableOpacity> */}
            </View>
            
            <View style={styles.containerBottom}>
                <TouchableOpacity onPress={hanldPressRegister} style={styles.bottom} >
                    <Text style={{fontSize:22, color:'#fff',fontWeight:'bold'}}> Xác nhận</Text>
                </TouchableOpacity>
            </View>
            

        </View>
    );
}

export default OTP;