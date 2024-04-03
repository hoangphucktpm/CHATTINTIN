// import { Text, View, Image, FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from "react-native";
// import React, { Component } from "react";
// import styles from "./StyleItemFriend";
// import { AntDesign } from '@expo/vector-icons';
// import { SwipeListView } from "react-native-swipe-list-view";
// import { Feather } from '@expo/vector-icons';
// import { useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import roomAPI from "../../redux/reducers/Room/roomAPI";
// import axios from "axios";
// const ItemFriend = ({navigation}) => {
//     const roomState = useSelector(state => state.room);
//     const userState = useSelector(state => state.user);
//     const listRoom = userState.rooms;
//     const accessToken = userState.accessToken;
//     const dispatch = useDispatch();
    
//     const Data = listRoom.map((e)=>{
//         console.log();
//         return ({id:e._id,name:e.name,image:e.avatar,lastMessage:e.messages[0]?.content,time:(e.createdAt),type: e.messages[0]?.type,owner:e.owner});
//     });
//     const deleteGroupHandleClick = () => {
//         axios
//             .delete(`http://54.254.183.128/api/rooms/${roomState._id}`, {
//                 headers: { authorization: accessToken },
//             }
//           )
//           .then(() => {
//             const listRooms = listRoom.filter(
//               (e) => (e._id) != roomState._id
//             );
//             console.log(listRooms);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };
//     const renderItem = ({item}) =>{
//         var imageItem = (item.image == undefined)? "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg":item.image;
//         var isImage = (item.type);
        
//         return  <TouchableHighlight underlayColor={'#E6E6FA'} style={styles.touchHightLight} onPress={()=>{
//             const id = item.id;
//             const onwer = item.owner;
//             dispatch(roomAPI.getListChat()({ accessToken, id }));
//             dispatch(roomAPI.saveRoomId()(id))
//             navigation.navigate("ChatWindow",{id:item.id,name:item.name,image:imageItem,lastMessage:item.lastMessage,time:item.time,owner:item.owner})
//         }}>
//                 <View style={styles.container} >
//                     <View style={styles.itemFriend_info}>
//                         <View style={styles.itemFriend_avatar}>
//                             <Image
//                                 style={styles.itemFriend_avatar_avatar}
//                                 source={{
//                                     uri: `${imageItem}`,
//                                 }}
//                             />
//                         </View>
//                     </View>
//                     <View style={styles.itemFriend_right}>
//                         <View style={styles.itemFriend_message}>
//                             <Text style={styles.itemFriend_name}>{item.name}</Text>
//                             <Text style={styles.itemFriend_content}>{(isImage == 'image')? '[Hình ảnh]' : (isImage=='unsend')? "Tin nhắn đã được gỡ": item.lastMessage}</Text>
//                         </View>
//                         <View style={styles.itemFriend_timeBlock}>
//                             <Text style={styles.itemFriend_time}>1 phút trước</Text>
//                         </View>
//                     </View>
//                 </View>
//         </TouchableHighlight>
//     //    <TouchableOpacity  onPress={hanldPress}>
//     //   </TouchableOpacity >
//     };
//     const HiddenItemWithActions = props =>{
//         const {onClose,onDelete} = props;
//         return   <View style={styles.rowBack}>
//                     <View style={styles.rowBackLeft}>
//                     </View>
//                     <View style={styles.rowBackRight}>
//                         <View style={styles.rowBackRight_Left}>
//                         <Feather name="more-horizontal" size={24} color="white" />
//                         <Text style={styles.txtItemRowBack}>Thêm</Text>
//                         </View>
//                         <View style={styles.rowBackRight_Mid}>
//                             <AntDesign name="pushpino" size={24} color="white" />
//                             <Text style={styles.txtItemRowBack}>Ghim</Text>
//                         </View>
//                         <TouchableOpacity onPress={deleteGroupHandleClick} style={styles.rowBackRight_Right}>
//                             <AntDesign name="delete" size={24} color="white" />
//                             <Text style={styles.txtItemRowBack}>Xóa</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//     }
//     const renderHideItem=({data,rowMap})=>{
//         return <HiddenItemWithActions
//         data = {data}
//         rowMap = {rowMap}
//         onClose={()=>closeRow(rowMap,data.item.id)}
//         onDelete={()=>deleteRow(rowMap,data.item.id)}
//         />
       
//     };
//     return (
//         <SwipeListView nestedScrollEnabled={true} data ={Data} renderItem={renderItem} renderHiddenItem={renderHideItem}  rightOpenValue={-230} />
//         );
// };

// export default ItemFriend;


import { Text, View, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./StyleItemFriend";
import { AntDesign, Feather } from '@expo/vector-icons';
import { SwipeListView } from "react-native-swipe-list-view";

const ItemFriend = ({navigation}) => {
    const renderItem = ({item}) => {
        var imageItem = "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg";

        return  <TouchableHighlight underlayColor={'#E6E6FA'} style={styles.touchHightLight}>
                    <View style={styles.container} >
                        <View style={styles.itemFriend_info}>
                            <View style={styles.itemFriend_avatar}>
                                <Image
                                    style={styles.itemFriend_avatar_avatar}
                                    source={{
                                        uri: `${imageItem}`,
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.itemFriend_right}>
                            <View style={styles.itemFriend_message}>
                                <Text style={styles.itemFriend_name}>Name</Text>
                                <Text style={styles.itemFriend_content}>Last Message</Text>
                            </View>
                            <View style={styles.itemFriend_timeBlock}>
                                <Text style={styles.itemFriend_time}>1 phút trước</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
    };

    const HiddenItemWithActions = props => {
        return   <View style={styles.rowBack}>
                    <View style={styles.rowBackLeft}>
                    </View>
                    <View style={styles.rowBackRight}>
                        <View style={styles.rowBackRight_Left}>
                        <Feather name="more-horizontal" size={24} color="white" />
                        <Text style={styles.txtItemRowBack}>Thêm</Text>
                        </View>
                        <View style={styles.rowBackRight_Mid}>
                            <AntDesign name="pushpino" size={24} color="white" />
                            <Text style={styles.txtItemRowBack}>Ghim</Text>
                        </View>
                        <TouchableOpacity style={styles.rowBackRight_Right}>
                            <AntDesign name="delete" size={24} color="white" />
                            <Text style={styles.txtItemRowBack}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    }

    const renderHideItem=({data,rowMap})=>{
        return <HiddenItemWithActions/>
    };

    return (
        <SwipeListView nestedScrollEnabled={true} data ={[]} renderItem={renderItem} renderHiddenItem={renderHideItem}  rightOpenValue={-230} />
        );
};

export default ItemFriend;