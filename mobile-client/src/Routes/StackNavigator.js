
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingPageScreens from "../screens/LandingPageScreens";
import LoginCustomerScreen from "../screens/LoginCustomerScreen";
import LoginWorkshopScreen from "../screens/LoginWorkshopScreen";
import RegisterCustomerScreen from "../screens/RegisterCustomerScreen";
import RegisterWorkshopScreen from "../screens/RegisterWorkshopScreen";
import MapScreenCustomer from '../screens/MapScreenCustomer';
import TabNavigator from './TabNavigator';
import TabNavigatorWorkshop from './TabNavigatorWorkshop';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import BengkelDetail from '../screens/BengkelDetail';
import MapScreenWorkshop from '../screens/MapScreenWorkshop';
import ChatScreen from '../screens/ChatScreen';
import ChatList from '../screens/ChatList';
import LiveLocation from '../screens/LiveLocation';
const Stack = createStackNavigator();

export default function StackNavigator() {

  const [user, setUser] = useState(null);
  const [workshop, setWorkshop] = useState(null);

  const data = AsyncStorage.getItem("@customer").then(res => { setUser(res) })
  const data2 = AsyncStorage.getItem("@workshop").then(res => { setWorkshop(res) })

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="LandingPageScreens" component={LandingPageScreens} />

        <Stack.Screen options={{ headerShown: false }} name="LoginCustomer" component={LoginCustomerScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreenCustomer" component={TabNavigator} />


        <Stack.Screen options={{ headerShown: false }} name="LoginWorkshop" component={LoginWorkshopScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreenWorkshop" component={TabNavigatorWorkshop} />

        <Stack.Screen options={{ headerShown: false }} name="RegisterCustomer" component={RegisterCustomerScreen} />
        <Stack.Screen options={{ headerShown: false }} name="RegisterWorkshop" component={RegisterWorkshopScreen} />

        <Stack.Screen name="MapScreenCustomer" component={MapScreenCustomer} />
        <Stack.Screen name="MapScreenWorkshop" component={MapScreenWorkshop} />
        <Stack.Screen name="BengkelDetail" component={BengkelDetail} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="LiveLocation" component={LiveLocation} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}