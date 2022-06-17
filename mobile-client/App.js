import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import ChooseLocation from './src/screens/ChooseLocation';
import Home from './src/screens/Home';

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Choose Location" component={ChooseLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}