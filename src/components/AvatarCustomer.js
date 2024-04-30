import React from "react";
import { Avatar } from "@ui-kitten/components";
import { Avatar as AvatarText } from "react-native-paper";

const AvatarCustomer = (props) => {
  if (props.source && props.source.uri) {
    return <Avatar {...props} />;
  }

  const generateRandomColor = (num = 0) => {
    var colors = [
      "green",
      "blue",
      "red",
      "yellow",
      "cyan",
      "orange",
      "magenta",
    ];
    var randomColor = colors[num % colors.length];
    return randomColor;
  };

  return (
    <AvatarText.Text
      {...props}
      label={props.alt?.slice(0, 2).trim()}
      size={24}
      style={{
        borderRadius: 100,
        ...props.style,
        backgroundColor: generateRandomColor(props.alt?.slice(1).charCodeAt(0)),
      }}
    />
  );
};

export default AvatarCustomer;
