import { View, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { api } from "../apis/api";
import { Avatar } from "@ui-kitten/components";
import { max } from "date-fns";
import AvatarCustomer from "./AvatarCustomer";

const InfoSender = memo(
  ({ IDSender, dataSender, isSelf, children, isGroup = false }) => {
    if (!IDSender || isSelf) return children;
    const [sender, setSender] = useState(null);

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
          <AvatarCustomer
            source={{ uri: sender?.urlavatar }}
            style={{ width: 30, height: 30, objectFit: "cover" }}
            alt={sender?.fullname}
          />
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
