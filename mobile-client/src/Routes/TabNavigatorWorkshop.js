import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenWorkshop from "../screens/HomeScreenWorkshop";
import MapScreenWorkshop from "../screens/MapScreenWorkshop";
import ProfileWorkshop from "../screens/ProfileWorkshop";
import ChatList from "../screens/ChatList";
import AddOrderScreens from "../screens/AddOrderScreens";
import { AntDesign, Fontisto, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

export default function TabNavigatorWorkshop() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false, tabBarIcon: () => {
        return  <AntDesign name="home" size={24} color="black" />
      } }} name="Home" component={HomeScreenWorkshop} />
      <Tab.Screen options={{ headerShown: false, tabBarIcon: () => {
        return  <MaterialCommunityIcons name="map-search-outline" size={24} color="black" />
      } }} name="Map" component={MapScreenWorkshop} />
      <Tab.Screen options={{ tabBarLabel:() => {return null}, headerShown: false, tabBarIcon: () => {
        return  <Octicons name="diff-added" size={35} color="black" />
      } }} name="AddOrder" component={AddOrderScreens} />
      <Tab.Screen options={{ headerShown: false, tabBarIcon: () => {
        return  <MaterialCommunityIcons name="message-processing-outline" size={24} color="black" />
      } }} name="Inbox" component={ChatList} />
      <Tab.Screen options={{ headerShown: false, tabBarIcon: () => {
        return  <AntDesign name="user" size={24} color="black" />
      } }} name="Profile" component={ProfileWorkshop}/>
    </Tab.Navigator>
  )
}