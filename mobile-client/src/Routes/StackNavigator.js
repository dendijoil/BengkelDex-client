
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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function StackNavigator() {
  // Try to navGuard
  // const navigate = useNavigation()
  // if(AsyncStorage.getItem("@customer")){
  //   <Stack.Screen options={{ headerShown: false }} name="HomeScreenCustomer" component={TabNavigator} />
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="LoginCustomer" component={LoginCustomerScreen} />
        <Stack.Screen options={{ headerShown: false }} name="LoginWorkshop" component={LoginWorkshopScreen} />
        <Stack.Screen options={{ headerShown: false }} name="RegisterCustomer" component={RegisterCustomerScreen} />
        <Stack.Screen options={{ headerShown: false }} name="RegisterWorkshop" component={RegisterWorkshopScreen} />
        {/* <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreenCustomer} /> */}
        <Stack.Screen name="MapScreenCustomer" component={MapScreenCustomer} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreenCustomer" component={TabNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreenWorkshop" component={TabNavigatorWorkshop} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}