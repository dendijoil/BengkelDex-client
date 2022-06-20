import axios from "axios";
import { HStack, Stack, Text, VStack, Image, Center, ScrollView, Button } from "native-base";
import { useEffect, useState } from "react";
import { URL } from "../constant/listurl";
import {mainColor} from "../constant/color";
export default function BengkelDetail({ route }) {
  // console.log(route.params.id)
  const [workshopDetail, setWorkshopDetail] = useState(null)
  // const { data: workshop } = axios({
  //   method: "GET",
  //   url: `${URL}/workshops/${route.params.id}`,
  // })

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
        console.log(error)
      }
    })()
  }, [])

  if (workshopDetail === null) {
    return <Text>Loading ....</Text>
  }
  return (
    <VStack space={5}>
      <HStack p={3} shadow={"9"} space={4} backgroundColor={"coolGray.400"}>
        <Image size={100} rounded={"full"} source={{ uri: workshopDetail.imgUrl }} alt={"bengkelImage"} />
        <VStack>
          <Text fontSize={"xl"}>{workshopDetail.name}</Text>
          {workshopDetail.statusOpen ?
            <Text>Status : Open</Text> :
            <Text>Status : Closed</Text>}
          <Text w={"3/6"} >{workshopDetail.address}</Text>
          <Text>{workshopDetail.phoneNumber}</Text>
        </VStack>
      </HStack>
      <Center>
        <Text>List Services</Text>
      </Center>
      <Center>
        <HStack justifyContent={"space-between"} w={"4/5"}>
          <Text>Name</Text>
          <Text>Price</Text>
        </HStack>
        {workshopDetail.Services.map(el => {
          return (
            <HStack backgroundColor={"coolGray.300"} space={"4"} w={"4/5"} flexWrap={"wrap"} justifyContent={"space-between"}>
              <Text>{el.name}</Text>
              <Text>Rp. {el.price}</Text>
            </HStack>
          )
        })}
      </Center>
      <Center>
        <Button w={"1/4"} backgroundColor={mainColor}>
          <Text>Chat !</Text>
        </Button>
      </Center>
    </VStack>

  )
}