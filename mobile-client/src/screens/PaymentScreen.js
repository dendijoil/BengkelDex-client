import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { URL } from "../constant/listurl";

export default function PaymentScreen({ route }) {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});

  const navigation = useNavigation()
  useEffect(() => {
    (async () => {
      try {
        const userData = await AsyncStorage.getItem("@customer");
        let { data } = await axios({
          method: "get",
          url: URL + "/orders/" + route.params.data,
          headers: {
            access_token: JSON.parse(userData).token,
          },
        });
        setUser(JSON.parse(userData).payload);
        setToken(JSON.parse(userData).token);
        setOrderDetail(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const payNow = async() => {
    try {
      const payment = await axios({
        method: "post",
        url: `${URL}/payment/${orderDetail.id}?WorkshopId=${orderDetail.WorkshopId}&UserId=${user.id}`,
        headers: {
          access_token: token
        }
      })
      navigation.navigate("HomePage")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Text>{user.balance}</Text>
      <Text>{orderDetail.totalPrice}</Text>
      <Button
        title="Pay Now"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        onPress={payNow}
      ></Button>
    </View>
  );
}
