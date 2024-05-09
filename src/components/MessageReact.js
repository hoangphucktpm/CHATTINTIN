import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/chatSlice";

const icons = ["❤️", "👍", "😀", "😂", "😍", "😡"];

const MessageReact = ({ children, item, isSelf, setDataModal }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [reactSelected, setReactSelected] = useState(null);

  const user = "example";
  const dataTemo = [];

  const handleReaction = (emoji) => {
    const data = { user, icon: emoji };
    setReactSelected(emoji);
    setShowReactions(false);
  };

  const dispatch = useDispatch();
  const handleLongPress = () => {
    dispatch(setPopup({ show: true, data: item }));
  };

  const hideReactions = () => {
    setShowReactions(false);
  };

  const ScreenHeight = 9999;
  const ScreenWidth = 999;

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
        style={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 50,
        }}
      >
        {reactSelected ? (
          <Text>{reactSelected}</Text>
        ) : (
          <Ionicons name="heart-outline" size={18} />
        )}
      </TouchableOpacity>

      {showReactions && (
        <View style={{ ...styles.reactionContainer, right: isSelf ? 90 : -90 }}>
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

      {showReactions && (
        <TouchableWithoutFeedback onPress={hideReactions}>
          <View
            style={{
              ...styles.overlay,
              width: ScreenWidth,
              height: ScreenHeight,
            }}
          />
        </TouchableWithoutFeedback>
      )}
    </TouchableOpacity>
  );
};

export default MessageReact;

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 1000,
    bottom: "10%",
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    // backgroundColor: "red",
    opacity: 0.5,
    zIndex: 9,
    position: "absolute",
    top: -999,
  },
});
