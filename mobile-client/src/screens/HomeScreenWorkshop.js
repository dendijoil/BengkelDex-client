import { Box, Text, VStack, Image, Center, Button, HStack, Switch, Flex } from "native-base";
import logo from "../images/BengkelDex.png";
import { Dimensions, StyleSheet } from "react-native";
import { mainColor, secondaryColor } from "../constant/color";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../constant/listurl";
import priceToRupiah from "../helpers/priceToRupiah";

export default function HomeScreenWorkshop() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [workshop, setWorkshop] = useState({});
  const [tokenWorkshop, setTokenWorkshop] = useState({});
  const [statusWorkshop, setStatusWorkshop] = useState({});

  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      return !previousState;
    });

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const statusOpen = async () => {
    try {
      toggleSwitch();
      const url = URL + `/workshops/${workshop.id}`;
      const { data: status } = await axios({
        method: "PATCH",
        url: url,
        headers: {
          token: tokenWorkshop,
        },
        data: {
          statusOpen: isEnabled,
        },
      });
      setStatusWorkshop(isEnabled);
    } catch (err) {
      console.log(err);
    }
  };
  const navigateToMap = () => {
    navigation.navigate("MapScreenWorkshop");
  };

  useEffect(() => {
    const workshopStorage = getData("workshop").then((res) => {
      setWorkshop(res.payload);
      setTokenWorkshop(res.token);
      setStatusWorkshop(res.payload.statusOpen);
    });
  }, [isEnabled]);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <VStack>
          <Center>
            <Box mt={5}>
              <HStack>
                <Image size={70} borderRadius={"full"} source={{ uri: workshop.imgUrl }} alt={"Logo"} />
                <VStack pl={4}>
                  <Text fontSize={24} fontWeight={500} paddingTop={0}>
                    {workshop.name}
                  </Text>
                  <Text fontWeight={400} color={"gray.400"}>At your service</Text>
                </VStack> 
              </HStack>
            </Box>
          </Center>
        </VStack>
        <VStack mt={5}>
          
          <Center>
            <Box h={windowHeight * 0.25} justifyContent={"center"} shadow={"5"} rounded={20} w={windowWidth * 0.9} backgroundColor={"blue.300"}>
              <Text fontSize={25} color={"gray.600"} textAlign={"center"}>
                Balance
              </Text>
              <Text fontSize={50} fontWeight={"bold"} textAlign={"center"}>
                {priceToRupiah(workshop.balance)}
              </Text>
              <Text fontSize={25} fontWeight={"bold"} textAlign={"center"}>
                DexCoin
              </Text>
            </Box>
          </Center>
        </VStack>
        <VStack mt={20}>
          <Center>
            {statusWorkshop ? (
              <Button shadow={"5"} backgroundColor={"green.300"} w={windowWidth * 0.7} h={windowHeight * 0.1} onPress={statusOpen}>
                <Text fontSize={20} fontWeight={"bold"}>Workshop is OPEN</Text>
              </Button>
            ) : (
              <Button shadow={"5"} backgroundColor={"red.400"} w={windowWidth * 0.7} h={windowHeight * 0.1} onPress={statusOpen}>
                <Text fontSize={20} fontWeight={"bold"}>Workshop is CLOSE</Text>
              </Button>
            )}
          </Center>
          <Center mt={8}>
            <Button shadow={"5"} onPress={navigateToMap} w={windowWidth * 0.7} h={windowHeight * 0.1} backgroundColor={secondaryColor}>
              <Text fontSize={20} fontWeight={"bold"}>Find Customer near You</Text>
            </Button>
          </Center>
        </VStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingHorizontal: 30,
    backgroundColor: "#eaeaea",
  },
});
