// import React, { useEffect, useState } from 'react'
// import {  Text, View,TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native'
// import { AntDesign, Feather, EvilIcons, Entypo} from '@expo/vector-icons';
// import { SafeAreaView } from 'react-navigation';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { SwipeListView } from 'react-native-swipe-list-view';
// import Checkbox from 'expo-checkbox';
// import axios from 'axios';
// import userAPI from '../../redux/reducers/user/userAPI';
// import { useDispatch } from 'react-redux';
// function MemberGroup({route}) {
//    const navigation = useNavigation();
//    const [name,setName] = useState();
//    const [email,setEmail] = useState();
//    const [friends, setfriends] = useState([]);
//    const userState = useSelector(state => state.user)
//    const roomState = useSelector(state => state.room)
//    const token = userState.accessToken;
//    const dispatch = useDispatch();
//    const roomId = roomState._id;
//    const {owner} = route.params;
//     const myUserId = userState.user._id;
//    useEffect(() => {
//         axios
//             .get(`http://54.254.183.128/api/rooms/${roomId}`, {
//                 headers: { authorization: token},
//             })
//             .then((r) => {
                
//                 const users = r.data.users.map((e)=>{
//                     return { userId: e.user };
//                     console.log('====================================');
//                     console.log(e.user);
//                     console.log('====================================');
//                 })
//                 setfriends(users);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
        
//     }, [token]);
// const deleteUser = (userId) => {
//         Alert.alert("Thông báo","Bạn có chắc muốn xóa thành viên này ra khỏi nhóm",
//         [
//             {
//                 text: 'Thoát',
//                 onPress: () => console.log('Cancel Pressed'),
//                 style: 'cancel',
//               },
//               { text: 'Xóa', onPress: () => {
//                     axios
//                     .delete(
//                         `http://54.254.183.128/api/rooms/${roomId}/users/${userId}`,
//                         {
//                             headers: { authorization: token  },
//                         }
//                     )
//                     .then(({ data }) => {
//                         setfriends(
//                             friends.filter((e) => (e.userId._id) != userId)
//                         );
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     });
//               } },
//         ])
        
//     };
  
//     const renderItem = ({item}) =>{
//         var Name = (item.userId.name == undefined)? item.userId.email : item.userId.name;
//         var image = (item.userId.avatar == undefined)?  "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg": item.userId.avatar;
//         return(
//             (myUserId== owner)?
//             ((owner==item.userId._id)? 
//             <View  style={{height:60,display:'flex',flexDirection:'row',flex:1,marginBottom:20,}}>
//                 <View style={{flex:0.05,justifyContent:'center',alignItems:'center'}} >
//                 </View>
//                 <View style={{flex:0.15,}}>
//                     <Image source={{uri:image}} style={{borderRadius:100,height:50,width:50,}}/>
//                     {(owner == item.userId._id)? <View style={{height:20,alignItems:'flex-end'}}>
//                         <Entypo name="key" size={18} color="#CDAD00" />
//                     </View>: null
//                     }
//                 </View>
//                 <View style={{flex:0.8,marginLeft:10,justifyContent:"center"}}>
//                     <Text style={{fontSize:22,}}>{Name}</Text>
//                     <Text style={{fontSize:18,color:"grey"}}>2 giờ</Text>
//                 </View>
                 
//             </View> 
//             : 
//             <View  style={{height:60,display:'flex',flexDirection:'row',flex:1,marginBottom:20,}} >
//                 <View style={{flex:0.05,justifyContent:'center',alignItems:'center'}} >
//                 </View>
//                 <View style={{flex:0.15,}}>
//                     <Image source={{uri:image}} style={{borderRadius:100,height:50,width:50,}}/>
//                     {(owner == item.userId._id)? <View style={{height:20,alignItems:'flex-end'}}>
//                         <Entypo name="key" size={18} color="#CDAD00" />
//                     </View>: null
//                     }
//                 </View>
//                 <View style={{flex:0.65,marginLeft:10,justifyContent:"center"}}>
//                     <Text style={{fontSize:22,}}>{Name}</Text>
//                     <Text style={{fontSize:18,color:"grey"}}>2 giờ</Text>
//                 </View>
//                 <TouchableOpacity style={{flex:0.2,justifyContent:'center',alignItems:'center'}} onPress={()=> deleteUser(item.userId._id)}>
//                         <AntDesign name="deleteuser" size={24} color="black" />
//                 </TouchableOpacity>  
           
