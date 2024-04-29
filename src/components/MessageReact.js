import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/chatSlice";
import { api } from "../apis/api";

const icons = ["❤️", "👍", "😀", "😂", "😍", "😡"];

const MessageReact = ({ children, item, isSelf, setDataModal }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [reactSelected, setReactSelected] = useState(null);

  const user = "example";
  const dataTemo = [

  ];

  const handleReaction = (emoji) => {
    const data = { user, icon: emoji };
    setReactSelected(emoji);
    setShowReactions(false);
  };

  const dispatch = useDispatch();
  const handleLongPress = () => {
    dispatch(setPopup({ show: true, data: item }));
  };

  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      style={{
        zIndex: 2,
        flexDirection: isSelf ? "row-reverse" : "row",
        alignSelf: isSelf ? "flex-end" : "flex-start",
        alignItems: "center",
      }}
    >
      {children}

      <TouchableOpacity
        onLongPress={() => setShowReactions(!showReactions)}
        onPress={() => {
          setReactSelected("❤️");
          handleReaction("❤️");
        
        }}
        style={{ backgroundColor: "white", padding: 2, borderRadius: 50 }}
      >
        {reactSelected ? (
          <Text>{reactSelected}</Text>
        ) : (
          <Ionicons name="heart-outline" size={18} />
        )}
      </TouchableOpacity>

      {showReactions && (
        <View style={styles.reactionContainer}>
          {icons.map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => handleReaction(emoji)}>
              <Text style={{ fontSize: 20 }}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={() =>
          setDataModal({
            show: true,
            data: dataTemo,
          })
        }
        style={{
          flexDirection: "row",
          bottom: 0,
          position: "absolute",
          right: 0,
        }}
      >
        {dataTemo.slice(0, 3).map((item, index) => (
          <View key={index} style={styles.reactionItem}>
            <Text>{item.icon}</Text>
            <Text style={{ fontSize: 13, color: "gray" }}>2</Text>
          </View>
        ))}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MessageReact;

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
    right: -90,
  },
  reactionItem: {
    flexDirection: "row",
    padding: 0.5,
    paddingHorizontal: 2,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    marginRight: 2,
  },
});
