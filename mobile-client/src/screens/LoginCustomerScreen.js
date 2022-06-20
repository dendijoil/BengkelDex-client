import { Center, HStack, Text, VStack, Box, Input, Button, Link, Image, IconButton, CloseIcon, Alert, Toast } from "native-base"
// import { Alert } from "react-native"
import { mainColor } from "../constant/color"
import logo from "../images/BengkelDex.png"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { URL } from "../constant/listurl"
export default function LoginScreen({ navigation }) {

  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
      // saving error
    }
  }
  
  const loginCustomer = async () => {
    try {
      const url = URL + '/customers/login'
      const { data: customer } = await axios.post(url, input)
      await storeData('customer', customer)
      Toast.show({
        render: () => {
          return (
            <Center>
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Login Success !
              </Box>
            </Center>
          )
        }
      })
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreenCustomer' }],
      })
    } catch (err) {
      Toast.show({
        render: () => {
          return (
            <Center>
              <Box bg="amber.500" px="2" py="1" rounded="sm" mb={5}>
                Invalid Username or Password !
              </Box>
            </Center>
          )
        }
      })
      console.log(err);

    }
  }

  const navigateToLoginWorkshop = () => {
    navigation.navigate("LoginWorkshop")
  }

  const navigateToRegisterCustomer = () => {
    navigation.navigate("RegisterCustomer")
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
            <Text fontSize={'2xl'} fontWeight="extrabold" >Login</Text>
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
            <Button bgColor={mainColor} onPress={loginCustomer} >Continue</Button>
            <Text
              textAlign={"center"}
            >Or Login as a Workshop Owner <Link
              color={mainColor}
              onPress={navigateToLoginWorkshop}> Here </Link> </Text>
          </VStack>
        </Center>
        <Center mt={10} >
          <Text>Don't have an account? <Link
            color={mainColor}
            onPress={navigateToRegisterCustomer}> Register Now</Link></Text>
        </Center>
      </VStack>
    </>
  )
}