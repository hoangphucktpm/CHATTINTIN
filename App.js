import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/screens/Login&Register/Register";
import Login from "./src/screens/Login&Register/Login";
import {
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputPass from "./src/screens/Login&Register/InputPass";
import OTP from "./src/screens/Login&Register/OTP";
import InputProfile from "./src/screens/Login&Register/InputProfile";
import DashBoard from "./src/screens/ForgotPassword&DashBoard/DashBoard";
import ForgotPassword from "./src/screens/ForgotPassword&DashBoard/ForgotPassword";
import Contacts from "./src/screens/Contacts/Contacts";
import AddFriends from "./src/screens/Contacts/AddFriends";
import Home from "./src/screens/app/Home";
import Chat from "./src/screens/Chat/Chat";
import DrawerChat from "./src/screens/Chat/Drawble/DrawerChat";
import ScannerQR from "./src/screens/ScannerQR/ScannerQR";
import MyProfile from "./src/screens/Profile/MyProfile";
import FriendProfile from "./src/screens/Profile/FriendProfile";
import CreateGroup from "./src/screens/Group/CreateGroup";
import ImageChat from "./src/screens/Chat/ShowImageChat";
import ShowMemberGroup from "./src/screens/Chat/ShowMemberGroup";
import ListFriend from "./src/screens/ListFriend/ListFriend";
import ChangePassForgot from "./src/screens/ForgotPassword&DashBoard/ChangePassForgot";
import DrawerChatGroup from "./src/screens/Chat/Drawble/DrawerChatGroup";
import OTPPassForgot from "./src/screens/ForgotPassword&DashBoard/OTPPassForgot";
import Story from "./src/screens/Story/Story";
import VideoCall from "./src/screens/Chat/Call/VideoCall";
import VideoCallCome from "./src/screens/Chat/Call/VideoCallCome";
import Map from "./src/screens/Map/Map";

import { Provider } from "react-redux";
import { store } from "./store";
import SourcesMessage from "./src/screens/Chat/SourcesMessage";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import AddMembers from "./src/screens/Group/AddMembers";

const App = () => {
  const Stack = createNativeStackNavigator();
  const home = "Home";
  const chat = "Chat";
  const listFriend = "ListFriend";
  const drawbleChat = "DrawerChat";
  const drawbleChatGroup = "DrawerChatGroup";
  const login = "Login";
  const register = "Register";
  const inputPass = "InputPass";
  const otp = "OTP";
  const inputProfile = "InputProfile";
  const dashBoard = "DashBoard";
  const forgotPassword = "ForgotPassword";
  const scannerQR = "ScannerQR";
  const myProfile = "MyProfile";
  const friendProfile = "FriendProfile";
  const contacts = "Contacts";
  const addFriends = "AddFriends";
  const createGroup = "CreateGroup";
  const imageChat = "ImageChat";
  const showMemberGroup = "ShowMemberGroup";
  const changePassForgot = "ChangePassForgot";
  const otpPassForgot = "OTPPassForgot";
  const story = "Story";
  const sourcesMessages = "SourcesMessages";
  const addMemberGroups = "AddMemberGroups";
  const videoCall = "VideoCall";
  const videoCallCome = "VideoCallCome";
  const map = "Map";
  // LogBox.ignoreLogs(["new NativeEventEmitter"]);
  // LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={dashBoard}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name={login} component={Login} />
            <Stack.Screen name={register} component={Register} />
            <Stack.Screen name={inputPass} component={InputPass} />
            <Stack.Screen name={otp} component={OTP} />
            <Stack.Screen
              name={changePassForgot}
              component={ChangePassForgot}
            />
            <Stack.Screen name={inputProfile} component={InputProfile} />
            <Stack.Screen name={dashBoard} component={DashBoard} />
            <Stack.Screen name={forgotPassword} component={ForgotPassword} />
            <Stack.Screen name={contacts} component={Contacts} />
            <Stack.Screen name={addFriends} component={AddFriends} />
            <Stack.Screen name={home} component={Home} />
            <Stack.Screen name={addMemberGroups} component={AddMembers} />
            <Stack.Screen name={chat} component={Chat} />
            <Stack.Screen name={drawbleChat} component={DrawerChat} />
            <Stack.Screen name={scannerQR} component={ScannerQR} />
            <Stack.Screen name={myProfile} component={MyProfile} />
            <Stack.Screen name={showMemberGroup} component={ShowMemberGroup} />
            <Stack.Screen name={listFriend} component={ListFriend} />
            <Stack.Screen name={drawbleChatGroup} component={DrawerChatGroup} />
            <Stack.Screen name={createGroup} component={CreateGroup} />
            <Stack.Screen name={otpPassForgot} component={OTPPassForgot} />
            <Stack.Screen name={friendProfile} component={FriendProfile} />
            <Stack.Screen name={story} component={Story} />
            <Stack.Screen name={sourcesMessages} component={SourcesMessage} />
            <Stack.Screen name={videoCall} component={VideoCall} />
            <Stack.Screen name={videoCallCome} component={VideoCallCome} />
            <Stack.Screen name={map} component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;