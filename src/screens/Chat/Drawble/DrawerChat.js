// import { ScrollView, View,Text,TouchableOpacity, Image, Switch,TextInput, Platform, Alert } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { AntDesign } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';
// import styles from "./StyleDrawerChat";
// import { useState } from "react";
// import { MaterialIcons } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
// import { useNavigation } from "@react-navigation/native";
// import {Button,Dialog,Portal,Provider,} from 'react-native-paper';
// import { useSelector } from "react-redux";
// import * as ImagePicker  from 'expo-image-picker';
// import roomAPI from "../../../redux/reducers/Room/roomAPI";
// import userAPI from "../../../redux/reducers/user/userAPI";
// import { useDispatch } from "react-redux";
// import tokenService from "../../../services/token.service";
// import axios, { Axios } from "axios";

// function DrawerChat({route}){
//     const {id,name,image,owner} = route.params;
//     const roomState = useSelector(state => state.room);
//     const userState = useSelector(state => state.user);
//     const token = tokenService.getAccessToken();

//     const roomId = id;
//     const navigation = useNavigation();
//     const [isBFF,setIsBFF] = useState(false);
//     const hanldPressGoBack= ()=>{
//         navigation.navigate("ChatWindow",{id:id,name:nameChange,image:avtChange,owner:owner});
//     }
//     const [nameChange, setnameChange] = useState(name);
//     const [avtChange, setavtChange] = useState(image);
//     const [isDialogVisible, setIsDialogVisible] = useState(false);
//     const dispatch = useDispatch();
//     const urlUploadFile = `http://54.254.183.128/api/rooms/${roomId}/avatar`;
//     const updateName = () =>{
//         axios({
//             url: `http://54.254.183.128/api/rooms/${roomId}/name`,
//             method: "PATCH",
//             headers: {
//                 authorization: token
//             },
//             data: {
//                 name: nameChange
//             }
//         }).then((res)=>{
//             Alert.alert("Thông báo","Đổi tên thành công!!");
//             setIsDialogVisible(false);
//         }).catch((err)=>{
//             console.log(err);
//         })
//         //  axios.patch(
//         //     `http://54.254.183.128/api/rooms/${roomId}/name`,

//         //     {data,
//         //       headers: { authorization: token },
//         //     }
//         // );
//         // dispatch(
//         //     roomAPI.saveRoomId()({ _id: roomId, avatar: avtChange, name: nameChange })
//         //   );
//         //   dispatch(
//         //     userAPI.updateRoomByIdUI()({ _id: roomId, avatar: avtChange, name: nameChange })
//         //   );
//         //   setIsDialogVisible(false)
//     }
//     const hanldPressMemberGroup = ()=>{
//         navigation.navigate("MemberGroup",{id: id,owner:owner});
//     }

//     // Đổi avt
//     // const pickImage = async () => {
//     //     // No permissions request is necessary for launching the image library
//     //     let result = await ImagePicker.launchImageLibraryAsync({
//     //       mediaTypes: ImagePicker.MediaTypeOptions.All,
//     //       allowsEditing: true,
//     //       quality: 1,
//     //     });
//     //     if (!result.cancelled) {
//     //         let localUri = result.uri;
//     //         let formData = new FormData();
//     //         let uriParts = localUri.split(".");
//     //         const path = localUri.split("/");
//     //         let fileType = uriParts[uriParts.length - 1];
//     //         let nameFile = path[path.length - 1];
//     //         const _image = {
//     //           uri: Platform.OS === "android" ? localUri : localUri.replace("file://", ""),
//     //           type: `image/${fileType}`,
//     //           name: nameFile,
//     //         };
//     //         formData.append("file", _image);

//     //       axios.patch(urlUploadFile, formData, {
//     //         headers: {
//     //             authorization: token,
//     //             "Content-type": "multipart/form-data",
//     //         },
//     //         })
//     //       .then(() => {
//     //         alert("Vào")
//     //       })
//     //       .catch((err) => {
//     //         console.log(err);
//     //         alert("Error Upload file");
//     //       });
//     //     // dispatch(
//     //     //     roomAPI.saveRoomId()({ _id: roomId, avatar: avtChange, name: nameChange })
//     //     //   );
//     //     // dispatch(
//     //     //     userAPI.updateRoomByIdUI()({ _id: roomId, avatar: avtChange, name: nameChange })
//     //     //   );

