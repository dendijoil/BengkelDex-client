import { Text, Button, View } from "native-base"
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingMap from "../components/LoadingMap";
export default function LandingPageScreens({ navigation }) {
  const [user, setUser] = useState(null);
  const [workshop, setWorkshop] = useState(null);

  const navigateToLoginCustomer = () => {
    navigation.navigate("LoginCustomer");
  }

  const data = AsyncStorage.getItem("@customer").then(res => { setUser(res) })
  const data2 = AsyncStorage.getItem("@workshop").then(res => { setWorkshop(res) })

  // if (user) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   )
  // }

  if (user) {
    navigation.replace("HomeScreenCustomer");
  } else if(workshop) {
    navigation.replace("HomeScreenWorkshop");
  } else if (!workshop || !user) {
    navigation.replace("LoginCustomer");
  }

  return (

    <>
      <LoadingMap></LoadingMap>
    </>

  )
}