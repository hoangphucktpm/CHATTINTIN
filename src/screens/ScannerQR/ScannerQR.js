import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { Camera } from 'expo-camera';
function ScannerQR() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const url = /(https||http)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const [isFlashLight,setFlashLight] = useState(Camera.Constants.FlashMode.off);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if(url.test(data)){
      Alert.alert("Thông báo",`${data}`,[
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Go to Website', onPress: () => WebBrowser.openBrowserAsync(data) },
      ]);
    }
    else{
      Alert.alert("Thông báo",`${data}`)
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const hanldPressClose= ()=>{
    navigation.navigate("Home");
  }
  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        flashMode = {isFlashLight}
      />
      <View style={{padding:40}}>
          <View style={{display:'flex',flexDirection:"row",justifyContent:'space-between'}}> 
            <TouchableOpacity onPress={hanldPressClose}>
                <AntDesign name="closecircle" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                  (isFlashLight === Camera.Constants.FlashMode.off)? setFlashLight(Camera.Constants.FlashMode.torch) : setFlashLight(Camera.Constants.FlashMode.off)
            }}>
                <Entypo name="flashlight" size={32} color="white" />
            </TouchableOpacity>
          </View>
      </View>
      {scanned && 
      <Button title={'Tap to Scan Again'}  onPress={() => setScanned(false)} />
      
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "#ccc",
      flex:1,
  },
});

export default ScannerQR;