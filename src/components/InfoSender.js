import { View, Text, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { api } from "../apis/api";
import AvatarCustomer from "./AvatarCustomer";
import { useNavigation } from "@react-navigation/native";

const InfoSender = memo(
  ({ IDSender, dataSender, isSelf, children, isGroup = false }) => {
    if (!IDSender || isSelf) return children;
    const [sender, setSender] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
      const fetchDataSender = async () => {
        if (!IDSender) return;
        const res = await api.getUserByPhone(IDSender);
        setSender(res.data);
      };
      if (!isGroup) {
        setSender(dataSender);
      } else {
        fetchDataSender();
        return () => fetchDataSender();
      }
    }, [IDSender]);

    if (!sender) return children;

    console.log("sender", sender);

    const haneleViewProfile = () =>
      navigation.navigate("FriendProfile", sender);

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <TouchableOpacity onPress={haneleViewProfile}>
            <AvatarCustomer
              source={{ uri: sender?.urlavatar }}
              style={{ width: 30, height: 30, objectFit: "cover" }}
              alt={sender?.fullname}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            {sender?.fullname}
          </Text>
        </View>
        <View style={{ marginLeft: 20 }}>{children}</View>
      </View>
    );
  }
);

export default InfoSender;
