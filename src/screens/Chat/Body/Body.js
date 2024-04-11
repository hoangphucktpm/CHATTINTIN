import React, { memo, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { setPopup } from "../../../redux/chatSlice";
import socket from "../../../services/socket";

function Body({ isLoading }) {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [messagesData, setMessagesData] = useState([]);

  useEffect(() => {
    setMessagesData(messages);
  }, [messages]);

  const reverseData = useMemo(
    () => [...messagesData].reverse(),
    [messagesData]
  );

  const handleLongPress = (item) => {
    dispatch(setPopup({ show: true, data: item }));
  };

  const getItemAlignment = (item) => {
    return item.IDSender === user.ID ? "flex-end" : "flex-start";
  };

  const getItemBackgroundColor = (item) => {
    return item.IDSender === user.ID ? "#0094FF" : "#fff";
  };

  const getItemTextColor = (item) => {
    return item.IDSender === user.ID ? "white" : "black";
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={reverseData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item)}
              style={{
                margin: 10,
                padding: 10,
                alignSelf: getItemAlignment(item),
                backgroundColor: getItemBackgroundColor(item),
                borderRadius: 8,
                marginBottom: 5,
                maxWidth: "70%",
                display: "flex",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: getItemTextColor(item),
                }}
              >
                {item.content}
              </Text>
              <Text style={{ color: getItemTextColor(item) }}>
                {format(item.dateTime, "HH:mm:s")}
              </Text>
            </TouchableOpacity>
          )}
          inverted={true}
        />
      )}
    </View>
  );
}

export default memo(Body);
