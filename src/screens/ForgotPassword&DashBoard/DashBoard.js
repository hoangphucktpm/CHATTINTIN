import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View,} from "react-native";
import styles from "./StyleDashBoard";
import PagerView from 'react-native-pager-view';
import { useNavigation } from "@react-navigation/native";

function DashBoard(){
    const navigation = useNavigation();
    const hanldPressLogin = () => {
        navigation.navigate("Login");
    };
    const hanldPressRegister = () => {
        navigation.navigate("Register");
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/logo.jpg')} style={{height:70,width:150,marginTop:20,}}/>
            <View style={{height:400,width:"100%",marginTop:40,}}>
                <PagerView  style={styles.viewPager} initialPage={0}>
                    <View style={styles.page} key="1">
                        <Image source={{url:'https://i.ytimg.com/vi/OpV0R1ANQhM/maxresdefault.jpg'}} style={{height:300,width:"100%"}}/>
                        <Text style={{textAlign:'center',marginTop:20,fontSize:22, color:'grey',paddingLeft:10,paddingRight:10,}}>Chào mừng đã đến với mạng xã hội của chúng tôi</Text>
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
                        <Image source={{url:'https://blog.bonus.ly/hs-fs/hubfs/group-of-team-members-debating.png?width=600&name=group-of-team-members-debating.png'}} style={{height:300,width:"100%"}}/>
                        <Text style={{textAlign:'center',marginTop:20,fontSize:22, color:'grey',paddingLeft:10,paddingRight:10,}}>Chúng tôi giúp kết nối với các bạn bè trên khắp đất nước Việt Nam</Text>
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
                        <Image source={{url:'https://jobsgo.vn/blog/wp-content/uploads/2019/09/business-development-2.jpg'}} style={{height:300,width:"100%"}}/>
                        <Text style={{textAlign:'center',marginTop:20,fontSize:22, color:'grey',paddingLeft:10,paddingRight:10,}}>Chúng tôi giúp kết nối với các doanh nghiệp khắp đất nước Việt Nam</Text>
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