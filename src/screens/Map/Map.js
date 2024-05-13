import React from "react";
import { View, Text, TextInput } from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./StyleMap";
import Footer from "../Footer/Footer";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";


const Map = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const INITIAL_REGION = {
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

    const handleSearch = (text) => {
    console.log(text);
    } ;

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <View style={styles.containerTabBar}>
          <View style={styles.containerIcon}>
            <EvilIcons name="search" size={30} color="white" />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              placeholderTextColor="#fff"
              style={styles.input}
              type="text"
              placeholder="Tìm kiếm"
              onChangeText={(text) => {
                setSearchTerm(text);
                handleSearch(text);
              }}
              value={searchTerm}
            />
          </View>
        </View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            showsUserLocation={true}
            showsMyLocationButton={true}
          />
        </View>
        <Footer />
      </View>
    </View>
  );
};

export default Map;