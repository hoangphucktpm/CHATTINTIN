import { ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import styles from "./StyleProfile";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "react-native-image-picker";
import { Feather } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { Modal } from "react-native";
import { format } from "date-fns";
import { api } from "../../apis/api";

const InputProfile = (props) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [avatarImage, setAvatarImage] = useState(
        "https://i.pinimg.com/originals/1e/0b/9e/1e0b9e1e4b2b5a8f3a9f3e3b5e4b4f1b.jpg"
    );

    const [birthday, setBirthday] = useState(new Date()); // Khởi tạo birthday với giá trị mặc định là ngày hiện tại
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const { idNewUser } = props?.route?.params;
    const handleCalendarSelect = (date) => {
        setBirthday(new Date(date.timestamp)); // Cập nhật ngày sinh với ngày được chọn từ lịch
        setShowCalendar(false); // Ẩn lịch sau khi chọn ngày
    };
    console.log("idnew", idNewUser);

    const hanldPressGoBack = () => {};

    const hanldPressSignOut = () => {};

    const hanldPressRegister = async () => {
        if (!name) {
            Alert.alert("Vui lòng nhập tên!");
            return;
        }
        if (!gender) {
            Alert.alert("Vui lòng chọn giới tính!");
            return;
        }

        try {
            const res = await api.updateInfo(idNewUser, {
                fullname: name,
                sex: gender,
                birthday: birthday,
                // file: avatarImage,
            });
            console.log(res?.data);
        } catch (error) {
            Alert.alert(error.message);
        }
    };

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
            setImage(result.uri);
        }
    };

    console.log(name);

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
                    <Text style={{ fontSize: 24, color: "white" }}>Cập nhật thông tin</Text>
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
                            <View style={{ flex: 0.15, alignItems: "center" }}>
                                <Feather name="user" size={32} color="black" />
                            </View>
                            <TextInput
                                onChangeText={(x) => setName(x)}
                                value={name}
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

                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 20, marginRight: 10 }}>Giới tính:</Text>
                        <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton.Item label="Nam" value="male" />
                                <RadioButton.Item label="Nữ" value="female" />
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
                            <View style={{ flex: 0.15, alignItems: "center" }}></View>

                            <View style={styles.container}>
                                {showCalendar && (
                                    <View style={styles.calendarContainer}>
                                        <Calendar onDayPress={handleCalendarSelect} />
                                    </View>
                                )}
                            </View>

                            {/* Sửa thành Text */}
                            <Text style={{ fontSize: 22, marginRight: 180 }}>{format(birthday, "dd-MM-yyyy")}</Text>
                            <TouchableOpacity onPress={() => setShowCalendar(true)}>
                                <Feather name="calendar" size={32} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Modal
                            visible={showCalendar}
                            transparent={true}
                            animationType="slide"
                            onRequestClose={() => setShowCalendar(false)}
                        >
                            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                <View style={{ backgroundColor: "#fff", padding: 20 }}>
                                    <Calendar onDayPress={handleCalendarSelect} />
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.containerBottom}>
                <TouchableOpacity onPress={hanldPressRegister} style={styles.bottom}>
                    <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}> Hoàn tất </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InputProfile;
