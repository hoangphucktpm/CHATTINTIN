import React from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity  } from 'react-native'
import styles from './StyleSearch'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
function Search() {
  const navigation = useNavigation();
  const hanldPress = ()=>{
    navigation.navigate("ScannerQR");
  }
  const hanldPressCreateGroup = ()=>{
    navigation.navigate("CreateGroup");
  }
    const sreach = ()=>{
    // Mở thanh tìm kiếm
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerIcon}>
        <EvilIcons name="search" size={30} color="white" onPress={sreach}/>
      </View>
      <View style={styles.containerInput}>
        <TextInput placeholderTextColor="#fff" style={styles.input} type="text" placeholder='Tìm kiếm'/>
      </View>
      <View style={styles.containerIconRight}>
        <TouchableOpacity onPress={hanldPress} style={styles.containerIconQR}>
          <MaterialCommunityIcons name="qrcode-scan" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={hanldPressCreateGroup} style={styles.containerIconAdd}>
            <Ionicons name="md-add" size={30} color="white" />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Search;
