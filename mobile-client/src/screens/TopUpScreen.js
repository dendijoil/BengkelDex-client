import { Text, Box, Center, VStack, Input, Link, Button } from "native-base";
import { mainColor } from "../constant/color";
import { useState } from "react";
import { URL } from "../constant/listurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
export default function TopUpScreen() {
  const [input, setInput] = useState({
    inputAmount: 0,
  });
  const navigation = useNavigation();
  const topUp = async (key) => {
    try {
    //   const { data } = await axios({
    //     method: "post",
    //     url: URL + "/payment/top-up",
    //     headers: {
    //       access_token: await AsyncStorage.getItem(`@${key}`),
    //     },
    //   });

      console.log(key, "PPPPPPPPPPPPPPPPPP");
    } catch (error) {
      console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }
  };

  return (
    <>
      <VStack>
        <Center>
          <Box>
            <Text fontSize={"2xl"} fontWeight="extrabold" mt={4}>
              Top up DexCoin
            </Text>
          </Box>
        </Center>
        <Center>
          <VStack space={"2"} width="4/5" mt={4}>
            <Input
              placeholder="How much do you want to top up?"
              onChange={(e) => setInput((state) => ({
                ...state,
                inputAmount: e.target.value
              }))}
            />
            <Button bgColor={mainColor} onPress={topUp}>
              Top up!
            </Button>
          </VStack>
        </Center>
      </VStack>
    </>
  );
}
