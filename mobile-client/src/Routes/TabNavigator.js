import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenCustomer from "../screens/HomeScreenCustomer";
import MapScreenCustomer from "../screens/MapScreenCustomer";
import ChatList from "../screens/ChatList";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false }} name="HomePage" component={HomeScreenCustomer} />
      <Tab.Screen options={{ headerShown: false }} name="Map" component={MapScreenCustomer} />
      <Tab.Screen options={{ headerShown: false }} name="ChatList" component={ChatList} />
      <Tab.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}