//             </View>
//             ):
//             (
//             <View  style={{height:60,display:'flex',flexDirection:'row',flex:1,marginBottom:20,}}>
//                 <View style={{flex:0.05,justifyContent:'center',alignItems:'center'}} >
//                 </View>
//                 <View style={{flex:0.15,}}>
//                     <Image source={{uri:image}} style={{borderRadius:100,height:50,width:50,}}/>
//                     {(owner == item.userId._id)? <View style={{height:20,alignItems:'flex-end'}}>
//                         <Entypo name="key" size={18} color="#CDAD00" />
//                     </View>: null
//                     }
//                 </View>
//                 <View style={{flex:0.8,marginLeft:10,justifyContent:"center"}}>
//                     <Text style={{fontSize:22,}}>{Name}</Text>
//                     <Text style={{fontSize:18,color:"grey"}}>2 giờ</Text>
//                 </View>
                 
//             </View> 
//             )
            
//         );
//     };
    
//   return (
//     <SafeAreaView style={styles.container}>
//         <View style={styles.containerHeader}>
//             <View  style={styles.containerIcon}>
//                     <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.button}>
//                     <AntDesign name="close" size={24} color="white" />
//                     </TouchableOpacity>
//             </View>
//             <View style={styles.containerText}>
//                 <Text style={styles.text}> Thành viên trong nhóm</Text>
//             </View>
//         </View>
//         <View style={styles.containerBody}>
//         <SwipeListView  nestedScrollEnabled={true} data ={friends} renderItem={renderItem}  keyExtractor={item => `${item.userId._id}`}/>
//         </View>
//     </SafeAreaView>
//   )
// }
// const styles = StyleSheet.create({
     
//     container:{
//         flex:1,
   
//     },
//     containerHeader :{
//         display:'flex',
//         width: '100%',
//         flex:0.08,
//         borderColor:'#ccc',
//         borderWidth:1,
//         flexDirection:'row',
//         backgroundColor:'#0091ff'
//     }, 
//     containerText:{
//         flex:0.8,
//         justifyContent:'center',
//     },  
//     text:{
//         width:'100%',
//         fontSize:24,
//         padding:10,
//         paddingLeft:10,
//         color:"white"
//     },
//     containerIcon:{
//         justifyContent:'flex-end',
//         justifyContent:'center',
//         alignItems:'center',
//         marginLeft:10,
//     },
//     containerBody:{
//         flex:0.92,
//         marginLeft:10,
//         marginTop:10,
//         marginRight:10,
//     },
//     containerBodyHeader:{
//         flex:0.1,
//         display:'flex',
//         flexDirection:'row',
//         marginLeft:10,
//         marginRight:10,
//     },
//     containerBodyHeader_Image:{
//         flex:0.2,
//         justifyContent:'center',
//         alignItems:"center",
//     },
//     buttonImage:{
//         paddingRight:15,
//         paddingLeft:15,
//         paddingTop:15,
//         paddingBottom:15,
//         backgroundColor:'#DDDDDD',
//         borderRadius:100,
//     },
//     containerBodyHeader_Input:{
//         flex:0.8,
//     },
//     containerBodySearch:{
//         flex:0.1,
//         justifyContent:'center'
//     },
//     containerBodySearchItem:{
//         flex:0.7,
//         backgroundColor:"#DDDDDD",
//         marginLeft:10,
//         marginRight:10,
//         display:'flex',
//         flexDirection:'row',
//         borderRadius:20,
//         alignItems:'center'
//     },
   
//     buttonCreate:{
//         flex:0.15,
//         marginRight:20,
//         marginLeft:20,
//         alignItems:'flex-end',
//         justifyContent:'center'
//     },
//     buttonCreateGroup:{
//         paddingTop:20,
//         paddingLeft:20,
//         paddingRight:20,
//         paddingBottom:20,
//         backgroundColor:"#1C86EE",
//         borderRadius:100,
//     }
// });
// export default MemberGroup;