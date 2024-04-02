import React from 'react'
import styles from './StyleFooter'
import { StyleSheet, Text, View,TextInput, TouchableOpacity  } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import userAPI from '../../redux/reducers/user/userAPI';
// import { useDispatch } from 'react-redux';
// import tokenService from '../../services/token.service';


function Footer() {
    const navigation  = useNavigation();
    // const dispatch = useDispatch();
    // const token = tokenService.getAccessToken();
    // const hanldPress = () =>{
    //     navigation.navigate("Home");
    //     var user = userAPI.getUserInfo()(token);
    //     dispatch(user);
    // }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={hanldPress} style={styles.containerIcon}>
            <AntDesign name="message1" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate("Contracts")} style={styles.containerIcon}>
            <FontAwesome5 name="user-friends" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerIcon}>
            <AntDesign name="clockcircleo" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate("MyProfile")} style={styles.containerIcon}>
            <FontAwesome name="user" size={20} color="grey" />
        </TouchableOpacity>
    </View>
  )
}

export default Footer