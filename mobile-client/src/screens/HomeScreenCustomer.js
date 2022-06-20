import { Box, Text, VStack, Image, Center, Button, HStack, Switch } from "native-base";
import logo from "../images/BengkelDex.png";
import { mainColor, secondaryColor } from "../constant/color";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../constant/listurl";
export default function HomeScreenUser() {
  const navigation = useNavigation()
  const [isEnabled, setIsEnabled] = useState(false);
  const [customer, setCustomer] = useState({});
  const [token, setToken] = useState({});

  const toggleSwitch = () => setIsEnabled(previousState => {
    // console.log(previousState);
    return !previousState
  });
  console.log(isEnabled);

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }
  const statusBroadcast = async () => {
    try {
      const url = URL + '/customers/broadcast'
      const { data: status } = await axios({
        method: "PATCH",
        url: url,
        headers: {
          token: token
        },
        data: {
          status: isEnabled
        }
      })
      console.log(status);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const customerStorage = getData("customer").then(res => {
      setCustomer(res.payload)
      setToken(res.token)
    })
    statusBroadcast()
  }, [isEnabled])
  console.log(customer);
  console.log(token);
  const navigateToMap = () => {
    navigation.navigate("MapScreenCustomer")
  }
  return (
    <>
      <SafeAreaView>
        <VStack space={5}>
          <Box mt={5} backgroundColor={mainColor}>
            <HStack justifyContent={"space-between"} >
              <Image size={50} borderRadius={"full"} source={{uri:"https://media-exp2.licdn.com/dms/image/C5103AQFb3SSll63O9g/profile-displayphoto-shrink_800_800/0/1548945277576?e=1661385600&v=beta&t=nUHcnAezfb0SSst5nOlOrGR3HxjKVr35uezUz3j-8Ho"}} alt={"Logo"} />
              <VStack ml={"-110px"}>
                <Text fontWeight={"bold"} >Haii {customer.name}</Text>
                <Text fontWeight={"bold"} >Your Balance : {customer.balance} DexCoin</Text>
              </VStack>
              <Switch size="sm" onValueChange={toggleSwitch}
                value={isEnabled} />
            </HStack>
          </Box>
          <Center>
            <Image size={100} source={logo} alt={"logo"} />
          </Center>
          <Box>
            <Text fontSize={'2xl'} fontWeight={"bold"} textAlign={'center'} >
              BengkelDex
            </Text>
            <Text fontSize={'2xl'} fontWeight={"bold"} textAlign={'center'}>
              your vehicle workshop
            </Text>
          </Box>
          <Center>
            <Text color={'coolGray.400'} textAlign="center" maxWidth={250}>
              The best app in town to find out the nearest workshop
            </Text>
          </Center>
          <Center>
            <Button rounded={"3xl"} backgroundColor={mainColor} w="1/3" onPress={navigateToMap} >
              Find Now !
            </Button>
          </Center>
          <Center>
            <Text fontSize={'2xl'} fontWeight={"bold"}>OR</Text>
          </Center>
          <Center>
            <Button rounded={"3xl"} backgroundColor={secondaryColor} w="1/3">
              <Text>Need Help ! </Text>
            </Button>
          </Center>
        </VStack>
      </SafeAreaView>
    </>
  );
}