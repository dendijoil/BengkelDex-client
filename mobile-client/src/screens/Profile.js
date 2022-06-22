import { Button, Text, Center, Modal, VStack, HStack, Radio, Image } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {

  const navigation = useNavigation()
  const [customer, setCustomer] = useState({});

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`)
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@customer");
      await AsyncStorage.removeItem("@token");
      console.log("logout");
      navigation.replace("LoginCustomer");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const customerStorage = getData("customer").then(res => {
      console.log(res);
      setCustomer(res.payload)
    })
  }, [])

  return (
    <SafeAreaView>
      <VStack space={5}>
        <Center>
          <Text fontSize={"2xl"} >Profile</Text>
        </Center>
        <Center>
          <Image size={100} borderRadius={"full"} source={{ uri: "https://media-exp2.licdn.com/dms/image/C5103AQFb3SSll63O9g/profile-displayphoto-shrink_800_800/0/1548945277576?e=1661385600&v=beta&t=nUHcnAezfb0SSst5nOlOrGR3HxjKVr35uezUz3j-8Ho" }} alt={"Logo"} />
        </Center>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Username:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {customer.name}
          </Text>
        </VStack>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Email:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {customer.email}
          </Text>
        </VStack>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Address:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {customer.address}
          </Text>
        </VStack>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Balance:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {customer.balance} DexCoin
          </Text>
        </VStack>
        <HStack justifyContent={"space-between"}>
          <Button w={"1/4"} onPress={()=> {navigation.navigate("TopUpScreen")}}>
            TOPUP
          </Button>
          <Button onPress={logout}>
            LOG OUT
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  )
};