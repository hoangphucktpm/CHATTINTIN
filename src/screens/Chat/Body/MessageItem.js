import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useState } from 'react'
import styles from './StyleMessageItem'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import tokenService from '../../../services/token.service';
import { useSelector } from 'react-redux';
import axios from 'axios';

function MessageItem ({avatar,name,time,message,type,owner,_id,emoji}) {
  const navigation = useNavigation();
  const accessToken = tokenService.getAccessToken();
  const [emojiIndex,setemojiIndex] = useState(emoji);
  const roomState = useSelector(state => state.room);
  const hanldPress =()=>{
    navigation.navigate("ImageChat",{
      avatar:avatar,
      name:name,
      image: message,
    })
  }
  const reactMessage = (e) => {
    
    axios({
        url: `http://54.254.183.128/api/rooms/${roomState._id}/messages/${_id}/react`,
        method: "POST",
        headers: {
            authorization: accessToken 
        },
        data: {
            react:e,
        }
    }).then((respone) => {
        console.log("OKE");
        setemojiIndex(e);

    }).catch((err) => {
        console.log(err);

    })
}
const hanldPressIcon = ()=>{
  Alert.alert("","",[
    { text: '😍', onPress: ()=> reactMessage("😍") },
    { text: '😑', onPress: ()=> reactMessage("😑") },
    { text: '😀', onPress: ()=> reactMessage("😀")},
    { text: '😭', onPress: ()=> reactMessage("😭")},
    {
      text: 'Thoát',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
   
  ]);
}
    return (
      <View style={styles.container}>
        <View style={{alignItems:'flex-end',justifyContent:'flex-end'}}>
            <Image style={styles.container_Left_Img} source={{uri:avatar}} />
            {(owner)? <Entypo name="key" size={18} color="#CDAD00" /> : <View></View>}
        </View>
        {/* <View style={styles.container_Right}>
            <Text style={{fontSize:17,color:'#CC9933'}}>{name}</Text>
            {(type=="image")? <TouchableOpacity onPress={hanldPress}>
                <Image style={{height:150,width:150,}} source={{uri:message}} />
                </TouchableOpacity> : (type=="unsend")?<Text style={{width:180,}}>Tin nhắn đã được thu hồi</Text>: <Text style={{width:180,}}>{message}</Text>}
            <Text style={styles.container_Right_Time}>9:30</Text>
        </View> */}
         {(type=="unsend")?  
         <View style={styles.container_Right}>
                <Text>Tin nhắn đã thu hồi</Text>
                <Text style={styles.container_Right_Time}>9:30</Text>
         </View>:
         <View>
            <TouchableOpacity onPress={hanldPressIcon} style={styles.container_Right}>
              <Text style={{fontSize:17,color:'#CC9933'}}>{name}</Text>
              {(type=="image")? <TouchableOpacity onPress={hanldPress}>
                  <Image style={{height:150,width:150,}} source={{uri:message}} />
                  </TouchableOpacity> :  <Text style={{width:180,}}>{message}</Text>}
              <Text style={styles.container_Right_Time}>9:30</Text>
          </TouchableOpacity>
          <View style={{height:20,marginLeft:20,alignItems:'flex-end'}}>
                    <Text style={{fontSize:20,}}>{emojiIndex}</Text>
          </View>
         </View>
     }
      </View>
    )
  }

export default MessageItem;