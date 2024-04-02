import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { Camera } from 'expo-camera';
function ImageChat({route}) {
  const {avatar,name,image} = route.params;
  const navigation = useNavigation();
  const hanldPressClose= ()=>{
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={{flex:0.1,backgroundColor:"#1C1C1C",justifyContent:"flex-end",}}>
          <View style={{display:'flex',flexDirection:"row",}}> 
                <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={hanldPressClose}>
                        <AntDesign name="closecircle" size={32} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.15,marginBottom:10,}}>
                        <Image source={{uri:avatar}} style={{height:40,width:40,borderRadius:100,}}/>
                </View>
                <View style={{flex:0.65,marginBottom:10,justifyContent:'center'}}>
                        <Text style={{fontSize:22,color:'white'}}>{name}</Text>
                </View>
          </View>
      </View>
      <View style={{flex:0.9,justifyContent:'center',alignItems:'center'}}>
        <Image source={{uri:image}} style={{height:"60%",width:'100%'}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "#000",
      flex:1,
  },
});

export default ImageChat;