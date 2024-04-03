import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useState } from 'react'
import styles from './StyleMyMessagaItem'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import tokenService from '../../../services/token.service';
function MyMessagaItem ({avatar,name,time,message,type,owner,_id,emoji}) {
  const navigation = useNavigation();
  const accessToken = tokenService.getAccessToken();
  const hanldPress =()=>{
    navigation.navigate("ImageChat",{
      avatar:avatar,
      name:name,
      image: message,
    })
  }
  const [messIndex,setMessIndex] = useState(message);
  const [typeIndex,setTypeIndex] = useState(type);
  const [emojiIndex,setemojiIndex] = useState(emoji);
  const roomState = useSelector(state => state.room);
 
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
  const hadelUnMessage = async  ()=> {
    var user = await axios
        .delete(
            `http://54.254.183.128/api/rooms/${roomState._id}/messages/${_id}`,
            {
                headers: { authorization: accessToken },
            }
        )
        .then(() => {
            console.log("sucess");
            setMessIndex("Tin nhắn đã được gỡ");
            setTypeIndex("unsend");
        })
        .catch((err) => {
            console.log(err);
        });
  } 
    const hanldLongPress = ()=>{
      Alert.alert("Thông báo","Bạn muốn xóa tin nhắn",[
        {
          text: 'Thoát',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xóa', onPress: hadelUnMessage },
      ]);
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
        <View style={styles.containerC}>
            <View style={styles.container}>
              {(typeIndex=="unsend")?  
              <View style={styles.container_Right}>
                 <Text>Tin nhắn đã được gỡ</Text>
                  <Text style={styles.container_Right_Time}>9:31</Text>
              </View>
              :
              <View>
                  <TouchableOpacity onLongPress={hanldLongPress} onPress={hanldPressIcon} style={styles.container_Right}>
                    {(typeIndex=="image")? 
                    <TouchableOpacity onPress={hanldPress}>
                      <Image style={{height:150,width:150,}} source={{uri:message}} />
                    </TouchableOpacity> : <Text style={{width:180,}}>{messIndex}</Text>}
                    <Text style={styles.container_Right_Time}>9:31</Text>
                  </TouchableOpacity>
                  <View style={{height:20,width:20,marginLeft:20,}}>
                    <Text style={{fontSize:20,}}>{emojiIndex}</Text>
                  </View>
              </View>
              }

              <View style={styles.container_Left}>
              <Image style={styles.container_Left_Img} source={{uri:avatar}} />
              {(owner)? <Entypo name="key" size={18} color="#CDAD00" /> : <View></View>}
            </View>
          </View>
        </View>
    )
  }
export default MyMessagaItem;