import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from "./src/screens/Auth/register";
import Login from "./src/screens/Auth/login";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputPass from "./src/screens/Auth/InputPass";
import OTP from "./src/screens/Auth/OTP";
import InputProfile from "./src/screens/Auth/InputProfile";

const App = ()=> {
  const Stack = createNativeStackNavigator()
    const home = "Home"
    const chatWindow = "ChatWindow"
    const listFriend = "ListFriend"
    const drawbleChat = "DrawerChat";
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
    const contracts = "Contracts"
    const addFriends = "AddFriends";
    const createGroup = "CreateGroup";
    const imageChat = "ImageChat";
    const memberGroup = "MemberGroup";
    return (

            <NavigationContainer>
            <Stack.Navigator initialRouteName={OTP} screenOptions={{headerShown:false}}>
                <Stack.Screen name={login} component={Login} />
                <Stack.Screen name={register} component={Register} />
                <Stack.Screen name={inputPass} component={InputPass} />
                <Stack.Screen name={otp} component={OTP} />
                <Stack.Screen name={inputProfile} component={InputProfile} />

            </Stack.Navigator>
        </NavigationContainer>

        );
        
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  export default App;