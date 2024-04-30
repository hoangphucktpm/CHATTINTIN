import { TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import AvatarCustomer from "../../../components/AvatarCustomer";

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
      <AvatarCustomer alt={name} source={{ uri: avatar }} />
      <Text category="h6">{name}</Text>
    </TouchableOpacity>
  );
};
