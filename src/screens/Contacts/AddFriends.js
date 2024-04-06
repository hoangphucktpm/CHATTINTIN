import { View, Text, TouchableOpacity, TextInput, Image, Alert, TouchableHighlight } from "react-native";
import { AntDesign, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "./StyleAddFriends";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { FlatList } from 'react-native';

// Import FireBase
const AddFriends = (props) => {
    const [otp, setOTP] = useState("");
    const navigation = useNavigation();

    
    const Data = [ 
        {id:"1",name:"Nguyễn Văn A",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
        ,lastMessage:"Chào bạn",time:"2022-01-01"},
        {id:"2",name:"Nguyễn Văn A",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
        ,lastMessage:"Chào bạn",time:"2022-01-01"}
    ];


    const hanldPressDashBoard = () => {
        Alert.alert("Thông báo", "Bạn có chắc chắn muốn thoát không ?", [
            {
                text: "Có",
                onPress: () => {
                    navigation.navigate("Login");
                },
            },
            {
                text: "Không",
                onPress: () => {
                    return;
                },
            },
        ]);
    };


    const Sreach = () => {
        return <FlatList data={Data} renderItem={renderItem} keyExtractor={item => item.id} />
    };




        const renderItem = ({item}) =>{
            var imageItem = (item.image == undefined)? "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg":item.image;
            return  <TouchableHighlight underlayColor={'#E6E6FA'} style={styles.touchHightLight} onPress={()=>{
                const id = item.id;
                // dispatch(roomAPI.getListChat()({ accessToken, id }));
                // dispatch(roomAPI.saveRoomId()(id))
                navigation.navigate("Chat",{id:item.id,name:item.name,image:imageItem,lastMessage:item.lastMessage,time:item.time})
            }}>
    
                    <View style={styles.containerItem} >
                        <View style={styles.itemFriend_info}>
                            <View style={styles.itemFriend_avatar}>
                                <Image style={styles.itemFriend_avatar_avatar} source={{uri: `${imageItem}`}} />    
                            </View>
                        </View>
                        <View style={styles.itemFriend_right}>
                            <Text style={{fontSize:20,}}>{item.name}</Text>
                        </View>
                    </View>
            </TouchableHighlight>
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

            // })
            // .catch(error => {
            //     Alert.alert("Thông báo", "Xảy ra lỗi! \n Mời bạn thử lại");
            // });
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
                    <Text style={{ fontSize: 22, color: "white" }}>Thêm bạn</Text>
                </View>
            </View>
            <View style={styles.containerInput}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginRight: 10,
                        marginLeft: 10,
                        borderRadius: 20,
                        backgroundColor: "#DCDCDC",
                        alignItems: "center",
                    }}
                >
                </View>

                <View
    style={{
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        borderRadius: 20,
        backgroundColor: "#DCDCDC",
        alignItems: "center",
    }}
>
    
    <View style={{ flex: 0.15, alignItems: "center" }}>
        <FontAwesome5 name="keyboard" size={24} color="black" />
    </View>
    <View style={{ flex: 0.85, flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
            onChangeText={(x) => setOTP(x)}
            value={otp}
            placeholder="Nhập số điện thoại bạn bè"
            style={{ height: 50, fontSize: 18, flex: 1, marginRight: 10 }}
            keyboardType="numeric"
        />
    </View>
    
</View>


<TouchableOpacity
                    onPress={Sreach } style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: "#1E90FF" }}>Tìm kiếm</Text>
                </TouchableOpacity>
            

{/* 
onPress={() => {
    // Tìm kiếm bạn bè
}} style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 15, color: "#1E90FF" }}>Tìm kiếm</Text>
</TouchableOpacity>
     */}


                {/* 
                <TouchableOpacity onPress={hanldPressLogin} style={{marginTop:25,alignItems:'center',width:"100%"}} >
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <Text style={{fontSize:20,marginRight:10,}}> Đã có tài khoản?</Text>
                        <Text style={{fontSize:22,fontWeight:'bold',marginRight:10,color:'#F4A460'}}> Đăng nhập</Text>
                        
                    </View>
            </TouchableOpacity> */}
            </View>

            <View style={{flex:0.8, backgroundColor:"white"}}>
                <FlatList data={Data} renderItem={renderItem} keyExtractor={item => item.id} />
                            
    </View>

            <View style={styles.containerBottom}>
                <TouchableOpacity onPress={hanldPressRegister} style={styles.bottom}>
                    <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}> Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddFriends;
