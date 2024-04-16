import { PermissionsAndroid, Platform } from "react-native";

export const requestPermissions = async () => {
  try {
    if (Platform.OS === "android") {
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const photoPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return (
        cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
        photoPermission === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      return true;
    }
  } catch (error) {
    console.log("Đã xảy ra lỗi khi yêu cầu quyền:", error);
    return false;
  }
};
