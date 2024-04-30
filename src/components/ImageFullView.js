import { useDispatch, useSelector } from "react-redux";
import { setViewFullImage } from "../redux/chatSlice";
import { Modal } from "@ui-kitten/components";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";

export const ViewImageFullScreen = () => {
  const data = useSelector((state) => state.chat.viewFullImage);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setViewFullImage({ show: false, data: null }));
  };
  return (
    <Modal
      visible={data.show}
      transparent={false}
      onRequestClose={handleClose}
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: "15%", right: 20 }}
        onPress={handleClose}
      >
        <MaterialIcons name="close" color={"white"} />
      </TouchableOpacity>
      <Image source={{ uri: data.data }} style={styles.image} />
    </Modal>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: "50%",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    objectFit: "contain",
  },
});
