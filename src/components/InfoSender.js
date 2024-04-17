import React, { memo, useEffect, useState } from "react";
import { api } from "../apis/api";
import { Avatar } from "@ui-kitten/components";

const InfoSender = memo(
  ({ IDSender, dataSender, isSelf, children, isGroup = false }) => {
    const [sender, setSender] = useState(dataSender);

    useEffect(() => {
      const fetchDataSender = async () => {
        if (!IDSender || isGroup) return;
        const res = await api.getUserByPhone(IDSender);
        setSender(res.data);
      };

      if (!sender) {
        fetchDataSender();
      }
    }, [IDSender, isGroup, sender]);

    if (!sender || isSelf) return children;

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
          <Avatar
            source={{ uri: sender.urlavatar }}
            alt={sender.fullname}
            style={{ width: 30, height: 30, objectFit: "cover" }}
          />
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            {sender.fullname}
          </Text>
        </View>
        <View style={{ marginLeft: 20 }}>{children}</View>
      </View>
    );
  }
);

export default InfoSender;
