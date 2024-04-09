import React from "react";
import { View } from "react-native";
import styles from "./StyleChat";
import Header from "./Header/Header";
import Body from "./Body/Body";
import Footer from "./Footer/FooterChat";

function Chat({ route }) {
    const { id, name, image, owner } = route.params;
    return (
        <View style={styles.container}>
            <Header fullname={name} id={id} image={image} owner={owner} />
            <Body id={id} owner={owner} nameGroup={name} imageGroup={image} />
            <Footer />
        </View>
    );
}

export default Chat;