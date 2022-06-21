import { Button, Text, Center, Modal, VStack, HStack, Radio, Image } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ProfileWorkshop() {

  const navigation = useNavigation()
  const [workshop, setWorkshop] = useState({});
  const [token, setToken] = useState({});
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`)
      // console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@workshop");
      await AsyncStorage.removeItem("@token");
      console.log("logout");
      navigation.navigate("LandingPageScreens");
    } catch (e) {
      console.log(e);
    }
  }

  const navigateToListOrder = () => {
    // console.log(token);
    navigation.navigate("ListOrder", {id: workshop.id, token: token, payload: workshop})
  }

  useEffect(() => {
    const workshopStorage = getData("workshop").then(res => {
      // console.log(res);
      setWorkshop(res.payload)
      setToken(res.token)
    })
  }, [])

  return (
    <SafeAreaView>
      <VStack space={5}>
        <Center>
          <Text fontSize={"2xl"} >Profile</Text>
        </Center>
        <Center>
          <Image size={100} borderRadius={"full"} source={{ uri: workshop.imgUrl }} alt={"Logo"} />
        </Center>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Username:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {workshop.name}
          </Text>
        </VStack>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Email:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {workshop.email}
          </Text>
        </VStack>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Address:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {workshop.address}
          </Text>
        </VStack>
        <VStack ml={4}>
          <Text fontSize={"2xl"}>
            Balance:
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {workshop.balance} DexCoin
          </Text>
        </VStack>
        <HStack justifyContent={"space-between"}>
          <Button onPress={logout}>
            LOG OUT
          </Button>
          <Button
          onPress={navigateToListOrder}
          >
            LIST ORDER
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  )
};