import { Box, Center, HStack, Text, VStack } from "native-base"

export default function MapScreenWorkshop() {
  return (
    <>
      <VStack space={5}>
        <Box w={"full"} h={10} mt={3} backgroundColor={"cyan.300"}>
        </Box>
        <Box size={400} backgroundColor={"cyan.300"}>
        </Box>

        <VStack space={2}>
          <Center>
            <Box w={"5/6"} h={10} borderWidth={'1'} borderColor={"black"} backgroundColor={"white"} >
              <HStack alignItems={"center"} justifyContent={"space-between"} h={"full"}>
                <Text ml={2}>1.  Bengkel Joko</Text>
                <Box backgroundColor={"tertiary.300"} borderRadius={"2xl"} mr={"1.5"}>
                  <Text p={2}>Chat!</Text>
                </Box>
              </HStack>
            </Box>
          </Center>
          <Center>
          <Box w={"5/6"} h={10} borderWidth={'1'} borderColor={"black"} backgroundColor={"white"} >
              <HStack alignItems={"center"} justifyContent={"space-between"} h={"full"}>
                <Text ml={2}>2.  Bengkel Agung Pertama Sanjaya</Text>
                <Box backgroundColor={"tertiary.300"} borderRadius={"2xl"} mr={"1.5"}>
                  <Text p={2}>Chat!</Text>
                </Box>
              </HStack>
            </Box>
          </Center>
          <Center>
          <Box w={"5/6"} h={10} borderWidth={'1'} borderColor={"black"} backgroundColor={"white"} >
              <HStack alignItems={"center"} justifyContent={"space-between"} h={"full"}>
                <Text ml={2}>3.  Bengkel Rizky</Text>
                <Box backgroundColor={"tertiary.300"} borderRadius={"2xl"} mr={"1.5"}>
                  <Text p={2}>Chat!</Text>
                </Box>
              </HStack>
            </Box>
          </Center>
        </VStack>
      </VStack>
    </>
  )
}