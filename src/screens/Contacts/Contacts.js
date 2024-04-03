// import React from 'react'
// import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image, TouchableHighlight  } from 'react-native'
// import styles from './StyleContacts'
// import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { EvilIcons } from '@expo/vector-icons'; 
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Footer from '../Footer/Footer';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import roomAPI from '../../redux/reducers/Room/roomAPI';

import React from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image, TouchableHighlight  } from 'react-native'
import styles from './StyleContacts'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../Footer/Footer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from '../Search/Search';


function Contacts() {
  const navigation = useNavigation();
  const hanldPress = ()=>{
    navigation.navigate("ScannerQR");
  }
// const roomState = useSelector(state => state.room);
//     const userState = useSelector(state => state.user)
//     const listRoom = userState.rooms;
//     const accessToken = userState.accessToken;
//     const dispatch = useDispatch();
//     const Data = listRoom.map((e)=>{
//         return ({id:e._id,name:e.name,image:e.avatar,lastMessage:e.messages[0]?.content,time:(e.createdAt)});
//     });

    const hanldPressCreateGroup = ()=>{
        navigation.navigate("CreateGroup");
      }

      
    const renderItem = ({item}) =>{
        var imageItem = (item.image == undefined)? "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg":item.image;
        return  <TouchableHighlight underlayColor={'#E6E6FA'} style={styles.touchHightLight} onPress={()=>{
            const id = item.id;
            dispatch(roomAPI.getListChat()({ accessToken, id }));
            dispatch(roomAPI.saveRoomId()(id))
            navigation.navigate("Chat",{id:item.id,name:item.name,image:imageItem,lastMessage:item.lastMessage,time:item.time})
        }}>
                <View style={styles.containerItem} >
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
                       <Text style={{fontSize:20,}}>{item.name}</Text>
                    </View>
                </View>
        </TouchableHighlight>
    };
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerHeader}>
            <View style={styles.containerText}>
                <Text style={styles.text}> Danh sách bạn bè </Text>
            </View>
            <View style={styles.containerIconRight}>
                <TouchableOpacity onPress={()=>{ navigation.navigate("AddFriends")}} style={styles.containerIconAdd}>
                    <Ionicons name="md-add" size={30} color="white" />
                </TouchableOpacity>
            </View> 
        </View> 
        <View style={[styles.containerBody, {backgroundColor: 'white'}]}>
    <View style={{flex:0.2,marginLeft:20,marginRight:20,marginTop:10,}}>
        <TouchableOpacity onPress={()=>{ navigation.navigate("AddFriends")}} style={styles.containerBody_Row}>
            <Icon name="person-add-outline" size={35} color="blue" />
            <Text style={{fontSize:18,marginLeft:20,}}>Thêm bạn bè mới</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={hanldPressCreateGroup} style={styles.containerBody_Row}>
            <Icon name="people-outline" size={35} color="blue" />
            <Text style={{fontSize:18,marginLeft:20,}}>Tạo nhóm</Text>
        </TouchableOpacity>
    </View>
    <View style={{flex:0.8, backgroundColor:"white"}}>
        {/* <SwipeListView  nestedScrollEnabled={true} data ={Data} renderItem={renderItem} /> */}
    </View>
</View>
        <Footer/>
    </SafeAreaView>
  )
}

export default Contacts;