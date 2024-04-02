import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useState } from 'react'
import styles from './StyleFooter'
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
// import io, { Socket } from "socket.io-client";
// import { useDispatch } from 'react-redux';
// import roomAPI from "../../../redux/reducers/Room/roomAPI";
// import { useSelector } from 'react-redux';
// import * as ImagePicker  from 'expo-image-picker';
// import tokenService from '../../../services/token.service';
// import axios from 'axios';

function FooterChat (){
//   const dispatch = useDispatch();
//   const [text,setText] = useState("");
//   const roomState = useSelector(state => state.room);
//   const userState = useSelector(state => state.user);
//   const token = tokenService.getAccessToken();
//   const urlUploadFile = "http://54.254.183.128/api/storages/upload";
  
//   const newSocket = io("http://54.254.183.128", {
//         query: {
//             // token: useState.accessToken,
//         },
//     });
//   const sendMessageSocket = () => {
//       console.log("sendMessage");

//       newSocket.emit("client-send-message", {
//           token: userState.accessToken,
//           roomId: roomState._id,
//           content: text,
//           type: "text",
//       });
//   };
//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       quality: 1,
//     });
//     if (!result.cancelled) {
//       let localUri = result.uri;
//       let formData = new FormData();
//       let uriParts = localUri.split(".");
//       const path = localUri.split("/");
//       let fileType = uriParts[uriParts.length - 1];
//       let nameFile = path[path.length - 1];
//       const _image = {
//         uri: Platform.OS === "android" ? localUri : localUri.replace("file://", ""),
//         type: `image/${fileType}`,
//         name: nameFile,
//       };
//       formData.append("file", _image);
//       axios.post(urlUploadFile, formData, {
//                     headers: {
//                         authorization: token,
//                         "Content-type": "multipart/form-data",
//                     },
//                 })
//                 .then((res) => {
//                     newSocket.emit("client-send-message", {
//                         token: userState.accessToken,
//                         roomId: roomState._id,
//                         content: res.data.url,
//                         type: res.data.type,
//                     });
                   
//                 })
//                 .catch((err) => {
//                     alert("Error Upload file");
//                 });

//     }
//     else if(result.cancelled){
//       console.log(result);
//     }

//   };
    return (
      <KeyboardAvoidingView style={[styles.container,]}>
        <View style={styles.foorter_left}>
          <MaterialIcons name="insert-emoticon" size={24} color="#0091ff" />
          <TextInput  value={text} onChangeText={x=>setText(x)} style={styles.input_Message} placeholder='Nhập tin nhắn...' ></TextInput>
        </View>
        <View style={styles.footer_Right}>
          <View>
            <MaterialIcons name="keyboard-voice" size={24} color="#0091ff" />
          </View>
          <TouchableOpacity onPress={pickImage}>
            <SimpleLineIcons name="picture" size={24} color="#0091ff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            console.log(text)
            sendMessageSocket();
            dispatch(roomAPI.updateSentMessage()(text));
            console.log("nhan enter");
            setText("");
          }}>
            <FontAwesome name="send" size={24} color="#0091ff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
export default FooterChat