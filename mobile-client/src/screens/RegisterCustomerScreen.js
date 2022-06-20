import { Center, HStack, Text, VStack, Box, Input, Button, Link, Image } from "native-base"
import { mainColor } from "../constant/color"
import logo from "../images/BengkelDex.png"
import { useState } from "react"
import axios from "axios"
import { URL } from "../constant/listurl"
export default function LoginScreen({ navigation }) {

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  })

  const loginWorkshop = () => {
    navigation.navigate("LoginWorkshop")
  }

  const submit = async () => {
    try {
      const url = URL + "/customers/register"
      const { data: response } = await axios({
        method: "POST",
        url: url,
        data: input
      })
      navigation.navigate("LoginCustomer")
    } catch (err) {
      console.log(err);
    }
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
            <Text fontSize={'2xl'} fontWeight="extrabold" >Register Customer</Text>
          </Box>
        </Center>
        <Center>
          <VStack space={'2'} width="4/5">
            <Input
              onChangeText={(name) => setInput({ ...input, name })}
              placeholder="Name" />
            <Input
              onChangeText={(username) => setInput({ ...input, username })}
              placeholder="Username" />
            <Input
              type="email"
              onChangeText={(email) => setInput({ ...input, email })}
              placeholder="Email" />
            <Input
              onChangeText={(password) => setInput({ ...input, password })}
              type={"password"}
              placeholder="Password" />
            <Input
              onChangeText={(phoneNumber) => setInput({ ...input, phoneNumber })}
              placeholder="Phone Number" />
            <Input
              onChangeText={(address) => setInput({ ...input, address })}
              placeholder="Address" />
            <Button bgColor={mainColor} onPress={submit}>Continue</Button>
          </VStack>
        </Center>
        <Center>
          <Text>Go<Link color={mainColor} onPress={() => navigation.goBack()} > back</Link></Text>
        </Center>
      </VStack>
    </>
  )
}