import { Text, Button } from "native-base"
export default function LandingPageScreens({ navigation }) {

  const navigateToLoginCustomer = () => {
    navigation.navigate("LoginCustomer");
  }

  return (

    <>
      <Text>Splash Screen</Text>
      <Button onPress={navigateToLoginCustomer}></Button>
    </>

  )
}