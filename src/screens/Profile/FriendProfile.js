import { ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./StyleFriendProfile";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from "../../apis/api";
import { useSelector } from "react-redux";



function FriendProfile({ route }) {
    const { phone, fullname, urlavatar } = route.params;
    const navigation = useNavigation();
    const {user} = useSelector((state) => state.auth);

    const [friendRequests, setFriendRequests] = useState([]);
    useEffect(() => {
      if (!user) return navigation.navigate('Login');
      const getFriendRequests = async () => {
        
        const res = await api.getAllFriendRequests(user.ID)
        console.log('res', res.data)
      }
      getFriendRequests()
    }, [user])




    const hanldPressGoBack = () => {
        navigation.goBack();
    };

    const [add, setAdd] = useState("Kết bạn");
    const [isAdd, setIsAdd] = useState(false);

    // const infoState = useSelector(state => state.info);
    // const token = tokenService.getAccessToken();

    const handelPress = () => {
        if (isAdd) {
            setAdd("Kết bạn");
            setIsAdd(false);
        } else {
            try {
                api.handleSendFriendRequest({ senderId: user.ID, receiverId: route.params.ID }).then((res) => {
                    console.log(res.data);
                    Alert.alert("Thông báo", res.data.message);
                    setAdd("Hủy lời mời");
                    setIsAdd(true);
               })

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerTabBar}>
                <TouchableOpacity onPress={hanldPressGoBack} style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', paddingTop: 10, }}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{ width: "73%", justifyContent: 'center', alignItems: 'center', paddingTop: 10, }}>
                    <Text style={{ fontSize: 24, color: 'white', }}>Trang cá nhân</Text>
                </View>
            </View>
            <ScrollView style={{ paddingBottom: 0 }}>
                <View style={styles.containerBody}>
                    <ImageBackground source={{ uri: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/background-dep-don-gian-de-thiet-ke-780x521.jpg' }} style={styles.containerBody_Top}>
                        <Image style={styles.containerBody_Top_Avt} source={{ uri: urlavatar || 'https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg' }} />
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', marginTop: 10, }}>{fullname}</Text>
                    </ImageBackground>
                    <View style={styles.containerBody_Mid}>
                        <View style={styles.containerBody_Mid_Bottom} >
                            <View style={styles.containerBody_Mid_Bottom_Item} >
                                {!isAdd && (
                                    <View style={{ marginRight: 10 }}>
                                        <TouchableOpacity onPress={handelPress} style={styles.bottom}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 0 ,  color: 'white'}}>{add}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <TouchableOpacity style={styles.bottom} onPress={() => navigation.navigate("Chat", { phone: phone, fullname: fullname, urlavatar: urlavatar })}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 0 , color: 'white' }}>Nhắn tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default FriendProfile;
