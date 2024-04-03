import { Text, View } from "react-native";
import React, { Component } from "react";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";
function Chat({route}) {
    const {id,name,image,owner} = route.params;
    return (
        <View style={styles.container}>
            <Header  name={name} id={id} image={image} owner={owner} />
            <Body id={id} owner={owner} nameGroup= {name} imageGroup = {image} />
            <Footer/>
        </View>
    );
}

export default Chat;