import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    Modal,
  } from "react-native";
  import React, { useState } from "react";
  import styles from "./StyleMyProfile";
  import { Ionicons } from "@expo/vector-icons";
  import { Feather } from "@expo/vector-icons";
  import { RadioButton } from "react-native-paper";
  import { Calendar } from 'react-native-calendars';
  import { format } from 'date-fns';
  
  const MyProfile =()=> {
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [avatarImage, setAvatarImage] = useState("https://i.pinimg.com/originals/1e/0b/9e/1e0b9e1e4b2b5a8f3a9f3e3b5e4b4f1b.jpg");
    
    const [birthday, setBirthday] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const handleCalendarSelect = (date) => {
      setBirthday(new Date(date.timestamp));
      setShowCalendar(false);
    };
  
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const hanldPressGoBack = () => {};
    
    const hanldPressSignOut = () => {};
    
    const hanldPressRegister = () => {};
  
    const handleAvatarPress = () => {
      pickImage();
    };
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
      });
  
      if (!result.cancelled) {
          setAvatarImage(result.uri);
      }
    };
  
    const handleUpdate = () => {
      // Code để xử lý việc cập nhật thông tin và password
      // Thí dụ:
      console.log("Thông tin đã được cập nhật!");
    };
    
      
    return (
      <View style={styles.container}>
        <View style={styles.containerTabBar}>
          <TouchableOpacity
            onPress={hanldPressGoBack}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <View
            style={{
              width: "73%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Text style={{ fontSize: 24, color: "white" }}>
              Cập nhật thông tin
            </Text>
          </View>
        </View>
        <ScrollView style={{ paddingBottom: 0 }}>
          <View style={styles.containerBody}>
          <ImageBackground 
          source={{
            uri: "https://i.pinimg.com/originals/1e/0b/9e/1e0b9e1e4b2b5a8f3a9f3e3b5e4b4f1b.jpg",
          }}
          style={styles.containerBody_Top}
          >
            <TouchableOpacity onPress={handleAvatarPress}>
              <Image style={styles.containerBody_Top_Avt} source={{ uri: avatarImage }} />
            </TouchableOpacity>
          </ImageBackground >
  
          <View style={styles.containerInput}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderWidth: 2,
                marginRight: 10,
                marginTop: 20,
                marginLeft: 10,
                borderRadius: 50,
                backgroundColor: "#fff",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 0.15, alignItems: "center"}}>
                <Feather name="user" size={32} color="black" />
              </View>
              <TextInput
                onChangeText={(x) => setPhone(x)}
                value={phone}
                placeholder="Tên mới"
                style={{
                  marginRight: 15,
                  height: 50,
                  fontSize: 22,
                  flex: 0.85,
                }}
              />
            </View>
          </View>
  
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 20, marginRight: 10 }}>Giới tính:</Text>
            <RadioButton.Group
              onValueChange={(value) => setGender(value)}
              value={gender}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton.Item label="Nam" value="Nam" />
                <RadioButton.Item label="Nữ" value="Nữ" />
              </View>
            </RadioButton.Group>
          </View>
  
          <View style={styles.containerInput}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderWidth: 2,
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 20,
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 0.15, alignItems: "center" }}>
              
            </View>
  
            <View style={styles.container}>
              { showCalendar && (
                <View style={styles.calendarContainer}>
                  <Calendar onDayPress={handleCalendarSelect} />
                </View>
              )}
            </View>
  
            <Text style={{ fontSize: 22, marginRight: 180 }}>{format(birthday, 'dd-MM-yyyy')}</Text>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Feather name="calendar" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <Modal
            visible={showCalendar}
            transparent={true}
            animationType='slide'
            onRequestClose={() => setShowCalendar(false)}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: '#fff', padding: 20 }}>
              <Calendar onDayPress={handleCalendarSelect} />
            </View>
            </View>
          </Modal>
  
        </View>
        {/* Hiển thị password và nút "Cập nhật" khi nhấn vào */}
        { showUpdateButton && (
          <View style={styles.containerInput}>
            <View style={{ display: "flex", flexDirection: "row", borderWidth: 2, marginHorizontal: 10, borderRadius: 20, backgroundColor: "#fff", alignItems: "center", marginTop: 10 }}>
              <View style={{ flex: 0.15, alignItems: "center" }}>
                <Feather name="lock" size={32} color="black" />
              </View>
              <TextInput
                onChangeText={(x) => setCurrentPassword(x)}
                value={currentPassword}
                placeholder="Password hiện tại"
                style={{ marginRight: 15, height: 50, fontSize: 22, flex: 0.85 }}
                secureTextEntry={true}
              />
            </View>
          </View>
        )}
        { showUpdateButton && (
          <View style={styles.containerInput}>
            <View style={{ display: "flex", flexDirection: "row", borderWidth: 2, marginHorizontal: 10, borderRadius: 20, backgroundColor: "#fff", alignItems: "center", marginTop: 10 }}>
              <View style={{ flex: 0.15, alignItems: "center" }}>
                <Feather name="lock" size={32} color="black" />
              </View>
              <TextInput
                onChangeText={(x) => setNewPassword(x)}
                value={newPassword}
                placeholder="Password mới"
                style={{ marginRight: 15, height: 50, fontSize: 22, flex: 0.85 }}
                secureTextEntry={true}
              />
            </View>
          </View>
        )}
            <View style={styles.containerBottom2}>
                <TouchableOpacity onPress={() => setShowUpdateButton(!showUpdateButton)} style={styles.bottom}>
                <Text style={{ fontSize:22, color:'#fff',fontWeight:'bold' }}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
    

      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={hanldPressRegister} style={styles.bottom} >
          <Text style={{fontSize:22, color:'#fff',fontWeight:'bold'}}> Hoàn tất </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
  }
  
  export default MyProfile;
  