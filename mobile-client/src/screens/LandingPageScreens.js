import { Text, Button, View } from "native-base"
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LandingPageScreens({ navigation }) {
  const [user, setUser] = useState(null);
  const [workshop, setWorkshop] = useState(null);

  const navigateToLoginCustomer = () => {
    navigation.navigate("LoginCustomer");
  }

  const data = AsyncStorage.getItem("@customer").then(res => { setUser(res) })
  const data2 = AsyncStorage.getItem("@workshop").then(res => { setWorkshop(res) })

  if (user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (user) {
    navigation.navigate("HomeScreenCustomer");
  } else if(workshop) {
    navigation.navigate("HomeScreenWorkshop");
  } else if (!workshop || !user) {
    navigation.navigate("LoginCustomer");
  }

  return (

    <>
      <Text>Splash Screen</Text>
      <Button onPress={navigateToLoginCustomer}></Button>
    </>

  )
}