import { TouchableOpacity } from "react-native";
import { Avatar, Text } from "@ui-kitten/components";

export default ItemGroupModal = ({ name, avatar, handleAddToGroup }) => {
  return (
    <TouchableOpacity
      onPress={handleAddToGroup}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 10,
      }}
    >
      <Avatar source={{ uri: avatar }} />
      <Text category="h6">{name}</Text>
    </TouchableOpacity>
  );
};
