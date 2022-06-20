import { View, StyleSheet, TouchableOpacity, Image, ImageBackground,  } from "react-native";
import {HStack, Text, Center, VStack, Box} from "native-base"
import { useNavigation } from "@react-navigation/native";

export default function BengkelCard({workshop}) {

  const navigation = useNavigation()

  return (

        <HStack space={4} justifyContent={"space-between"} p={3} w={"full"} background="amber.500" rounded={"xl"}>
              <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("BengkelDetail", {id: workshop.id})}
        >
        <HStack space={3}>
          <Center>
            <Box backgroundColor={"amber.200"} rounded={"full"} size={50} p={1}>
              <Text>foto</Text>
            </Box>
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
          <Text p={2} onPress={() => console.log("to chat")} >Chat</Text>
        </Center>
      </HStack>

  )
}