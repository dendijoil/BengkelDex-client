import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenWorkshop from "../screens/HomeScreenWorkshop";
import MapScreenWorkshop from "../screens/MapScreenWorkshop";
import ProfileWorkshop from "../screens/ProfileWorkshop";
import ChatList from "../screens/ChatList";
import AddOrderScreens from "../screens/AddOrderScreens";
const Tab = createBottomTabNavigator();

export default function TabNavigatorWorkshop() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false }} name="HomePage" component={HomeScreenWorkshop} />
      <Tab.Screen options={{ headerShown: false }} name="MapScreenWorkshop" component={MapScreenWorkshop} />
      <Tab.Screen options={{ headerShown: false }} name="AddOrder" component={AddOrderScreens} />
      <Tab.Screen options={{ headerShown: false }} name="ChatList" component={ChatList} />
      <Tab.Screen options={{ headerShown: false }} name="ProfileWorkshop" component={ProfileWorkshop}/>
    </Tab.Navigator>
  )
}