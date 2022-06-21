import { Button, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingMap from "../components/LoadingMap";
import { URL } from "../constant/listurl";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function OrderDetailScreen({ route }) {
  const navigation = useNavigation()
  // console.log(route);
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  // const [token, setToken] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const workshopStorage = await AsyncStorage.getItem("@workshop");
        // setToken(JSON.parse(workshopStorage).token);
        const { data: response } = await axios({
          method: "GET",
          url: URL + `/orders/${route.params.id}`,
          headers: {
            "access_token": JSON.parse(workshopStorage).token
          }
        })
        // console.log(response);
        setOrder(response);
        setUser(response.User);
        // console.log(order, user);
        // console.log(JSON.parse(orderStorage));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])

  const doPayment = async () => {
    try {
      const storageWorkshop = await AsyncStorage.getItem("@workshop");
      console.log(JSON.parse(storageWorkshop).payload.id, order.UserId, order.id, JSON.parse(storageWorkshop).token);
      const { data: response } = await axios({
        method: "POST",
        url: URL + `/payment/${order.id}?WorkshopId=${JSON.parse(storageWorkshop).payload.id}&UserId=${order.UserId}`,
        headers: {
          "access_token": JSON.parse(storageWorkshop).token
        },
      })
      navigation.navigate("ListOrder")
    } catch (err) {
      console.log(err);
    }

  }

  if (isLoading) {
    return <LoadingMap></LoadingMap>
  }
  //!TOLONG DI STYLING YANG MANTAP YAK
  return (
    <SafeAreaView>
      <Text>Order Detail Screen</Text>
      <Text>{order.id}</Text>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.phone}</Text>
      <Text>{user.address}</Text>
      <Text>{order.paymentType}</Text>
      <Text>{order.paymentStatus}</Text>
      <Text>{order.date}</Text>

      {order.OrderDetails.map(el => {
        return (
          <HStack key={el.id} justifyContent={"space-between"}>
            <Text>{el.Service.name}</Text>
            <Text>{el.Service.price}</Text>

          </HStack>
        )
      })}

      <Text>TOTAL PRICE {order.totalPrice}</Text>
      {!order.paymentStatus ?
        <Text>Status payment : <Text color={"red.400"}>UnPaid</Text></Text> :
        <Text>Status payment : <Text color={"green.400"}>Paid</Text></Text>
      }
      {
        !order.paymentStatus ? 
        <Button onPress={doPayment}>Finish order?</Button> :
        <Button disabled backgroundColor={"green.300"}>Order Paid</Button>
      }

    </SafeAreaView>
  )
}