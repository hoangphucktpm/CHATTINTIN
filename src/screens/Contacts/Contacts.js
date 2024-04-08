import React from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image, TouchableHighlight, Alert  } from 'react-native'
import styles from './StyleContacts'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../Footer/Footer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { EvilIcons } from '@expo/vector-icons'; 
import { useState } from 'react';
import { FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import socket from '../../services/socket';
import { useEffect } from 'react';
import { set } from 'date-fns';
import { useRoute } from '@react-navigation/native';


function Contacts() {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  const { phone } = useRoute().params || {};
  console.log('phone:', phone);




  // Thêm một state mới để lưu trữ danh sách lời mời kết bạn
const [friendRequests, setFriendRequests] = useState([]);


useEffect(() => {
  // Listen for a 'friend request received' event from the server
  socket.on('friend request received', (response) => {
    if (response.receiverId === receiverId) {
      Alert.alert("Thông báo", "Bạn đã nhận được lời mời kết bạn");

      // Cập nhật danh sách lời mời kết bạn
      setFriendRequests(prevRequests => [...prevRequests, response]);
    }
  });

  // Clean up the effect
  return () => socket.off('friend request received');
}, [receiverId]);

 


    const Data = [ 
        {id:"1",name:"Nguyễn Văn A",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
        ,lastMessage:"Chào bạn",time:"2022-01-01"},
        {id:"2",name:"Nguyễn Văn A",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
        ,lastMessage:"Chào bạn",time:"2022-01-01"}
    ];

    const Data1 = [
        {id:"1",name:"Nhóm 1",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
        lastMessage:"Chào bạn",time:"2022-01-01"},
        {id:"2",name:"Nhóm 2",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
        lastMessage:"Chào bạn",time:"2022-01-01"}
    ];

    // Lời mời kết bạn kèm theo chức năng chấp nhận hoặc từ chối
    const Data2 = [
        {id:"1",name:"Nguyễn Văn AAA",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
        lastMessage:"Chào bạn",time:"2022-01-01"},
        {id:"2",name:"Nguyễn Văn B",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
        lastMessage:"Chào bạn",time:"2022-01-01"},
        {id:"3",name:"Nguyễn Văn B",image:"https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg",
        lastMessage:"Chào bạn",time:"2022-01-01"}
    ];



  const hanldPress = ()=>{
    navigation.navigate("ScannerQR");
  }
    const hanldPressCreateGroup = ()=>{
        navigation.navigate("CreateGroup");
      }

    const sreach = ()=>{
        // mở thanh tìm kiếm
    }

    const handleAccept = (id) => {
      setReceiverId(id);
        Alert.alert("Đã chấp nhận lời mời kết bạn");

    }

    const handleReject = (id) => {
        // xóa cái item đó 
        // Hiện thông báo đã từ chối
        setReceiverId(id);
        Alert.alert("Đã từ chối lời mời kết bạn");
    }

    const AddFriend = ()=>{
        navigation.navigate("AddFriends", {phone: phone});
    }



    const renderList = ()=>{ 
        switch (selectedButton) {
            case 'friends':
                return <FlatList data={Data} renderItem={renderItem} keyExtractor={(item) => item.id} />
            case 'Group':
                return <FlatList data={Data1} renderItem={renderItem1} keyExtractor={(item) => item.id} />
            case 'loimoi':
                // Lời mời kết bạn kèm theo chức năng chấp nhận hoặc từ chối, hiện icon chấp nhận và từ chối ra trong mỗi item
                return <FlatList data={friendRequests} renderItem={renderItem2} keyExtractor={(item) => item.id} />
                default:
                return <FlatList data={Data} renderItem={renderItem} keyExtractor={(item) => item.id} />
        }
    }

    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
    }

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


    const renderItem2 = ({item}) => {
  var imageItem = (item.image == undefined)? "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg":item.image;

  return (
    <TouchableHighlight underlayColor={'#E6E6FA'} style={styles.touchHightLight} onPress={() => {
      const id = item.id;
      // dispatch(roomAPI.getListChat()({ accessToken, id }));
      // dispatch(roomAPI.saveRoomId()(id))
      navigation.navigate("Chat",{id:item.id,name:item.name,image:imageItem,lastMessage:item.lastMessage,time:item.time, isFriendRequest: true})

    }}>
      <View style={styles.containerItem}>
        <View style={styles.itemFriend_info}>
          <View style={styles.itemFriend_avatar}>
            <Image style={styles.itemFriend_avatar_avatar} source={{uri: `${imageItem}`}} />    
          </View>
        </View>
        <View style={styles.itemFriend_right}>
          <Text style={{fontSize:20,}}>{item.name}</Text>
        </View>
        <View style={styles.itemFriend_actions}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item.id)}>
            <FontAwesome name="check" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(item.id)}>
            <FontAwesome name="times" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
}

    const renderItem1 = ({item}) =>{
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

    
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerHeader}>
        <View style={styles.containerIcon}>
        <EvilIcons style={styles.iconSeach} onPress={(sreach)}  name="search" size={30} color="white" />
        
      </View>
      <View style={styles.containerInput}>
        <TextInput placeholderTextColor="#fff" style={styles.input} type="text" placeholder='Tìm kiếm'/>
      </View>
            <View style={styles.containerIconRight}>
                <TouchableOpacity onPress = {(AddFriend)} style={styles.containerIconAdd}>
                    <Ionicons name="person-add" size={26} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate("AddGroup")} } style={styles.containerIconAdd}>
                    <Ionicons name="md-people" size={28} color="white" />
                </TouchableOpacity>
            </View> 
        </View> 
        <View style={[styles.containerBody, {backgroundColor: 'white'}]}>
    <View style={{flex:0.3,marginLeft:5,marginRight:5,marginTop:10}}>
        <TouchableOpacity onPress={() => handleButtonPress('friends')} style={styles.containerBody_Row}>
            <Icon name="person-outline" size={35} color="blue" />
            <Text style={{fontSize:18,marginLeft:20,}}>Danh sách bạn bè</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('Group')} style={styles.containerBody_Row}>
            <Icon name="people-outline" size={35} color="blue" />
            <Text style={{fontSize:18,marginLeft:20,}}>Danh sách nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('loimoi')} style={styles.containerBody_Row}>
  <Icon name="mail-outline" size={35} color="blue" />
  <View style={{flexDirection: 'row'}}>
    <Text style={{fontSize:18, marginLeft:20}}>Lời mời kết bạn</Text>
    <Text style={{fontSize:18, marginLeft:5, color: 'red'}}>[{friendRequests.length}]</Text>
  </View>
</TouchableOpacity>
    </View>
    <View style={{flex:0.8, backgroundColor:"white"}}>
        {/* <SwipeListView  nestedScrollEnabled={true} data ={Data} renderItem={renderItem} /> */}
        {renderList()}
    </View>
</View>

        <Footer/>
    </SafeAreaView>
  )
}

export default Contacts;