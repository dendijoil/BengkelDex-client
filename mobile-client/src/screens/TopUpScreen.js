import { Text, Box, Center, VStack, Input, Link, Button } from "native-base";
import { mainColor } from "../constant/color";
import { useState } from "react";
import { URL } from "../constant/listurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// import { WebView } from 'react-native-webview';

export default function TopUpScreen() {
  const [input, setInput] = useState({
    inputAmount: 0,
  });
  const navigation = useNavigation();
  const topUp = async () => {
    try {
      const userData = await AsyncStorage.getItem("@customer");
      const token = JSON.parse(userData).token
      const { data } = await axios({
        method: "post",
        url: URL + "/payment/top-up",
        headers: {
          access_token: token,
        },
        data: {
          amount: input.inputAmount,
        }
      });
      navigation.navigate("PaymentTopUpScreen", {data: data, amount: input.inputAmount})
      // console.log(data, "PPPPPPPPPPPPPPPPPP");
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
              onChangeText={(inputAmount) => setInput({ ...input, inputAmount })}
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
