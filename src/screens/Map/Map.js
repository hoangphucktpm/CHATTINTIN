import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { api } from "../../apis/api";
import { useSelector } from "react-redux";
import styles from "./StyleMap";
import Footer from "../Footer/Footer";
import { Avatar, Button, Card, Modal } from "@ui-kitten/components";
import socket from "../../services/socket";
import { useNavigation } from "@react-navigation/native";
import Mapbox, { MarkerView } from "@rnmapbox/maps";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidHJhbmxvYzJrMyIsImEiOiJjbHZxYnR2bDYwYmppMmpwNnRnemlhaHA5In0.Fn9lSoYFUZ96simIJs9s4g"
);

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

const Map = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [pointSelected, setPointSelected] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const phone = user?.phone;
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
  const [originalLocations, setOriginalLocations] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [friendPhoneNumber, setFriendPhoneNumber] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 14.0583,
    longitude: 108.2772,
    latitudeDelta: 20,
    longitudeDelta: 10,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log("location status", status);
        if (status !== "granted") {
          setErrorMsg("Quyền truy cập vị trí đã bị từ chối");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("current location", location);
        setLocation(location);
        updateCurrentLocation(location);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.log(error);
        setErrorMsg("Không thể lấy vị trí hiện tại");
      }
    };

    fetchLocation();
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const res = await api.getAllLocation();
      if (res.status === 200) {
        setLocations(res.data);
        setOriginalLocations(res.data);
      } else {
        console.error("Failed to fetch locations", res);
      }
    } catch (error) {
      console.error("Failed to fetch locations", error);
    }
  };

  const updateCurrentLocation = async (location) => {
    try {
      const data = {
        IDUser: user.ID,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };
      const res = await api.updateLocation(data);
      if (res.status === 200) {
        // Alert.alert("Cập nhật vị trí thành công");
      } else {
        console.error("Failed to update location", res);
        Alert.alert("Cập nhật vị trí thất bại");
      }
    } catch (error) {
      console.error("Failed to update location", error);
      Alert.alert("Cập nhật vị trí thất bại");
    }
  };

  const getUserByPhone = async (phone) => {
    if (!phone) return null;
    if (!phone.toString().includes("84")) return phone;
    const user = await api.getUserByPhone(phone);
    return user.data;
  };

  const hanldPressAdd = async (friendPhoneNumber) => {
    if (friendPhoneNumber === phone) {
      Alert.alert("Thông báo", "Bạn không thể tự kết bạn với chính mình");
      return;
    }

    console.log(1);

    // try {
    //   const res = await api.checkRequestExists(user?.ID, friendPhoneNumber);
    //   if (res.data.code === 0 || res.data.code === 2) {
    //     Alert.alert("Thông báo", "Đã là bạn bè không thể gữi lời mời kết bạn");
    //     return;
    //   }
    // } catch (error) {
    //   console.log("API error:", error);
    //   Alert.alert("Thông báo", "Có lỗi xảy ra khi kiểm tra tình trạng bạn bè");
    //   return;
    // } finally {
    //   setPointSelected(null);
    // }

    socket.emit("new friend request client", {
      senderId: phone,
      receiverId: friendPhoneNumber,
    });

    setIsFriendRequestSent(true);
  };

  const handleCancel = () => {
    socket.emit("cancel friend request client", {
      senderId: phone,
      receiverId: friendPhoneNumber,
    });

    setIsFriendRequestSent(true);
  };

  const handleSearch = async (term) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${term}.json?country=VN&access_token=pk.eyJ1IjoidHJhbmxvYzJrMyIsImEiOiJjbHZxYnR2bDYwYmppMmpwNnRnemlhaHA5In0.Fn9lSoYFUZ96simIJs9s4g`
      );
      const data = await response.json();
      console.log("search result", data);
      setSearchResult(data.features);
      setShowMap(false);
    } catch (error) {
      console.error("Lỗi tìm kiếm địa điểm:", error);
    }
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setShowMap(true);
    setSearchTerm(place.place_name);
    setMapRegion({
      latitude: place.center[1],
      longitude: place.center[0],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleChangeText = (text) => {
    setSearchTerm(text);
    if (text === "") {
      setSearchResult(null);
      setShowMap(true);
    } else {
      handleSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <View style={styles.containerTabBar}>
          <View style={styles.containerIcon}>
            <EvilIcons
              name="search"
              size={30}
              color="white"
              onPress={() => handleSearch(searchTerm)}
            />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              placeholderTextColor="#fff"
              style={styles.input}
              type="text"
              placeholder="Tìm kiếm"
              onChangeText={handleChangeText}
              value={searchTerm}
            />
          </View>
        </View>
        <View style={styles.container}>
          {location ? (
            <Mapbox.MapView
              style={{
                flex: 1,
                width: ScreenWidth,
                height: ScreenHeight,
              }}
              onPress={() => setPointSelected(null)}
            >
              <Mapbox.Camera
                zoomLevel={15}
                centerCoordinate={[
                  location.coords.longitude,
                  location.coords.latitude,
                ]}
              />
              {locations.map((userLocation, index) => {
                const getUser = async () => {
                  let userdata = await getUserByPhone(
                    userLocation.properties.IDUser
                  );
                  if (
                    userLocation.geometry.coordinates[1] ===
                    location.coords.latitude
                  )
                    return (
                      <Mapbox.MarkerView
                        key={index}
                        coordinate={[
                          userLocation.geometry.coordinates[0],
                          userLocation.geometry.coordinates[1],
                        ]}
                        title={userdata ? userdata.fullname : "123"}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            setPointSelected(userdata?.ID ? userdata : null)
                          }
                        >
                          <Image
                            source={{
                              uri: user?.urlavatar,
                            }}
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                          />
                        </TouchableOpacity>
                      </Mapbox.MarkerView>
                    );
                  return (
                    <Mapbox.MarkerView
                      key={index}
                      coordinate={[
                        userLocation.geometry.coordinates[0],
                        userLocation.geometry.coordinates[1],
                      ]}
                      title={userdata ? userdata.fullname : "123"}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          setPointSelected(userdata?.ID ? userdata : null)
                        }
                      >
                        <Image
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/9204/9204285.png",
                          }}
                          style={{ width: 40, height: 40 }}
                        />
                      </TouchableOpacity>
                    </Mapbox.MarkerView>
                  );
                };
                if (userLocation?.ID?.length < 12) return getUser();
              })}
              {selectedPlace && (
                <Mapbox.MarkerView
                  coordinate={[
                    selectedPlace.center[0],
                    selectedPlace.center[1],
                  ]}
                  title={selectedPlace.place_name}
                />
              )}
            </Mapbox.MapView>
          ) : (
            <ActivityIndicator />
          )}
        </View>
        {!showMap && (
          <View style={styles.resultsContainer}>
            <FlatList
              data={searchResult}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectPlace(item)}>
                  <Text style={styles.placeItem}>{item.place_name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        <Footer />
      </View>
      {pointSelected && (
        <TouchableWithoutFeedback onPress={() => setPointSelected(null)}>
          <View
            style={{
              ...styles.overlay,
              width: ScreenWidth,
              height: ScreenHeight,
            }}
          />
        </TouchableWithoutFeedback>
      )}
      {pointSelected && (
        <Modal
          visible={pointSelected !== null}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setPointSelected(null)}
        >
          <Card disabled={true}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Avatar
                source={{ uri: pointSelected.urlavatar }}
                width={30}
                height={30}
                resizeMode="cover"
              />
              <Text>{pointSelected.fullname}</Text>
            </View>
            {pointSelected?.ID === user?.ID ? (
              <Text>Đây là tôi</Text>
            ) : pointSelected?.friendList.includes(user?.ID) ? (
              <Button
                onPress={() =>
                  navigation.navigate(
                    pointSelected.ID === user.ID
                      ? "MyProfile"
                      : "FriendProfile",
                    pointSelected
                  )
                }
              >
                Xem trang
              </Button>
            ) : isFriendRequestSent ? (
              <Button onPress={handleCancel}>Hủy</Button>
            ) : (
              <Button onPress={() => hanldPressAdd(pointSelected?.phone)}>
                Thêm bạn
              </Button>
            )}
          </Card>
        </Modal>
      )}
    </View>
  );
};

export default Map;
