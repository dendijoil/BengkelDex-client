import { Center, HStack, Text, VStack, Box, Input, Button, Link, Image } from "native-base"
import { mainColor } from "../constant/color"
import logo from "../images/BengkelDex.png"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

export default function LoginWorkshopScreen({ navigation }) {

  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {

  },[])

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  
  const loginWorkshop = async () => {
    try {
      // console.log(input)
      const url = 'https://e110-180-249-184-49.ap.ngrok.io/workshops/login'
      const {data: workshop} = await axios.post(url, input)
      // console.log(workshop);
      await storeData('workshop', workshop)
      navigation.navigate("HomeScreenWorkshop")
    } catch (err) {
      console.log(err);
    }
  }

  const navigateToRegisterWorkshop = () => {
    navigation.navigate("RegisterWorkshop")
  }

  return (
    <>
      <VStack
        space={5}
        mt={10}
      >
        <Center>
          <Image size={100} source={logo} alt={"Logo"} >
          </Image>
        </Center>
        <Center>
          <Box>
            <Text fontSize={'2xl'} fontWeight="extrabold" >Login Workshop</Text>
          </Box>
        </Center>
        <Center>
          <VStack space={'2'} width="4/5">
            <Input placeholder="Email"
              onChangeText={(email) => setInput({ ...input, email })}
            />
            <Input placeholder="Password" type="password"
              onChangeText={(password) => setInput({ ...input, password })}
            />
            <Button bgColor={mainColor} onPress={loginWorkshop} >Continue</Button>
            <Text
              textAlign={"center"}
            >Or register your workshop!  <Link
            color={mainColor}
            onPress={navigateToRegisterWorkshop}> Register Now</Link></Text>
            <Text textAlign={"center"} >Go<Link color={mainColor} onPress={() => navigation.goBack()} > back</Link></Text>
          </VStack>
        </Center>
      </VStack>
    </>
  )
}