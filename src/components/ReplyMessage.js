import { View, Text } from "react-native";
import React from "react";
import ImageMessage from "./ImageMessage";

const ReplyMessage = ({ messages, item, isSelf, children }) => {
  if (!item.isReply) return children;
  const reply = messages.find((m) => m.IDMessageDetail === item.IDMessageReply);

  if (!reply) return children;

  const renderItem = () => {
    if (reply.type === "image") return <ImageMessage url={reply.content} />;
    if (reply.type === "file")
      return <Text style={{ fontSize: 16, color: "#555" }}>File</Text>;

    return <Text style={{ fontSize: 16, color: "#555" }}>{reply.content}</Text>;
  };
  return (
    <View
      style={{
        padding: 10,
        justifyContent: "center",
        display: "flex",
        alignItems: isSelf ? "flex-end" : "flex-start",
        position: "relative",
        marginTop: 50,
      }}
    >
      <View
        style={[
          {
            display: "flex",
            flexDirection: "column",
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            position: "absolute",
            top: -40,
          },
          isSelf ? { right: 10 } : { left: 0 },
        ]}
      >
        <Text style={{ fontSize: 18, fontWeight: 600, color: "#555" }}>
          {reply.userSender.fullname}
        </Text>
        {renderItem()}
      </View>
      <View>{children}</View>
    </View>
  );
};

export default ReplyMessage;
