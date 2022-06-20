import { View, StyleSheet, TouchableOpacity, Image, ImageBackground,  } from "react-native";
import {HStack, Text, Center, VStack, Box} from "native-base"

export default function BengkelCard({workshop}) {

  return (
    <TouchableOpacity
        activeOpacity={0.8}
        >
        <HStack space={4} justifyContent={"space-between"} p={3} w={"full"} background="amber.500" rounded={"xl"}>
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
        <Center>
          <Text p={2} >Chat</Text>
        </Center>
      </HStack>
      </TouchableOpacity>
  )
}