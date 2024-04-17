import { View, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { api } from "../apis/api";
import { Avatar } from "@ui-kitten/components";

const InfoSender = memo(({ IDSender, dataSender, isSelf, children }) => {
  if (!IDSender || isSelf) return children;
  const [sender, setSender] = useState(null);

  useEffect(() => {
    const fetchDataSender = async () => {
      if (!IDSender) return;
      const res = await api.getUserByPhone(IDSender);
      setSender(res.data);
    };
    if (dataSender) setSender(dataSender);
    else fetchDataSender();
    return () => fetchDataSender();
  }, [IDSender]);

  if (!sender) return children;

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Avatar
          source={{ uri: dataSender.urlavatar }}
          alt={dataSender?.fullname}
          style={{ width: 30, height: 30, objectFit: "cover" }}
        />
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          {dataSender?.fullname}
        </Text>
      </View>
      {children}
    </View>
  );
});

export default InfoSender;
