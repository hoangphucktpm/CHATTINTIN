import React, { useCallback, useEffect } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View,} from "react-native";
import styles from "./StyleDashBoard";
import PagerView from 'react-native-pager-view';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getData } from "../../utils/localStorageConfig";
import { api } from "../../apis/api";
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/authSclice'

function DashBoard(){
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const checkUserLogined = async () => {
      const phone = await getData('user-phone')
      if (phone) {
      try {
        const res = await api.getUserByPhone(phone);
        dispatch(setUser(res.data)); 
        return navigation.navigate('Home')
      } catch (error) {
        console.log(error)
      }
      }
    }
    useFocusEffect(
        useCallback(() => {
            checkUserLogined()
        }, []),
      )

    const hanldPressLogin = () => {
        navigation.navigate("Login");
    };
    const hanldPressRegister = () => {
        navigation.navigate("Register");
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/logo.jpg')} style={{height:100,width:220,marginTop:10,}}/>
            <View style={{height:400,width:"100%",marginTop:100,}}>
                <PagerView  style={styles.viewPager} initialPage={0}>
                    <View style={styles.page} key="1">
                    <Image source={require('../../../assets/logo1.png')} style={{height:300,width:"100%"}}/> 
                        <Text style={{textAlign:'center',marginTop:20,fontSize:22, color:'grey',paddingLeft:10,paddingRight:10,}}> Chào mừng bạn đến với ứng dụng chat TinTin của chúng tôi</Text>
                        <View style={{marginTop:10,display:'flex',flexDirection:'row'}}>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#1E90FF',borderRadius:20,borderWidth:1,}}>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#fff',borderRadius:20,borderWidth:1,}}></TouchableOpacity>
                            </View>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#fff',borderRadius:20,borderWidth:1,}}></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.page} key="2">
                    <Image source={require('../../../assets/logo2.png')} style={{height:300,width:"100%"}}/> 
                        <Text style={{textAlign:'center',marginTop:20,fontSize:22, color:'grey',paddingLeft:10,paddingRight:10,}}> Ứng dụng chat TinTin giúp bạn kết nối với bạn bè, người thân</Text>
                        <View style={{marginTop:10,display:'flex',flexDirection:'row'}}>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#fff',borderRadius:20,borderWidth:1,}}>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#1E90FF',borderRadius:20,borderWidth:1,}}></TouchableOpacity>
                            </View>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#fff',borderRadius:20,borderWidth:1,}}></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.page} key="3">
                    <Image source={require('../../../assets/logo3.png')} style={{height:300,width:"100%"}}/> 
                        <Text style={{textAlign:'center',marginTop:20,fontSize:22, color:'grey',paddingLeft:10,paddingRight:10,}}> TinTin giúp bạn chia sẻ hình ảnh, video, tin nhắn một cách dễ dàng</Text>
                        <View style={{marginTop:10,display:'flex',flexDirection:'row'}}>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#fff',borderRadius:20,borderWidth:1,}}>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#fff',borderRadius:20,borderWidth:1,}}></TouchableOpacity>
                            </View>
                            <View style={{marginRight:5,}}>
                                <TouchableOpacity style={{paddingTop:10,paddingRight:10,backgroundColor:'#1E90FF',borderRadius:20,borderWidth:1,}}></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </PagerView>
            </View>
            <View style={styles.containerBotton}>
                <TouchableOpacity style={styles.bottonLogin} onPress={hanldPressLogin}>
                    <Text style={{fontSize:22,color:'white'}}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={{marginTop:10,}}>
                    <TouchableOpacity style={styles.bottonRegister} onPress={hanldPressRegister}>
                        <Text style={{fontSize:22,}}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default DashBoard;