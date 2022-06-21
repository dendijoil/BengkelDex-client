import { Center, HStack, Text, VStack, Box, Input, Button, Link, Image } from "native-base"
import { mainColor } from "../constant/color"
import logo from "../images/BengkelDex.png"
import { useState, useEffect } from "react"
import axios from "axios"
import { URL } from "../constant/listurl"
import * as Location from 'expo-location';


export default function LoginScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  })
  // Kurang di location untuk dikirim ke backend , masukin req.body via input
  const submit = async () => {
    try {
      const url = URL + "/workshops/register"
      const { data: workshop } = await axios({
        method: "POST",
        url: url,
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          phoneNumber: input.phoneNumber,
          address: input.address,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      })
      console.log(workshop)
      navigation.navigate("LoginWorkshop")
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
            <Text fontSize={'2xl'} fontWeight="extrabold" >Register Workshop</Text>
          </Box>
        </Center>
        <Center>
          <VStack space={'2'} width="4/5">
            <Input
              onChangeText={(name) => setInput({ ...input, name })}
              placeholder="Name" />
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

