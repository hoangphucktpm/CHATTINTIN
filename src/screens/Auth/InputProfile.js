import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
  } from "react-native";
  import React, { useState } from "react";
  import styles from "./StyleProfile";
  import { Ionicons } from "@expo/vector-icons";


  import { Feather } from "@expo/vector-icons";
  import { RadioButton } from "react-native-paper";
  
  const InputProfile =()=> {
  
//    const userState = useSelector((state) => state.user);
    const [phone, setPhone] = useState("");
    
    // const avt =
    //   userState.user.avatar == undefined
    //     ? "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
    //     : userState.user.avatar;
    // var nameUser =
    //   userState.user.name == undefined
    //     ? userState.user.email
    //     : userState.user.name;
    // const dispatch = useDispatch();
    // const [gender, setGender] = useState("");
    // const token = tokenService.getAccessToken();
  
    const hanldPressGoBack = () => {
    //   navigation.navigate("InputPass");
    //   var user = userAPI.getUserInfo()(token);
    //   dispatch(user);
    };
  
    const hanldPressSignOut = () => {

    };

    const hanldPressRegister = ()=>{
    
    }
  
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
              <Image style={styles.containerBody_Top_Avt} source={{ uri: "https://i.pinimg.com/originals/1e/0b/9e/1e0b9e1e4b2b5a8f3a9f3e3b5e4b4f1b.jpg" }} />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "black",
                  marginTop: 10,
                }}
              >
                {"huy"}
              </Text>
            </ImageBackground>
  
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
                  placeholder="Tên của bạn"
                  style={{
                    marginRight: 15,
                    height: 50,
                    fontSize: 22,
                    flex: 0.85,
                  }}
                />
              </View>
            </View>
  
            {/* RadioButton cho giới tính */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 20, marginRight: 10 }}>Giới tính:</Text>
              <RadioButton.Group
                onValueChange={(value) => setGender(value)}
                value={"name"}
              >
                <RadioButton.Item label="Nam" value="Nam"  />
                <RadioButton.Item label="Nữ" value="Nữ" />
              </RadioButton.Group>
            </View>

            {/* // Sinh nhật */}
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
                  <Feather name="calendar" size={32} color="black" />
                </View>
                <TextInput
                  onChangeText={(x) => setPhone(x)}
                  value={phone}
                  placeholder="Ngày sinh của bạn"
                  style={{
                    marginRight: 15,
                    height: 50,
                    fontSize: 22,
                    flex: 0.85,
                  }}
                />
              </View>
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
  
  export default InputProfile;
  