
// import React, { useEffect, useState } from 'react'
// import {  Text, View,TextInput, TouchableOpacity, Image, Alert } from 'react-native'
// import styles from './StyleCreateGroup'
// import { AntDesign, Feather, EvilIcons} from '@expo/vector-icons';
// import { SafeAreaView } from 'react-navigation';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { SwipeListView } from 'react-native-swipe-list-view';
// // import Checkbox from 'expo-checkbox';
// // import axios from 'axios';
// // import userAPI from '../../redux/reducers/user/userAPI';
// // import { useDispatch } from 'react-redux';
// function CreateGroup() {
// //    const navigation = useNavigation();
// //    const [name,setName] = useState();
// //    const [email,setEmail] = useState();
// //    const [friends, setfriends] = useState([]);
// //    const userState = useSelector(state => state.user)
// //    const token = userState.accessToken;
// //    const dispatch = useDispatch();
// //     useEffect(() => {
// //         axios
// //             .get(`http://54.254.183.128/api/users/friends`, {
// //                 headers: { authorization: token},
// //             })
// //             .then((r) => {
// //                 setfriends(r.data);
// //             })
// //             .catch((err) => {
// //                 console.log(err);
// //             });
// //     }, [token]);
// //     const [checkedItems, setCheckedItems] = useState([]);
// //     const isChecked = (id) => {
// //         return checkedItems.includes(id);
// //     };

// //   const toggleItem = (id) => {
// //     console.log(id);
// //     if (isChecked(id)) {
// //       setCheckedItems(checkedItems.filter(item => item !== id));
// //     } else {
// //       setCheckedItems([...checkedItems, id]);
// //     }
// //   };
// //   console.log(checkedItems);
// //     const renderItem = ({item}) =>{
// //         var Name = (item.userId.name == undefined)? item.userId.email : item.userId.name;
// //         var image = (item.userId.avatar == undefined)?  "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg": item.userId.avatar;
// //         return(
// //             <TouchableOpacity style={{height:60,display:'flex',flexDirection:'row',flex:1,marginBottom:10,}} onPress={()=> toggleItem(item.userId._id)}>
// //                 <View style={{flex:0.15,justifyContent:'center',alignItems:'center'}} >
// //                     <Checkbox  value={isChecked(item.userId._id)? true : false} style={{height:30,width:30,borderRadius:100,}} />
// //                 </View>
// //                 <View style={{flex:0.15,borderRadius:100,}}>
// //                     <Image source={{uri:image}} style={{flex:1,borderRadius:100,}}/>
// //                 </View>
// //                 <View style={{flex:0.7,marginLeft:10,justifyContent:"center"}}>
// //                     <Text style={{fontSize:22,}}>{Name}</Text>
// //                     <Text style={{fontSize:18,color:"grey"}}>2 giờ</Text>
// //                 </View>
// //             </TouchableOpacity>
// //         );
// //     };
// //     const createGroup = () => {
// //         if (checkedItems.length <= 1) {
// //             Alert.alert("Nhắc nhỡ","Tạo nhóm phải 2 người trở lên");
// //             return;
// //         }
// //         if (!name) {
// //             alert("Nhắc nhỡ","Nhập tên nhóm");
// //             return;
// //         }
// //         console.log(checkedItems);
// //         axios
// //             .post(
// //                 `http://54.254.183.128/api/rooms`,
// //                 {
// //                     userIds: checkedItems,
// //                     name: name,
// //                 },
// //                 {
// //                     headers: { authorization: token },
// //                 }
// //             )
// //             .then((r) => {
// //                 console.log(r.data);
// //                 dispatch(userAPI.updateListRoomUI()(r.data));
// //             })
// //             .catch((err) => {
// //                 console.log(err);
// //             });
// //     };
//   return (
//     <SafeAreaView style={styles.container}>
//         <View style={styles.containerHeader}>
//             <View  style={styles.containerIcon}>
//                     <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles.button}>
//                     <AntDesign name="close" size={24} color="white" />
//                     </TouchableOpacity>
//             </View>
//             <View style={styles.containerText}>
//                 <Text style={styles.text}> Tạo nhóm mới</Text>
//             </View>
//         </View>
//         <View style={styles.containerBody}>
//             <View style={styles.containerBodyHeader}>
//                 <View style={styles.containerBodyHeader_Image}>
//                     <TouchableOpacity style={styles.buttonImage}>
//                         <Feather name="camera" size={32} color="black" />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.containerBodyHeader_Input}>
//                 <TextInput onChangeText={x=>setName(x)} value={name} placeholder="Đặt tên nhóm" style={{fontSize:22,flex:1,marginLeft:10,}}/>
//                 </View>
//             </View>
//             <View style={styles.containerBodySearch}>
//                 <View style={styles.containerBodySearchItem}>
//                         <View style={{flex:0.1,alignItems:'center',}}>
//                             <EvilIcons name="search" size={32} color="black" />
//                         </View>
//                         <View style={{flex:0.8,}}>
//                             <TextInput onChangeText={x=>setEmail(x)} value={email} placeholder="Tìm kiếm bằng tên hoặc email" style={{fontSize:18,flex:1,marginLeft:10,marginRight:10,}}/>
//                         </View>
//                         <View style={{flex:0.1,alignItems:'center',}}>
//                             <AntDesign name="idcard" size={24} color="black" />
//                         </View>
//                 </View>
//             </View>
//             <View style={styles.flatList}>
//                 <SwipeListView  nestedScrollEnabled={true} data ={friends} renderItem={renderItem}  keyExtractor={item => `${item._id}`}/>
//             </View>
//             <View style={styles.buttonCreate}>
//                     <TouchableOpacity onPress={createGroup} style={styles.buttonCreateGroup}>
//                         <AntDesign name="arrowright" size={24} color="white" />
//                     </TouchableOpacity>
//             </View>
//         </View>
//     </SafeAreaView>
//   )
// }

// export default CreateGroup;
