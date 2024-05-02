import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/app/Home";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
