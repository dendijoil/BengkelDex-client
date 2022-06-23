import axios from "axios";
import {
  Box,
  Center,
  HStack,
  Text,
  VStack,
  Image,
  Button,
  FlatList,
} from "native-base";
import { URL } from "../constant/listurl";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainColor } from "../constant/color";
import ListOrderCard from "../components/ListOrderCard";
import { useIsFocused } from "@react-navigation/native";
import LoadingAll from "../components/LoadingAll";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ListOrder({ route }) {
  const isFocused = useIsFocused();
  // console.log(route.params.payload);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [workshop, setWorkshop] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await axios({
          method: "GET",
          url: `${URL}/orders/`,
          headers: {
            access_token: route.params.token,
          },
        });
        setWorkshop(route.params.payload);
        setOrders(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isFocused]);

  if (isLoading) {
    return <LoadingAll></LoadingAll>;
  }

  return (
    <SafeAreaView>
      <VStack space={5} backgroundColor={"coolGray.200"} h={windowHeight}>
        <Box
          backgroundColor={mainColor}
          w={windowWidth}
          h={windowHeight * 0.1}
          roundedBottom={"full"}
        >
          <Center>
            <Text fontSize={"2xl"} mt={windowHeight * 0.03} color={"white"}>
              LIST ORDER
            </Text>
          </Center>
        </Box>
        <Box
          h={windowHeight * 0.1}
          backgroundColor={"coolGray.300"}
          mx={windowWidth * 0.05}
          borderRadius={"3xl"}
        >
          <VStack>
            <Center>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {workshop.name}
              </Text>
            </Center>
            <Center>
              <Text maxW={windowWidth * 0.7}>{workshop.address}</Text>
            </Center>
          </VStack>
        </Box>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Center>
            <FlatList
              data={orders}
              w={windowWidth * 0.9}
              h={windowHeight * 0.7}
              rounded={"3xl"}
              backgroundColor={"coolGray.300"}
              _contentContainerStyle={{
                mx: "auto",
                p: "3",
              }}
              renderItem={({ item }) => (
                <Box my={"3"}>
                  <ListOrderCard key={item.id} order={item} />
                </Box>
              )}
            />
          </Center>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
