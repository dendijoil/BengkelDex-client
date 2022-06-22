import axios from "axios";
import { HStack, Stack, Text, VStack, Image, Center, Flex, Button, View } from "native-base";
import { useEffect, useState } from "react";
import { URL } from "../constant/listurl";
import {mainColor} from "../constant/color";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

export default function BengkelDetail({ route, navigation }) {
  const [workshopDetail, setWorkshopDetail] = useState(null)
  function navigateToChat() {
    navigation.navigate("ChatScreen", { id: route.params.id, data: route.params.data })
  }

  function navigateToLiveLocation() {
    navigation.navigate("LiveLocation", {data: workshopDetail})
  }

  useEffect(() => {
    (async () => {
      try {
        let id = route.params.id
        const { data: workshop } = await axios({
          method: "GET",
          url: `${URL}/workshops/${id}`
        })
        setWorkshopDetail(workshop)
      } catch (error) {
      }
    })()
  }, [])

  if (workshopDetail === null) {
    return <Text>Loading ....</Text>
  }
  return (
    <VStack space={5}>
      <View backgroundColor={"coolGray.400"}>
        <HStack p={3} shadow={"9"} space={4} 
        >
          <Image size={windowWidth * 0.19} rounded={"full"} source={{ uri: workshopDetail.imgUrl }} alt={"bengkelImage"} 
          marginTop={windowHeight * 0.01}
          />
          <VStack
          >
            <Text fontSize="2xl" bold w={windowWidth * 0.7}>{workshopDetail.name}</Text>
            {workshopDetail.statusOpen ?
              <Text fontSize="xl">Status : Open</Text> :
              <Text fontSize="xl">Status : Closed</Text>}
            <Text fontSize="md">{workshopDetail.phoneNumber}</Text>
          </VStack>
        </HStack>
        <HStack p={3} space={4}
        marginTop={windowHeight * 0}
        >
            <Text>{workshopDetail.address}</Text>
        </HStack>
      </View>

      <Center>
        <Text fontSize="2xl" bold>List Services</Text>
      </Center>
      <Center>
        <HStack justifyContent={"space-between"} w={"4/5"}>
          <Text fontSize="xl" bold
          marginLeft={windowWidth * 0.02}
          >Name</Text>
          <Text fontSize="xl" bold 
          marginRight={windowWidth * 0.02}
          >Price</Text>
        </HStack>
        {workshopDetail.Services.map(el => {
          return (
            <>
            <HStack backgroundColor={"coolGray.300"} w={"4/5"} flexWrap={"wrap"} justifyContent={"space-between"}
            >
              <Text fontSize="lg"
              marginLeft={windowWidth * 0.02}
              marginTop={windowHeight * 0.01}
              marginBottom={windowHeight * 0.01}

              >{el.name}</Text>
              <Text fontSize="lg"
              marginRight={windowWidth * 0.02}
              marginTop={windowHeight * 0.01}
              marginBottom={windowHeight * 0.01}
              >{formatCurrency({ amount: el.price, code: "IDR" })[0]}</Text>
            </HStack>
            </>
            
          )
        })}
      </Center>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />

      <Center>
        <Flex direction="row"
        marginTop={windowHeight * 0.03}
        >
          <Button w={windowWidth * 0.25} backgroundColor={mainColor} onPress={navigateToChat} workshop={workshopDetail}
              marginRight={windowWidth * 0.05}
          >
            <Text color={"#ecfeff"} bold>Chat !</Text>
          </Button>
          <Button w={windowWidth * 0.25} backgroundColor={mainColor} onPress={navigateToLiveLocation} workshop={workshopDetail}>
            <Text color={"#ecfeff"} bold>Navigation</Text>
          </Button>
        </Flex>
      </Center>
    </VStack>

  )
}