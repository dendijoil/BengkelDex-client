import { View, StyleSheet, TouchableOpacity, ImageBackground, } from "react-native";
import { HStack, Text, Center, VStack, Box, Image, Button } from "native-base"
import { useNavigation } from "@react-navigation/native";
import { mainColor } from "../constant/color";
export default function BengkelCard({ workshop }) {

  const navigation = useNavigation()

  return (

    <HStack space={4} justifyContent={"space-between"} p={3} w={"full"} background={mainColor} rounded={"xl"}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("BengkelDetail", { id: workshop.id })}
      >
        <HStack space={3}>
          <Center>
            <Image size={50} borderRadius={"full"} source={{ uri: workshop.imgUrl }} alt={"Logo"} />
          </Center>
          <Center>
            <VStack>
              <Text>{workshop.name}</Text>
              <Text Text isTruncated maxW="240" w="80%">{workshop.address}</Text>
            </VStack>
          </Center>
        </HStack>
      </TouchableOpacity>
      <Center >
        <Button rounded={'md'} backgroundColor={"green.300"}>
          <Text onPress={() => console.log(workshop)} >Chat me !</Text>
        </Button>
      </Center>
    </HStack>

  )
}