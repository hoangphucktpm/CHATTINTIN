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
import { map } from "eva";
import { set } from "date-fns";

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

  const [fakeLocations, setFakeLocations] = useState([
    {
      id: 1,
      longitude: 105.85293806048128,
      latitude: 21.021486442448733,
      label: "Hải Nam",
    },
    {
      id: 2,
      longitude: 105.86293806048128,
      latitude: 21.031486442448733,
      label: "Thu Trang",
    },
    {
      id: 3,
      longitude: 105.86308522378465,
      latitude: 21.00723018751215,
      label: "Hoang Anh",
    },
    {
      id: 4,
      longitude: 105.81281929267271,
      latitude: 20.99477155850326,
      label: "Kiến Anh",
    },
    {
      id: 5,
      longitude: 105.77233869926602,
      latitude: 21.052073983323623,
      label: "Minh Thuận ",
    },
    {
      id: 6,
      longitude: 105.89467506276839,
      latitude: 21.050830039005902,
      label: "Hoàng Tân",
    },
    {
      id: 7,
      longitude: 105.85018544256542,
      latitude: 21.024255368448323,
      label: "Đăng Khôi",
    },
    {
      id: 8,
      longitude: 105.82749794723486,
      latitude: 21.0225940379213,
      label: "Đại Phát",
    },
    {
      id: 9,
      longitude: 105.80525652114363,
      latitude: 21.025085338941764,
      label: "Kiến Thức",
    },
    // Thêm các tài khoản giả mạo khác vào đây ở Thành phố Hồ Chí Minh
    {
      id: 10,
      longitude: 106.6885099841316,
      latitude: 10.825116770849391,
      label: "Hải Nam",
    },
    {
      id: 11,
      longitude: 106.68971161376982,
      latitude: 10.824410729607493,
      label: "Thu Trang",
    },
    {
      id: 12,
      longitude: 106.69022659790136,
      latitude: 10.82249281813506,
      label: "Hoang Anh",
    },
    {
      id: 13,
      longitude: 106.68911079895133,
      latitude: 10.823241015829112,
      label: "Kiến Anh",
    },
    {
      id: 14,
      longitude: 106.69050554763828,
      latitude: 10.822292595899839,
      label: "Minh Thuận ",
    },
    {
      id: 15,
      longitude: 106.68912152778688,
      latitude: 10.82342016147875,
      label: "Hoàng Tân",
    },
  ]);

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
        // setOriginalLocations(res.data);
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
                zoomLevel={10}
                centerCoordinate={[
                  mapRegion.longitude,
                  mapRegion.latitude,
                ]}
              />
              {locations.map((userLocation, index) => (
                <Mapbox.MarkerView
                  key={index}
                  coordinate={[
                    userLocation.geometry.coordinates[0],
                    userLocation.geometry.coordinates[1],
                  ]}
                  title={userLocation.properties.label}
                >
                  <TouchableOpacity
                    onPress={() => setPointSelected(userLocation)}
                  >
                    <Image
                      source={{
                        uri: userLocation.properties.avatarUrl,
                      }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  </TouchableOpacity>
                </Mapbox.MarkerView>
              ))}
              {/* Display fake locations */}
              {fakeLocations.map((fakeLocation, index) => (
                <Mapbox.MarkerView
                  key={`fake-${index}`}
                  coordinate={[fakeLocation.longitude, fakeLocation.latitude]}
                  title={fakeLocation.label}
                >
                  <TouchableOpacity
                    onPress={() =>
                      setPointSelected({
                        fullname: fakeLocation.label,
                        urlavatar:
                          "https://cdn-icons-png.flaticon.com/512/9204/9204285.png",
                        phone: `fake-${fakeLocation.id}`,
                        ID: `fake-${fakeLocation.id}`,
                        friendList: [],
                      })
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
              ))}
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