//     //     }
//     //     else if(result.cancelled){
//     //       console.log(result);
//     //     }

//     //   };
//     const pickImage = async () => {
//         // No permissions request is necessary for launching the image library
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.All,
//           allowsEditing: true,
//           quality: 1,
//         });
//         if (!result.cancelled) {
//           let localUri = result.uri;
//           let formData = new FormData();
//           let uriParts = localUri.split(".");
//           const path = localUri.split("/");
//           let fileType = uriParts[uriParts.length - 1];
//           let nameFile = path[path.length - 1];
//           const _image = {
//             uri: Platform.OS === "android" ? localUri : localUri.replace("file://", ""),
//             type: `image/${fileType}`,
//             name: nameFile,
//           };
//           formData.append("file", _image);
//           axios.patch(urlUploadFile, formData, {
//                         headers: {
//                             authorization: token,
//                             "Content-type": "multipart/form-data",
//                         },
//                     })
//                     .then((res) => {
//                        console.log(res)
//                     })
//                     .catch((err) => {
//                         alert("Error Upload file");
//                     });
//         //   axios.post(urlUploadFile, formData, {
//         //                 headers: {
//         //                     authorization: token,
//         //                     "Content-type": "multipart/form-data",
//         //                 },
//         //             })
//         //             .then((res) => {
//         //                console.log(res)
//         //             })
//         //             .catch((err) => {
//         //                 alert("Error Upload file");
//         //             });

//         }
//         else if(result.cancelled){
//           console.log(result);
//         }

//       };
//       const deleteGroupHandleClick =  () => {
//         const roomId = roomState._id;
//          axios.delete(`http://54.254.183.128/api/rooms/${roomId}`, {
//                 headers: { authorization: token },
//             }
//           )
//           .then(() => {
//             navigation.navigate("Home");
//             var user = userAPI.getUserInfo()(token);
//             dispatch(user);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };
//     return(
//         <Provider>
//             <View style={styles.container} >
//             <View style={styles.containerTabBar}>
//                     <TouchableOpacity onPress={hanldPressGoBack} style={{  paddingLeft:10,paddingRight:10,justifyContent:'center',paddingTop:10,}} >
//                         <Ionicons name="arrow-back" size={30} color="#fff" />
//                     </TouchableOpacity>
//                     <View style={{width:"73%",justifyContent:'center',alignItems:'center',paddingTop:10,}}>
//                         <Text style={{fontSize:24,color:'white',}}>Tuỳ chọn</Text>
//                     </View>
//             </View>

