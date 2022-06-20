import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenCustomer from "../screens/HomeScreenCustomer";
import HomeScreenWorkshop from "../screens/HomeScreenWorkshop";
import MapScreenCustomer from "../screens/MapScreenCustomer";
import Profile from "../screens/Profile";
const Tab = createBottomTabNavigator();

export default function TabNavigatorWorkshop() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false }} name="HomePage" component={HomeScreenWorkshop} />
    </Tab.Navigator>
  )
}