//             <ScrollView style={{paddingBottom: 600}}>
//                 <View style={styles.containerBody}>
//                     <View style={styles.containerBody_Top}>
//                         <Image style={styles.containerBody_Top_Avt}source={{ uri: avtChange}}/>
//                         <Text style={{fontSize:30,fontWeight:'bold',color:'black',marginTop:10,}}>{nameChange}</Text>
//                         <View style={styles.containerBody_Top_Icon}>
//                             <TouchableOpacity style={styles.containerBody_Top_Icon_Icon}>
//                                 <View style={styles.containerBody_Top_Icon_IconItem}>
//                                     <Ionicons name="search" size={20} color="black" />
//                                 </View>
//                                 <View style={styles.containerBody_Top_Icon_IconText}>
//                                 <Text style={{color:'#4F4F4F',textAlign:'center'}}>Tìm {'\n'} tin nhắn</Text>
//                                 </View>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={hanldPressMemberGroup} style={styles.containerBody_Top_Icon_Icon}>
//                                 <View style={styles.containerBody_Top_Icon_IconItem}>
//                                     <AntDesign name="user" size={20} color="black" />
//                                 </View>
//                                 <View style={styles.containerBody_Top_Icon_IconText}>
//                                 <Text style={{color:'#4F4F4F',textAlign:'center'}}>Xem {'\n'} thành viên</Text>
//                                 </View>
//                             </TouchableOpacity>
//                             {(owner==userState.user._id)? <TouchableOpacity onPress={pickImage} style={styles.containerBody_Top_Icon_Icon}>
//                                 <View style={styles.containerBody_Top_Icon_IconItem}>
//                                     <FontAwesome5 name="brush" size={20} color="black" />
//                                 </View>
//                                 <View style={styles.containerBody_Top_Icon_IconText}>
//                                 <Text style={{color:'#4F4F4F',textAlign:'center'}}>Đổi {'\n'} hình nền</Text>
//                                 </View>
//                             </TouchableOpacity> : null}
//                             <TouchableOpacity style={styles.containerBody_Top_Icon_Icon}>
//                                 <View style={styles.containerBody_Top_Icon_IconItem}>
//                                     <AntDesign name="bells" size={20} color="black" />
//                                 </View>
//                                 <View style={styles.containerBody_Top_Icon_IconText}>
//                                 <Text style={{color:'#4F4F4F',textAlign:'center'}}>Tắt {'\n'} thông báo</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <View style={styles.containerBody_Mid}>
//                             <View style={styles.containerBody_Mid_ChangeName}>
//                                 {/* <TouchableOpacity onPress={() => setIsDialogVisible(true)} style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <Ionicons name="pencil" size={24} color="#828282"  style={{width:"15%",height:"100%"}} />
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Đổi tên gợi nhớ</Text>
//                                     </View>
//                                 </TouchableOpacity> */}
//                                 {
//                                     (owner==userState.user._id)? <TouchableOpacity onPress={() => setIsDialogVisible(true)} style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <Ionicons name="pencil" size={24} color="#828282"  style={{width:"15%",height:"100%"}} />
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Đổi tên gợi nhớ</Text>
//                                     </View>
//                                 </TouchableOpacity> : null
//                                 }
//                                 <View style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <MaterialCommunityIcons name="star-outline" size={30} color="#828282"style={{width:"15%",height:"100%"}} />
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Đánh dấu bạn thân</Text>
//                                         <Switch style={{marginRight:10,marginBottom:15,}} value = {isBFF} onValueChange={(value)=>{
//                                             setIsBFF(value) }} />
//                                     </View>
//                                 </View>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <AntDesign name="clockcircleo" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Nhật kí chung</Text>
//                                         <AntDesign name="right" size={15} color="black" style={{paddingRight:10,paddingTop:5,}} />
//                                     </View>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View style={styles.containerBody_Mid_File} >
//                             <TouchableOpacity style={styles.containerBody_Mid_File_Item}>
//                                         <Ionicons name="ios-folder-outline" size={24} color="#828282" style={{width:"15%",height:"100%"}} />
//                                         <View style={styles.containerBody_Mid_File_Item_Text}>
//                                             <Text style={{fontSize:20,color:'black',}}>Ảnh, file , link đã gửi</Text>
//                                             <AntDesign name="right" size={15} color="black" style={{paddingRight:10,}} />
//                                         </View>
//                             </TouchableOpacity>
//                             <View style={styles.containerBody_Mid_File_Item}>
//                                         <View style={{width:"15%",height:"100%"}} />
//                                         <View style={styles.containerBody_Mid_File_Item_Img}>
//                                             <TouchableOpacity>
//                                             <Image style={styles.fileImg}source={{ uri: 'https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi11-1.jpg'}}/>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity>
//                                             <Image style={styles.fileImg}source={{ uri: 'https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi14-2.jpg'}}/>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity>
//                                             <Image style={styles.fileImg}source={{ uri: 'https://i.pinimg.com/736x/a6/2c/c3/a62cc3642d8da0c8202c968d266ec96f.jpg'}}/>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity>
//                                             <Image style={styles.fileImg}source={{ uri: 'https://i.pinimg.com/736x/1c/26/e2/1c26e224c5af80ac5decff6af5080efb.jpg'}}/>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity>
//                                                 <View style={styles.fileImg_View}>
//                                                     <Feather name="arrow-right" size={24} color="black" />
//                                                 </View>
//                                             </TouchableOpacity>
//                                         </View>
//                             </View>
//                         </View>
//                         <View style={styles.containerBody_Mid_Group}>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                 <MaterialIcons name="groups" size={24} color="#828282"  style={{width:"15%",height:"100%"}} />
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Tạo nhóm với Phước</Text>
//                                         <AntDesign name="right" size={15} color="black" style={{paddingRight:10,paddingTop:5,}} />
//                                     </View>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                 <AntDesign name="addusergroup" size={24} color="#828282" style={{width:"15%",height:"100%"}} />
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Thêm Phước vào nhóm</Text>
//                                         <AntDesign name="right" size={15} color="black" style={{paddingRight:10,paddingTop:5,}} />
//                                     </View>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                 <MaterialIcons name="group" size={24} color="#828282" style={{width:"15%",height:"100%"}} />
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Xem nhóm chung</Text>
//                                         <AntDesign name="right" size={15} color="black" style={{paddingRight:10,paddingTop:5,}} />
//                                     </View>
//                                 </TouchableOpacity>
//                         </View>
//                         {/* Funtion */}
//                         <View style={styles.containerBody_Mid_Funtion}>
//                                 <View style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <AntDesign name="pushpino" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Ghim trò chuyện</Text>
//                                         <Switch style={{marginRight:10,marginBottom:15,}} value = {isBFF} onValueChange={(value)=>{
//                                             setIsBFF(value) }} />
//                                     </View>
//                                 </View>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                 <AntDesign name="filter" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <View style={{marginBottom:15,}}>
//                                             <Text style={{fontSize:20,color:'black',}}>Phân loại</Text>
//                                             <Text style={{fontSize:16,color:'black',}}>Ưu tiên</Text>
//                                         </View>
//                                         <AntDesign name="right" size={15} color="black" style={{paddingRight:10,paddingTop:5,}} />
//                                     </View>
//                                 </TouchableOpacity>
//                                 <View style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <Entypo name="eye-with-line" size={24} color="#828282"  style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Ẩn trò chuyện</Text>
//                                         <Switch style={{marginRight:10,marginBottom:15,}} value = {isBFF} onValueChange={(value)=>{
//                                             setIsBFF(value) }} />
//                                     </View>
//                                 </View>
//                                 <View style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <Feather name="phone-incoming" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Báo cuộc gọi đến</Text>
//                                         <Switch style={{marginRight:10,marginBottom:15,}} value = {isBFF} onValueChange={(value)=>{
//                                             setIsBFF(value) }} />
//                                     </View>
//                                 </View>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <FontAwesome5 name="users-cog" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                             <Text style={{fontSize:20,color:'black',}}>Cài đặt cá nhân</Text>
//                                         <AntDesign name="right" size={15} color="black" style={{paddingRight:10,paddingTop:5,}} />
//                                     </View>
//                                 </TouchableOpacity>
//                                 <View style={styles.containerBody_Mid_ChangeName_Item}>
//                                 <MaterialIcons name="lock-clock" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <View style={{marginBottom:15,}}>
//                                             <Text style={{fontSize:20,color:'black',}}>Tin nhắn tự xóa</Text>
//                                             <Text style={{fontSize:16,color:'black',}}>Không tự xóa</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                             {/* Report */}
//                             <View style={styles.containerBody_Mid_Report}>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <MaterialIcons name="report-problem" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                         <Text style={{fontSize:20,color:'black',}}>Báo xấu</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.containerBody_Mid_ChangeName_Item}>
//                                 <Entypo name="block" size={24} color="#828282" style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                             <Text style={{fontSize:20,color:'black',}}>Chặn tin nhắn</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                                 {(owner == userState.user._id)? <TouchableOpacity onPress={deleteGroupHandleClick} style={styles.containerBody_Mid_ChangeName_Item}>
//                                     <MaterialIcons name="delete" size={24} color="#828282"  style={{width:"15%",height:"100%"}}/>
//                                     <View style={styles.containerBody_Mid_ChangeName_Item_Text}>
//                                             <Text style={{fontSize:20,color:'red',}}>Xóa cuộc trò chuyện</Text>
//                                     </View>
//                                 </TouchableOpacity>: null}
//                             </View>
//                     </View>
//             </ScrollView>
//             <Portal>
//                 <Dialog
//                     visible={isDialogVisible}
//                     onDismiss={() => setIsDialogVisible(false)}>
//                     <Dialog.Title style={{fontSize:23,}}>Nhập tên cần đổi</Dialog.Title>
//                     <Dialog.Content>
//                     <TextInput
//                         value={nameChange}
//                         onChangeText={text => setnameChange(text)}
//                         style={{fontSize:24,borderBottomWidth:1,}}
//                     />
//                     </Dialog.Content>
//                     <Dialog.Actions>
//                     <Button onPress={() => setIsDialogVisible(false)}>Thoát</Button>
//                     <Button onPress={updateName}>Xác nhận</Button>
//                     </Dialog.Actions>
//                 </Dialog>
//             </Portal>
//         </View>
//         </Provider>
//     );
// }
// export default DrawerChat;
